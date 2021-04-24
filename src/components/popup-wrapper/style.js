import styled, { keyframes } from "styled-components";

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--app-height);
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
  min-width: 50%;
  width: fit-content;
  max-width: 60%;
  padding: 40px;
  max-height: 80%;
  max-width: 634px;

  border-radius: 10px;
  background: #ffffff;
  &.showContent {
    animation: ${showContent} 0.3s forwards;
    animation-delay: 0.2s;
  }

  .icon-close {
    position: absolute;
    right: 40px;
    top: 40px;
    cursor: pointer;
    z-index: 10;
  }

  @media (max-width: 768px) {
    padding: 20px;
    width: calc(100% - 40px);
    max-width: 98%;
    max-height: 90%;
    .icon-close {
      right: 20px;
      top: 20px;
    }
  }
`;
