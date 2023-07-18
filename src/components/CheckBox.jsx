import { FormControlLabel, Typography } from '@mui/material';
import CheckBox from '@mui/material/Checkbox';
import { useState } from 'react';
import styled from 'styled-components';
import { patchCheckbox } from '../auth/page';

const CheckboxStyle = styled.div`
  span.Mui-checked ~ p {
    text-decoration: line-through;
    color: #9f9f9f;
  }
  label {
    align-items: flex-start;
  }
  .MuiCheckbox-root {
    padding: 0px 9px;
  }
`;

function CheckboxItem(...props) {
  const [checkboxState, setCheckboxState] = useState(props[0].checkbox);
  
  function handleChange(e) {
    setCheckboxState(!checkboxState);
    patchCheckbox({ blockId: props[0].id, checkboxState: !checkboxState });
  }
  return (
    <CheckboxStyle>
      <FormControlLabel
        control={
          <CheckBox
            onChange={handleChange}
            checked={checkboxState}
            sx={{
              color: props[0].color,
              '&.Mui-checked': {
                color: props[0].checkedColor,
              },
              '& .MuiSvgIcon-root': { fontSize: 24 },
            }}
          />
        }
        label={
          <Typography className="formControlLabel" sx={{ fontSize: 18 }}>
            {props[0].name}
          </Typography>
        }
        sx={{ fontSize: 10 }}
      />
    </CheckboxStyle>
  );
}

export default CheckboxItem;
