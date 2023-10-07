import styled from 'styled-components';

export const StyledChatItem = styled.div`
  .chat-history-wrapper {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    // border-bottom: 1px solid rgba(32, 33, 35, 0.5);
  }

  .chat-history-wrapper.bot {
    // background-color: @chat-user-bg;
    flex-direction: row;
  }

  .chat-wrapper {
    max-width: 50vw;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1.5rem;
    margin: 10px;
    padding: 16px 20px;
    color: white;
    font-size: 16px;
    border-radius: 30px;
    text-align: justify;
    background: #494949;
    @media only screen and (max-width: 1000px) {
      max-width: 90%;
      width: 90%;
    }
  }

  .chat-wrapper.not-bot {
    flex-direction: row-reverse;
    background: rgb(1, 85, 85);
    color: white;
  }

  .avatar-wrapper img {
    width: 30px;
  }

  .chat-content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 90%;
  }

  .chat-content-wrapper.not-bot {
    width: fit-content;
    text-align: justify;
  }

  .source-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .source-btn {
    width: fit-content;
    background-color: @primary-color;
    color: white;
  }

  .source-wrapper a {
    color: white;
    text-decoration: underline;
  }

  .chat-Md-container {
    width: 90%;
  }
`;
