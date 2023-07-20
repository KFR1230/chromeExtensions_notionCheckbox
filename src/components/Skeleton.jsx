import styled from 'styled-components';
const Loading = styled.div`
  display: flex;
  align-items: flex-end;
  margin: auto 0;
  .loading_text {
    margin-right: 5px;
    font-size: 30px;
    font-weight: 600;
  }
  .balls {
    display: flex;
    align-items: flex-end;
    .ball {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: black;
      margin-right: 5px;
      animation: ball 0.6s ease infinite alternate;
    }
    .ball2 {
      animation-delay: 0.1s;
    }
    .ball3 {
      animation-delay: 0.2s;
    }

    @keyframes ball {
      to {
        transform: translateY(-15px);
      }
    }
  }
`;

function LoadingSkeleton() {
  return (
    <Loading className="loading">
      <span className="loading_text">Loading</span>
      <div className="balls">
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
      </div>
    </Loading>
  );
}
export default LoadingSkeleton;
