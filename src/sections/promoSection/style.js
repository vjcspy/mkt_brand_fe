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
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  .point-mobile{
    display: none;
  }

  .point-pagination-promo{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 16px;
  }
  .top{
    margin-bottom: 14px;
  }
  .bottom{
    margin-top: 14px;
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
  padding-right: 10px;
  ::-webkit-scrollbar {
    width: 3px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  button {
    width: 100%;
    margin: 17px 0 24px;
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
