import styled from 'styled-components';
const Wrapper = styled.footer`
  display: flex;
  flex-wrap: wrap;
  background: @white;
  justify-content: space-between;
  align-items: center;
  font-size: @font-size-base;
  color: @black;
  padding: @padding-xs 0;
  font-weight: @font-weight-bold;
  > section:first-child {
    margin-left: @margin-xs;
  }
  > section:nth-child(2) {
    margin-right: @margin-xs;
    option {
      color: @black;
    }
    @media only screen and (max-width: 767px) {
      margin-top: @font-size-sm;
    }
  }
`;

export default Wrapper;
