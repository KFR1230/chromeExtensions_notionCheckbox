import { Fab } from '@mui/material';
import { pink } from '@mui/material/colors';
import styled from 'styled-components';
import CheckboxProperties from './CheckBoxProperties';
import ClearIcon from '@mui/icons-material/Clear';
const SectionPagePro = styled.section`
  position: relative;
  height: 120px;
  & .notion_page_properties_Bk {
    max-width: 300px;
    position: relative;
    z-index: 1;
    & .notion_page_link {
      position: relative;
      display: block;
      height: 120px;
      max-width: 300px;
      background-image: url(${(props) =>
        props.cover || ''});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 0 -30px;
      border-radius: 5px;
      z-index: 2;
      &:hover ~ .logout {
        opacity: 1;
      }
    }
    & .logout {
      min-height: 10px;
      min-width: 10px;
      height: 20px;
      width: 20px;
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 3;
      transition: opacity 0.1s ease;
      opacity: 0;
      &:hover {
        opacity: 1;
      }
      .clearIcon {
        width: 15px;
        height: 15px;
      }
    }
  }
  .properties {
    position: absolute;
    bottom: 10px;
    left: 10px;
    min-width: 200px;
    max-width:280px;
    min-height: 80px;
    padding: 5px;
    text-align: start;
    background-color: rgb(217, 214, 200, 0.8);
    border-radius: 5px;
    z-index: 2;
    & .properties_icon {
      position: relative;
      font-size: 30px;
    }
    & .properties_title {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    & .loading {
      line-height: 70px;
    }
    & .properties_top {
      display: flex;
      justify-content: space-between;
      & .MuiFormControlLabel-labelPlacementEnd {
        margin: 0;
      }
      & .MuiButtonBase-root {
        padding: 0px 0px;
      }
    }
  }
`;

function NotionPagePro(...props) {
  const currentState = props[0].currentState;
  function switchState(currentState) {
    switch (currentState) {
      case 'loaded':
        return (
          <>
            <div className="properties_top">
              <div className="properties_icon ch">
                {props[0]?.icon?.emoji || 'UnIcon'}
              </div>
              {props[0]?.properties?.Archive && (
                <CheckboxProperties
                  className="properties_checkbox_archive"
                  id={props[0].id}
                  checkbox={props[0].properties.Archive.checkbox}
                  color={pink[700]}
                  checkedColor={pink[500]}
                />
              )}
            </div>
            <div className="properties_title ch">
              {props[0]?.properties.Name.title[0]?.text.content || 'Untitled'}
            </div>
          </>
        );
      case 'failed':
        return <div>no files</div>;
      default:
        return <div className="loading">Loading...</div>;
    }
  }

  const handleClick =()=>{
    props[0].setLoginIn.setLoginIn(false);
    localStorage.removeItem('secrete')
  }
  return (
    <>
      <SectionPagePro
        className="notion_page_properties"
        cover={props[0]?.cover?.external?.url}
      >
        <div className="notion_page_properties_Bk">
          <a
            href={props[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="notion_page_link"
          >
            <div />
          </a>
          <Fab aria-label="add" className="logout" onClick={handleClick}>
            <ClearIcon className="clearIcon" />
          </Fab>
        </div>
        <div className="properties">{switchState(currentState)}</div>
      </SectionPagePro>
    </>
  );
}

export default NotionPagePro;
