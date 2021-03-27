import styled, { keyframes } from "styled-components";

export const TabScrollWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const TabContainerWrapper = styled.div`
  position: relative;
  display: flex;
  transition: transform 0.3s ease-in-out;
`;

export const WrapperOnePageScroller = styled.div`
  flex: 1;
  max-height: 100%;
  position: relative;
`;

export const WrapperSection = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .image-mobile {
    width: 100%;
  }
`;
const viewMore = keyframes`
  0%{
    transform: translateY(0%);
  }
  25%{
    transform: translateY(-10%);
  }
  50%{
  transform: translateY(0%);
  }
  75%{
  transform: translateY(10%);
  }
  100%{
    transform: translateY(0%);
  }
`;

export const GroupButton = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);

  .link-banner {
    border: 2px solid;
    background: transparent;
    backdrop-filter: blur(4px);
    width: 300px;
    display: flex;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    color: white;
    height: 44px;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    margin-bottom: 99px;
  }
  svg {
    cursor: pointer;
    opacity: 1;
    transition: 0.3s;
    margin-bottom: 10px;
  }
  h1 {
    margin-bottom: 10px;
    color: white;
  }

  h3 {
    margin-bottom: 32px;
    color: white;
  }
  @media (max-width: 768px) {
    padding-bottom: 0px;
    & h1 {
      font-size: 24px;
      line-height: 24px;
    }
    & h3 {
      font-size: 16px;
      line-height: 24px;
    }
    svg {
      display: none;
    }

    .show-popup {
      display: none;
    }
    .link-banner {
      margin-bottom: 90px;
    }
  }

  .view-more {
    animation: ${viewMore} 1s infinite;
  }
  .hide {
    opacity: 0;
    visibility: hidden;
  }
`;

export const WrapperListPoint = styled.div`
  position: absolute;
  width: auto;
  height: 30px;
  top: 50%;
  right: 6%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  height: fit-content;
  align-items: center;
  .top {
    margin-bottom: 14px;
  }
  .bottom {
    margin-top: 14px;
  }
  @media (max-width: 768px) {
    right: 20px;
    left: unset;
    .top,
    .bottom {
      display: none;
    }
  }
`;
