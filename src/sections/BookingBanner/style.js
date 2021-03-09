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
  .image-mobile {
    width: 100%;
  }
`;

export const ItemBanner = styled.div``;

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
