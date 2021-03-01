import styled, { keyframes } from "styled-components";

export const Background = styled.div`
  position: fixed;

  width: 100%;
  height: 100vh;
  z-index: 1004;
`;

const showMarker = keyframes`
  from {
    opacity: 0;

    // transform: scale(0);
  }
  to {
    opacity: 1;
    // transform: scale(1);
  }
`;

const showContent = keyframes`
from {
  opacity: 0;
  transform:  translate(-50%,-50%) scale(1.2);
}
to {
  opacity: 1;
  transform: translate(-50%,-50%) scale(1) ;
}
`;

export const MarkerWrapper = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  left: 0;
  top: 0;

  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);

  &.showMarker {
    animation: ${showMarker} 0.3s forwards;
  }
`;

export const PopupContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0;
  width: 50%;
  max-width: 483px;
  padding: 40px;

  border-radius: 10px;
  background: #ffffff;
  &.showContent {
    animation: ${showContent} 0.3s forwards;
    animation-delay: 0.2s;
  }

  @media (max-width: 768px) {
    padding: 24px;
    width: calc(100% - 40px);
  }
`;

export const HeaderPopup = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;

  svg {
    cursor: pointer;
  }
`;

export const ContentPopup = styled.div``;

export const TitleGroup = styled.h5`
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  margin-bottom: 20px;
`;

export const GroupLocation = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid #7171713d;
  margin-bottom: 20px;
  position: relative;
  .popup-language-location-in-home {
    position: unset;
  }
`;

export const GroupLanguage = styled.div`
  button {
    margin-bottom: 24px;
  }
`;

export const GroupButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
`;

export const WrapperSelectLocation = styled.div``;

export const TitleLocation = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 2;
  p {
    margin: 0 63px 0 17px;
  }
  .icon-down {
    position: absolute;
    left: 160px;
  }
`;

export const ListLocation = styled.div`
  position: absolute;
  background: #ffffff;
  width: 160px;
  height: 100px;
  overflow: auto;
  z-index: 10;
  border: 1px solid #231f20;
  box-sizing: border-box;
  border-radius: 4px;
  top: 100%;
  padding-top: 2px;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 24px;
    cursor: pointer;
    p {
      margin: 0;
    }

    svg {
      color: ${({ theme }) => theme.color.status.primary};
    }
  }
`;

export const Marker = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1;
`;
