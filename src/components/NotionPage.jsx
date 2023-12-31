import {
  getNotionBlockList,
  getNotionDb,
  postNotionLogin,
} from '../auth/page.js';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NotionPagePro from './NotionPagePro.jsx';
import CheckboxItem from './CheckBox.jsx';
import LoadingSkeleton from './Skeleton.jsx';
//styled-component 字首大寫
const StyledNotionPage = styled.div`
  position: relative;
  hr {
    background-color: #eeeeee;
  }
  .notion_page_content {
    height: calc(400px - 180px);
    overflow-y: auto;
    overflow-x: hidden;
    
  }
`;

function NotionPage(setLoginIn) {
  const [page, setPage] = useState(null);
  const [list, setList] = useState(null);
  const [currentProState, setCurrentProState] = useState('loading');
  const [currentConState, setCurrentConState] = useState('loading');
  const [secret] = useState(JSON.parse(localStorage.getItem('secrete')));
  const [secretKey] = useState(secret.secretKey);
  const [databaseId] = useState(secret.databaseId);

  const asyncPostNotionLogin = async () => {
    if (currentProState !== 'fetching') {
      return;
    }
    try {
      const data = await postNotionLogin({
        secretKey: secretKey,
        databaseId: databaseId,
      });
      asyncGetNotionDb();
    } catch (error) {
      console.log(error);
      setCurrentProState('failed');
    }
  };

  const asyncGetNotionDb = async () => {
    if (currentProState !== 'fetching') {
      return;
    }

    try {
      const data = await getNotionDb();
      // console.log(data)
      setPage(data.data.results[0]);
    } catch (error) {
      console.log(error);
      setCurrentProState('failed');
      setCurrentConState('failed');
    }
  };

  const asyncGetNotionList = async () => {
    if (currentConState !== 'fetching') {
      return;
    }
    try {
      const data = await getNotionBlockList({ pageId: page?.id });
      setList(data.results);
      setCurrentConState('loaded');
      setCurrentProState('loaded');
    } catch (error) {
      console.log(error);
      setCurrentConState('failed');
    }
  };

  useEffect(() => {
    setCurrentProState('fetching');
    setCurrentConState('fetching');
  }, []);

  useEffect(() => {
    asyncPostNotionLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProState, currentConState]);

  useEffect(() => {
    page && asyncGetNotionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function switchListState(currentState) {
    switch (currentState) {
      case 'loaded':
        return (
          <>
            {list.map((item) => {
              if (item.type !== 'to_do') {
                return;
              }
              return (
                <CheckboxItem
                  key={item.id}
                  id={item.id}
                  //hasChild
                  name={item.to_do.rich_text[0]?.plain_text || ''}
                  checkbox={item.to_do.checked}
                />
              );
            })}
          </>
        );
      case 'failed':
        return <h1>no files.</h1>;

      default:
        return (
          <LoadingSkeleton/>
        );
    }
  }
  return (
    <StyledNotionPage className="notion_page">
      <NotionPagePro
        {...page}
        currentState={currentProState}
        setLoginIn={setLoginIn}
      />
      <hr />
      <section className="notion_page_content">
        {switchListState(currentConState)}
      </section>
    </StyledNotionPage>
  );
}

export default NotionPage;
