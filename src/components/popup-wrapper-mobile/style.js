import styled, { keyframes } from "styled-components";

const showPopup = keyframes`
  from {
    height: 0;
  } to{
  height: calc(100% - 69px);
  }
`;

const closePopup = keyframes`
  from {
    height: calc(100% - 69px);
  } to{
    height: 0;
  }
`;

export const WrapperPopupMobile = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  height: 0;
  background: #ffffff;
  bottom: 0;
  transition: 0.3s;
  z-index: 1000;
  &.bottom-top-started {
    height: calc(100% - 69px);
  }

  // animation: ${showPopup} 0.3s forwards;
  // &.close {
  //   animation: ${closePopup} 0.3s forwards;
  // }
`;

export const WrapperContentPopup = styled.div``;

export const ContentPopup = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const WrapperClose = styled.div`
  position: absolute;
  top: 0px;
  left: 20px;
  width: 100%;
  height: 40px;
  background: #ffffff;
  display: flex;
  align-items: center;
  svg {
    margin-right: 20px;
  }
  z-index: 20;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-star;
  height: calc(100% - 40px);
  max-width: 100%;
  transition: 0.3s;
  margin-top: 40px;

  & > div {
    min-width: 100%;
    max-height: 100%;
    padding: 20px;
    overflow-y: scroll;
  }
`;
