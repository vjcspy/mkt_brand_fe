import styled from "styled-components";

export const WrapperMenu = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1003;
  opacity: 0;
  visibility: hidden;
  &.show {
    opacity: 1;
    visibility: visible;
  }
  &.close {
    transition-delay: 0.3s;
  }
`;
export const ContentPosition = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
export const MarkerLayout = styled.div`
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  transition: 0.3s;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;

  &.show {
    opacity: 1;
  }
`;

export const WrapperContentMenu = styled.div`
  height: 100%;
  min-width: 358px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 48px;

  position: absolute;
  top: 0;
  right: 0;

  background: #ffffff;
  margin: 0;
  transition: 0.2s;

  transform: translateX(100%);

  &.show {
    transform: translateX(0%);
  }

  hr {
    border-style: inset;
    background: #717171;
    opacity: 0.3;
    margin: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
    padding-bottom: 0;
  }
`;

export const HeaderMenu = styled.div`
  background: #ffffff;
  padding: 60px 40px 23px 0;
  text-align: right;

  svg {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    padding: 0;
    padding-bottom: 15px;
  }
`;
export const ContentMenu = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

export const MainMenu = styled.div`
  padding: 40px 0;
  margin-bottom: 20px;
  transition: 0.3s;
  overflow-y: scroll;
  max-height: 100%;

  & > div:not(:last-child) {
    margin-bottom: 32px;
  }
  &.hide {
    transform: translateX(-100%);
  }

  @media (max-width: 768px) {
    padding: 15px 0;
    border-bottom: 1px solid #e2e2e2;
    max-height: 100%;
    overflow: auto;
    padding-bottom: 80px;

    & > div:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;

export const ItemMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  padding: 0 40px;

  h3 {
    margin: 0;
    line-height: 32px;
    position: relative;

    span {
      width: 30px;
      height: 20px;

      position: absolute;
      top: 0;
      left: 106%;

      display: flex;
      align-items: center;
      justify-content: center;

      background: #da1e1e;
      border-radius: 22px;
      color: white;
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    padding: 0;
    h3 {
      font-size: 18px;
      line-height: 24px;
    }
  }
`;

export const SubMenu = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 40px;
  padding-top: 35px;

  position: absolute;
  left: 0;
  top: 0;

  background: #ffffff;
  z-index: 1004;
  transform: translateX(100%);
  transition: 0.5s;

  &.show {
    left: 0;
    transform: translateX(0%);
  }

  &.hide {
    transform: translateX(-100%);
  }
  @media (max-width: 768px) {
    padding: 0;
    padding-top: 15px;
  }
`;

export const HeaderSubMenu = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 40px;

  div {
    cursor: pointer;
  }

  svg {
    margin-right: 17px;
  }

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

export const MainSubMenu = styled.div`
  & > div:not(:last-child) {
    margin-bottom: 32px;
  }
`;

export const ItemSubMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  padding: 0 22px;

  @media (max-width: 768px) {
    padding: 0 30px;
  }
`;

export const FeatureMobile = styled.div`
  display: none;
  flex: 1 0 0;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const ListFeature = styled.div`
  h5 {
    cursor: pointer;
    font-style: normal;
    font-weight: normal;
    margin-top: 12px;
  }
`;

export const LanguageLocation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;

  div {
    display: flex;
    cursor: pointer;
    align-items: center;

    h5 {
      font-style: normal;
      font-weight: normal;
    }

    svg,
    img {
      margin: 0 5px;
    }
  }
`;

export const FooterMenu = styled.div`
  z-index: 1005;
  position: absolute;
  bottom: 0;
  left: 0;
  button,
  a {
    border-radius: 0px !important;
  }

  button,
  a:not(last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 768px) {
    width: 100%;
    display: flex;

    button,
    a {
      width: 100%;
    }
  }
`;
