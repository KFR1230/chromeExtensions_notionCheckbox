import { Button, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
// import ComboBox from './ComboBox';
import { getNotionDb, postNotionLogin } from '../auth/page';
const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .MuiFormControl-root {
    margin-bottom: 15px;
  }
  input {
    margin: 0px;
  }
  .button_wrapper {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    & button {
      width: 120px;
      line-height: unset;
    }
  }
`;

const SelectTitle = styled.div`
  height: 80px;
  h1 {
    display: block;
    height: 100%;
    text-align: center;
    line-height: 80px;
    font-size: 30px;
    font-weight: 700;
  }
`;
const ComboBoxOption = styled.div`
  display: flex;
  justify-content: center;
  button {
    justify-content: right;
  }
`;

function SelectPage({ loginIn, setLoginIn }) {
  const obj = JSON.parse(localStorage.getItem('secrete'));
  const [inputKeyValue, setInputKeyValue] = useState(obj?.sel_key || '');
  const [inputIdValue, setInputIdValue] = useState(obj?.sel_id || '');
  const [currentSelectState,setCurrentSelectState] = useState('loading')
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  
  const errorStates = {
    secrete: {
      required: '輸入不可空白',
      minLength: '輸入至少43個字元',
    },
    database: {
      required: '輸入不可空白',
      minLength: '輸入至少32個字元',
    },
  };

  const asyncPostNotionLogin = async (select) => {
    try {
      const data = await postNotionLogin({
        secretKey: inputKeyValue,
        databaseId: inputIdValue,
      });
      asyncGetNotionDb(select);
    } catch (error) {
      console.log(error);
    }
  };

  const asyncGetNotionDb = async (select) => {
    try {
      const data = await getNotionDb();
      if (data.status === 'success') {
        select && localStorage.setItem('secrete', select);
        setLoginIn(true);
        setCurrentSelectState('loaded');
      } else {
        alert(data.message);
        setLoginIn(false);
        setCurrentSelectState('loaded');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    const select = JSON.stringify({
      secretKey: inputKeyValue,
      databaseId: inputIdValue,
    });
    asyncPostNotionLogin(select);
    setCurrentSelectState('fetching')
  };

  useEffect(() => {
    if (loginIn === true) {
      asyncPostNotionLogin();
    } else {
      setLoginIn(false);
    }
  }, [loginIn]);

  function switchButton (currentSelectState){
    switch (currentSelectState) {
      case 'fetching':
        return (
          <LoadingButton loading loadingIndicator="Loading…" variant="outlined">
            Fetch data
          </LoadingButton>
        );

      default:
       return (
         <Button variant="outlined" type="submit">
           取得Page
         </Button>
       );
    }
  }

  return (
    <>
      <SelectTitle className="select_title">
        <h1>Notion</h1>
      </SelectTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectWrapper className="select_wrapper">
          <TextField
            {...register('secrete_key', {
              required: true,
              minLength: 43,
            })}
            id="secrete_key"
            label="secrete-key"
            variant="outlined"
            value={inputKeyValue}
            onChange={(e) => setInputKeyValue(e.target.value)}
            helperText={
              errors?.secrete_key &&
              errorStates['secrete'][errors.secrete_key.type]
            }
            error={errors.secrete_key}
          />
          <TextField
            {...register('database_id', {
              required: true,
              minLength: 32,
            })}
            id="database_id"
            label="database-id"
            variant="outlined"
            value={inputIdValue}
            onChange={(e) => setInputIdValue(e.target.value)}
            helperText={
              errors?.database_id &&
              errorStates['database'][errors.database_id.type]
            }
            error={errors.database_id}
          />
          <div className="button_wrapper">
           {switchButton(currentSelectState)}
          </div>
          {/* <ComboBoxOption>
            <ComboBox pages={pages}/>
          </ComboBoxOption> */}
        </SelectWrapper>
      </form>
    </>
  );
}

export default SelectPage;
