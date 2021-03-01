import styled, { keyframes } from "styled-components";

export const WrapperOnePageScroller = styled.div`
  flex: 1;
  max-height: 100%;
  position: relative;
`;

export const WrapperSection = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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
  button {
    margin-bottom: 99px;
    width: 300px;
  }
  .button-banner {
    border: 2px solid;
    background: transparent;
    backdrop-filter: blur(4px);
  }
  svg {
    cursor: pointer;
    opacity: 1;
    transition: 0.3s;
    margin-bottom: 10px;
  }
  .link-banner {
    display: none;
  }
  @media (max-width: 768px) {
    padding-bottom: 0px;
    svg {
      display: none;
    }
    button {
      margin-bottom: 96px;
    }
    .link-banner {
      display: block;
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
