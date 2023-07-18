import { FormControlLabel } from '@mui/material';
import CheckBox from '@mui/material/Checkbox';
import { useState } from 'react';
import styled from 'styled-components';
import { patchPageCheckbox } from '../auth/page';

const CheckboxStyle = styled.div`
  span.Mui-checked ~ span {
    text-decoration: line-through;
    color: #9f9f9f;
  }
`;

function CheckboxProperties(...props) {
  const [checkboxState, setCheckboxState] = useState(props[0].checkbox);
  function handleChange(e) {
    setCheckboxState(!checkboxState);
    patchPageCheckbox({ pageId: props[0].id, checkboxState: !checkboxState });
  }
  return (
    <CheckboxStyle>
      <FormControlLabel
        control={
          <CheckBox
            onChange={handleChange}
            size="small"
            checked={checkboxState}
            sx={{
              color: props[0].color,
              '&.Mui-checked': {
                color: props[0].checkedColor,
              },
            }}
          />
        }
        label={props[0].name}
      />
    </CheckboxStyle>
  );
}

export default CheckboxProperties;
