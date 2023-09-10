import styled from 'styled-components';
export const StyledAuthContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-wrap: wrap;
  .sideContainer {
    max-width: 513px;
    width: 100%;
    background: @primary-color;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 32px;
    .registrationSideContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        text-align: center;
        font-size: 42px;
        font-weight: @font-weight-bold;
        margin: 0;
      }
      .subTitle {
        width: 60%;
        text-align: center;
        margin: 0;
      }
      button {
        margin-top: 35px;
        height: @height-lg;
        width: 160px;
        background: @btn-default-ghost-bg;
        border: 2px solid @white;
        border-radius: 50px;
        text-align: center;
        color: @white;
      }
      button:hover {
        color: @white;
      }
      color: @white;
    }
  }
`;
