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
  opacity: ${({ show }) => (show ? 1 : 0)};

  @media (max-width: 768px) {
    display: none;
  }
`;

export const WrapperContentMenu = styled.div`
  width: 40%;
  height: 100%;
  max-height: 100vh;
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

  transform: translateX(${({ show }) => (show ? "0%" : "100%")});
  hr {
    border-style: inset;
    background: #717171;
    opacity: 0.3;
    margin: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ContentRelative = styled.div`
  position: relative;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
    padding: 26px 20px 0;
  }
`;

export const HeaderMenu = styled.div`
  background: #ffffff;
  padding: 60px 96px 23px 0;
  text-align: right;

  svg {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    padding: 0;
    padding-bottom: 15px;
    svg {
      margin-right: 6px;
    }
  }
`;
export const ContentMenu = styled.div`
  position: relative;
  overflow: hidden;
  height: calc(100% - 110px);
  @media (max-width: 768px) {
    height: calc(100% - 85px);
  }
`;

export const MainMenu = styled.div`
  padding: 40px 0;
  margin-bottom: 20px;
  transition: 0.3s;
  overflow-y: scroll;
  max-height: 100%;

  &.hide {
    transform: translateX(-100%);
  }

  @media (max-width: 768px) {
    padding: 12px 0 0;
    max-height: 100%;
    height: 100%;
    overflow: auto;
  }
`;

export const ItemMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0 40px;
  padding-right: 96px;

  &:not(:last-child) {
    margin-bottom: 24px;
  }

  h4 {
    margin: 0;
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

  &:hover {
    h4 {
      color: ${({ theme }) => theme.color.status.primary};
    }
  }

  &.active {
    h4 {
      color: ${({ theme }) => theme.color.status.primary};
      position: relative;
      &: after {
        position: absolute;
        top: 100%;
        left: auto;
        right: 0px;
        content: "";
        width: 100%;
        height: 2px;
        background: ${({ theme }) => theme.color.status.primary};
        transition: 0.3s width ease-in-out;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0;
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    svg {
      margin-right: 6px;
    }
  }
`;

export const SubMenu = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 49px;
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
  margin-bottom: 24px;

  div {
    cursor: pointer;
  }

  svg {
    margin-right: 17px;
  }

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

export const MainSubMenu = styled.div`
  & > div:not(:last-child) {
    margin-bottom: 24px;
  }
`;

export const ItemSubMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  padding: 0 22px;
  padding-left: 35px;

  @media (max-width: 768px) {
    padding: 0 30px;
  }

  &:hover {
    h5 {
      color: ${({ theme }) => theme.color.status.primary};
    }
  }

  &.active {
    h5 {
      color: ${({ theme }) => theme.color.status.primary};
      position: relative;
      &: after {
        position: absolute;
        top: 100%;
        left: auto;
        right: 0px;
        content: "";
        width: 100%;
        height: 2px;
        background: ${({ theme }) => theme.color.status.primary};
        transition: 0.3s width ease-in-out;
      }
    }
  }
`;

export const FeatureMobile = styled.div`
  display: none;
  flex: 1 0 0;

  @media (max-width: 768px) {
    display: block;
    margin-top: -4px;
    display: block;
    margin-top: -4px;
    padding-top: 16px;
    border-top: 1px solid #e2e2e2;
  }
`;

export const ListFeature = styled.div`
  h5 {
    cursor: pointer;
    font-style: normal;
    font-weight: normal;
    margin-top: 12px;
  }
  @media (max-width: 768px) {
    h5 {
      margin-top: 0;
    }
    h5:not(:last-child) {
      margin-bottom: 12px;
    }
  }
`;

export const LanguageLocation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

export const FooterMenu = styled.div`
  z-index: 1005;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  display:flex;
  button,
  a {
    border-radius: 0px !important;
    width: 50%;
    padding: 0;
    a{
      width: 100%;
    }
  }

  button,
  & > a:not(last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.6);
    &:not(:last-child) {
      border-right: 1px solid rgba(255, 255, 255, 0.6);
    }
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
