import styled, { keyframes } from "styled-components";

export const MenuScrollItem = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const WrapperSection = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .image-mobile {
    width: 100%;
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

  h1 {
    margin-bottom: 10px;
    color: white;
  }

  h3 {
    margin-bottom: 32px;
    color: white;
  }

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

  @media (max-width: 768px) {
    padding-bottom: 0px;

    svg {
      display: none;
    }

    button {
      margin-bottom: 96px;
    }

    .show-popup {
      display: none;
    }

    .link-banner {
      display: block;
    }

    & h1 {
      font-size: 24px;
      line-height: 24px;
    }
    & h3 {
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

export const MenuScrollWrapper = styled.div`
  flex: 1;
  max-height: 100%;
  position: relative;
`;

export const DotsWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 90px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 768px) {
    right: 20px;
    .top,
    .bottom {
      display: none;
    }
  }
  .point-our-menu {
    width: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .top {
    margin-bottom: 14px;
  }
  .bottom {
    margin-top: 14px;
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

export const MenuInfoWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .button-banner {
    border: 2px solid;
    background: transparent;
    backdrop-filter: blur(4px);
  }
  h1 {
    margin-bottom: 10px;
    color: white;
  }

  h3 {
    margin-bottom: 32px;
    color: white;
  }
  a {
    margin-bottom: 90px;
  }

  svg {
    margin-top: 40px;
    margin-bottom: 10px;
    transition: 0.3s;
    opacity: 1;
    cursor: pointer;
  }
  .view-more {
    animation: ${viewMore} 1s infinite;
  }
  .hide {
    opacity: 0;
    visibility: hidden;
  }
  @media (max-width: 768px) {
    width: 100%;
    bottom: 0px;
    padding-bottom: 0px;
    h1 {
      font-weight: 600;
      font-size: 24px;
      line-height: 24px;
    }
    h3 {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 30px;
    }
    button,
    a {
      width: 90%;
    }
    svg {
      display: none;
    }
  }
`;
