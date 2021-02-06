import styled, { keyframes } from "styled-components";

export const MainPromo = styled.div`
  height: 100%;
  flex: 1;
  width: 100%;
`;
export const WrapperContentPromo = styled.div`
  position: relative;
  max-height: 100%;
  overflow: hidden;

  @media (max-width: 767px) {
    margin-top: 0;
    height: 100%;
    overflow: auto;

    .container-promo {
      padding: 0;
    }
  }
`;

export const WrapperScroller = styled.div`
  position: relative;
`;

export const ContentScroller = styled.div``;

export const WrapperEndpoint = styled.div`
  position: absolute;
  left: calc(100% - 5%);
  top: 50%;
  transform: translateY(-50%);
  width: 14px;

  .point-mobile{
    display: none;
  }

  @media (max-width: 767px) {
  .point-mobile{
    display: block;
  }
  .point-desktop{
    display: none;
  }
`;

export const WrapperPromo = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  width: 80%;
  height: 100%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const Promo = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  overflow: hidden;
`;
export const LeftPromo = styled.div`
  width: calc(50%);
  img {
    border-radius: 10px;
    height: 100%;
  }
  @media (max-width: 767px) {
    width: 100%;
    img {
      border-radius: 0px;
      height: 100%;
    }
  }
`;

export const RightPromo = styled.div`
  width: calc(50% - 40px);
  overflow: auto;
  button {
    width: 100%;
    margin: 24px 0;
  }

  span {
    font-size: 16px;
    color: ${({ theme }) => theme.color.text.description};
  }
  @media (max-width: 767px) {
    display: none;
  }
`;

export const WrapperPopupContent = styled.div`
  h3 {
    margin-right: 40px;
  }
`;

export const Restaurant = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.color.page.border};
  padding: 20px 0;
  h5 {
    display: inline-flex;
    align-items: center;
    svg {
      margin: 5px;
    }
  }

  p {
    color: ${({ theme }) => theme.color.text.description};
    font-size: 16px;
  }

  button {
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
    svg {
      margin-right: 10px;
    }
  }
`;

export const WrapperScroll = styled.div`
  max-height: 410px;
  overflow-y: auto;

  & > div:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const animation = keyframes`
  0%{
    transform: translateY(-25%);
  }
  25%{
    transform: translateY(0);
  }
  50%{
    transform: translateY(25%);

  }
  75%{
    transform: translateY(0);

  }
  100%{
    transform: translateY(-25%);

  }
`;

export const HiddenContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.5172443977591037) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  opacity: 0;
  visibility: hidden;
  border-radius: 12px;
  b svg {
    transform: rotate(90deg);
    cursor: pointer;
    animation: ${animation} 1s infinite;
    cursor: pointer;
  }
  &.show {
    opacity: 1;
    visibility: visible;
  }
`;

export const WrapperDragMobile = styled.div`
  button {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  h3 {
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    button {
      margin-top: 13px;
    }
  }
`;
