import styled from "styled-components";

export const WrapperProfilePromo = styled.div`
  width: 100%;
  padding-top: 40px;
  padding-bottom: 90px;

  @media (max-width: 768px) {
    margin-left: -20px;
    margin-right: -20px;
    min-height: unset;
  }
`;

export const MarkerList = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  .option {
    bottom: -20px !important;
  }
`;

export const WrapperSlideList = styled.div`
  width: calc(100% - 140px);
  overflow: hidden;
`;

export const List = styled.div`
  display: flex;
  justify-content: ${({ numItem }) => (numItem <= 2 ? "center" : "space-between")};
  transition: 0.3s;

  & > div {
    width: ${({ numItem }) => (numItem <= 2 ? "50%" : "calc(100% / " + numItem + " )")};
  }
`;

export const PromoProfile = styled.div`
  min-width: 364px;
  &:not(:last-child) {
    margin-right: 40px;
  }
  display: flex;
  flex-direction: column;
`;

export const ImageWrapper = styled.div`
  margin-bottom: 24px;
  img {
    border-radius: 10px;
  }
`;
export const Title = styled.h3`
  margin-bottom: 20px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

export const WrapperFlex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
  h5 {
    font-weight: normal;
  }
  p {
    margin: 0;
    font-size: 16px;
  }
  span {
    text-align: right;
  }
`;

export const GroupButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  button {
    width: calc(50% - 10px);
    padding: 0 10px;
  }
  .booking-profile {
    width: calc(50% - 10px);
    padding: 0 10px;
    button {
      width: 100%;
    }
  }
`;
export const WrapperIcon = styled.div`
  position: absolute;
  top: 50%;
  z-index: 1;
  transform: translateY(-50%);
  cursor: pointer;

  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }
`;

export const PromoMobile = styled.div`
  position: relative;
  & > h3 {
    margin-left: 20px;
    margin-bottom: 20px;
  }
`;
export const WrapperScroller = styled.div`
  position: relative;
`;
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

export const ContentMobile = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 12px 12px 0 0;
  padding: 20px;
  background: #ffffff;
`;
