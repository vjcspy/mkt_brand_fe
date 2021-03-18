import styled from "styled-components";

export const Footer = styled.footer``;

export const FooterWrapper = styled.div`
  margin-top: 140px;
  // background: #e9e9e969;
  // padding-top: 40px;
  @media (max-width: 767px) {
    margin-top: 50px;
  }
`;

export const ContentFooter = styled.div`
  background: ${({ theme }) => theme.color.page.backgroundFooter};
  hr {
    margin: 0;
    color: #3a3436;
  }
`;

export const ContentTop = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 30px 0;
  h6 {
    line-height: 22px;
    color: #717171;
  }
  hr {
    display: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 24px 0;

    hr {
      display: block;
      color: #3a3436;
      margin: 12px 0;
    }
  }
`;

export const ContentBottom = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 30px 0;
  .info-mobile {
    display: none;
  }
  .info-desktop {
    color: #717171;

    display: block;
  }
  @media (max-width: 768px) {
    padding: 12px 0;
    .info-mobile {
      display: block;
      color: #717171;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 18px;
    }
    .info-desktop {
      display: none;
    }

    & > div {
      width: 100%;
    }
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  h6 {
    display: flex;
    align-items: center;
  }
`;

export const WrapperFeature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 30px;
  h3 {
    margin-bottom: 30px;
  }
  h5 {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 30px;
    color: #000000;
  }
`;

export const WrapperInfo = styled.div`
  display: flex;
  flex: 1;
  .main-layout {
    margin: 0 5%;
  }
  @media (max-width: 768px) {
    order: 1;
    flex-direction: column;

    .logo-golden {
      width: 126px;
      margin-bottom: 6px;
    }
    .main-layout {
      margin: 0;
    }
    h6 {
      font-size: 12px;
      margin-top: 5px;
    }
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
    img {
      width: 190px;
    }
  }

  a:first-child {
    margin-left: 0;
  }
  a:last-child {
    margin-right: 0;
  }
`;

export const SocialNetwork = styled.div`
  display: flex;

  a {
    cursor: pointer;
    margin: 0 20px;
    svg {
      display: block;
    }
    img {
      max-width: 36px;
      max-height: 36px;
    }
  }
  a:first-child {
    margin-left: 0;
  }
  a:last-child {
    margin-right: 0;
  }
`;

export const WrapperListIcon = styled.div`
  display: flex;
  align-items: center;
  h6 {
    display: none;
  }
  @media (max-width: 768px) {
    order: 0;
    justify-content: space-between;
    h6 {
      display: block;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 22px;
      color: #dadada;
    }
  }
`;
