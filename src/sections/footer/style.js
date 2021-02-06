import styled from "styled-components";

export const Footer = styled.footer``;

export const FooterWrapper = styled.div`
  margin-top: 140px;
  @media (max-width: 767px) {
    display: none;
  }
`;

export const ContentFooter = styled.div`
  background: ${({ theme }) => theme.color.page.backgroundFooter};
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 30px 0;
`;

export const LeftContent = styled.div`
  h6 {
    color: #717171;
    line-height: 22px;
  }
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  img {
  }
`;

export const WrapperFeature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;

  h5 {
    margin-bottom: 30px;
  }
  p {
    text-align: center;
    font-size: 16px;
    color: ${({ theme }) => theme.color.text.description};
  }
`;

export const GroupDownload = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 24px;
  a {
    margin: 0 18px;
    cursor: pointer;
  }

  a:first-child {
    margin-left: 0;
  }
  a:last-child {
    margin-right: 0;
  }
`;

export const SocialNetwork = styled.div`
  margin: 80px 0 45px;
  display: flex;
  justify-content: space-around;
  a {
    cursor: pointer;
    margin: 20px;
  }
  a:first-child {
    margin-left: 0;
  }
  a:last-child {
    margin-right: 0;
  }
`;
