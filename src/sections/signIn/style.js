import styled from "styled-components";

export const WrapperSignIn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  overflow: hidden;

  .underline {
    text-decoration: underline !important;
    cursor: pointer;
  }
`;

export const WrapperContentScroll = styled.div`
  display: flex;
  justify-content: flex-start;
  transition: 0.3s;
  width: 100%;
`;

export const Content = styled.div`
  justify-content: center;
  flex-direction: column;
  display: flex;
  margin-left: 0px;
  max-width: 420px;
  overflow: hidden;
  h2 {
    margin-bottom: 10px;
    margin-left: 10px;
  }
  .wrapper {
    overflow: hidden;
    max-width: 420px;
    overflow: hidden;
  }
`;

export const Info = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.text.description};

  @media (max-width: 769px) {
    display: flex;
    align-items: baseline;
  }
`;

export const Title = styled.div``;

export const WrapperScroll = styled.div`
  display: flex;
  max-width: 100%;
  transition: 0.3s;
`;

export const Item = styled.div`
  min-width: 50%;
  width: 50%;
  float: left;
  button {
    width: 100%;
    margin-bottom: 24px;
  }
  .input-phone {
    margin-bottom: 24px;
  }
`;

export const GroupInput = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  .input {
    width: 48%;
  }
  @media (max-width: 769px) {
    flex-direction: column;
    margin-bottom: 0;

    .input {
      width: 100%;
      margin-bottom: 20px;
    }
    .dropdown {
      height: 40px;
    }
  }
`;

export const ContentSignIn = styled.div`
  max-width: 400px;
  overflow: hidden;
  padding: 10px;
  h2 {
    margin-bottom: 10px;
  }
`;

export const WrapperItemSignIn = styled.div`
  max-width: 100%;
`;
export const ListItemScroll = styled.div`
  min-width: 200%;
  transition: 0.3s;
`;

export const ContentSingUp = styled.div`
  padding: 10px;

  & > button {
    width: 100%;
  }
`;
