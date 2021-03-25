import styled from "styled-components";

export const WrapperInfo = styled.div``;

export const HeaderDesktop = styled.div`
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.color.page.border};
  margin-bottom: 16px;
  display: flex;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const HeaderMobile = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  button {
    width: 100%;
    margin-bottom: 20px;
  }
  h3 {
    text-align: center;
    margin-bottom: 20px;
    line-height: 32px;
  }
  p {
    margin: 0;
    text-align: center;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const WrapperImageCode = styled.div`
  padding: 10px;
  border-radius: 4px;
`;

export const WrapperQcCode = styled.div`
  margin-right: 10px;
  // background: ${({ theme }) => theme.color.page.borderInput};
  background: #cdcdcd4d;
  border-radius: 4px;
  padding: 5px;
  img {
    width: 82px;
    height: 82px;
  }
  @media (max-width: 768px) {
    margin: 0;
    margin-bottom: 8px;
    padding: 3px;
    border-radius: 4px;
  }

  .promo-code {
    color: ${({ theme }) => theme.color.text.description};
    text-align: center;
    line-height: 22px;
  }
  .code {
    color: ${({ theme }) => theme.color.text.heading};
    text-align: center;
    line-height: 22px;
  }
`;
export const ContentHeader = styled.div``;

export const GroupButtonSuccess = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > a {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(50% - 20px);
    margin-right: 24px;
  }
  a:last-child {
    margin: 0;
    padding: 0;
    a {
      width: 100%;
    }
  }
`;
