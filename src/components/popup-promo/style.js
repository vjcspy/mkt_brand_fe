import styled, { keyframes } from "styled-components";

export const HeaderDesktop = styled.div`
  padding-bottom: 29px;
  display: flex;
  width: calc(100% - 60px);
  @media (max-width: 768px) {
    display: none;
  }
`;

export const HeaderMobile = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  button {
    width: 100%;
    margin-bottom: 20px;
  }
  h3 {
    text-align: center;
    margin-bottom: 20px;
    line-height: 32px;
  }
  p {
    margin: 0;
    text-align: center;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const WrapperImageCode = styled.div`
  padding: 10px;
  border-radius: 4px;
`;

export const WrapperQcCode = styled.div`
  margin-right: 24px;
  background: #cdcdcd4d;
  border-radius: 4px;
  padding: 6px;
  width: fit-content;
  @media (max-width: 768px) {
    margin: 0;
    margin-bottom: 8px;
    padding: 3px;
    border-radius: 4px;
  }
  img {
    width: 82px;
    height: 82px;
  }
  .promo-code {
    color: #7b7979;
    text-align: center;
    line-height: 22px;
  }
  .code {
    color: #231f20;
    text-align: center;
    line-height: 22px;
  }
`;
export const ContentHeader = styled.div`
  p {
    font-size: 16px;
    margin: 10px 0 14px;
  }
  button {
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: calc(50% - 20px);
    margin-right: 24px;
    width: 100%;
  }
  h6 {
    margin: 10px 0 16px;
  }
`;

export const ListRestaurant = styled.ul`
  margin-top: 10px;
  margin-bottom: 0;
  li {
    padding: 20px 0;
  }

  li:first-child {
    padding-top: 0;
  }
  li:last-child {
    padding-bottom: 0;
  }
  li:not(:last-child) {
    border-bottom: 1px solid #e9e9e9;
  }
`;

export const WrapperInfo = styled.div`
  height: 100%;
`;

export const TitleInfo = styled.h5`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  svg {
    margin-left: 5px;
    margin-top: 3px;
    transform: rotate(-90deg);
  }
`;
export const ContentInfo = styled.h6`
  margin-bottom: 20px;
`;

export const ItemRestaurant = styled.div`
  h6 {
    color: #7b7979;
    margin-bottom: 8px;
    max-width: 80%;
  }
`;

export const HeaderItemRestaurant = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    margin-bottom: 8px;
  }
  .view-map {
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
      margin-left: 8px;
    }
  }
`;

export const GroupButton = styled.div`
  display: flex;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    width: 162px;
    font-size: 14px;
    font-style: normal;
    svg {
      margin-right: 7px;
    }
  }
  button:not(:first-child) {
    margin-left: 20px;
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
  bottom: -40px;
  transform: translateY(-50%);
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
  svg {
    transform: rotate(90deg);
    cursor: pointer;
    animation: ${animation} 1s infinite;
    cursor: pointer;
  }
  &.show {
    opacity: 1;
    visibility: visible;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const WrapperScroll = styled.div`
  max-height: 340px;
  height: calc(100% - 120px);
  padding-bottom: 40px;
  overflow: scroll;
  padding-right: 15px;
  margin-right: -15px;

  & > div:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  h5 {
    margin-bottom: 8px;
  }
  h6 {
    margin-bottom: 20px;
    color: 1px solid ${({ theme }) => theme.color.text.subColor};
  }
  ul {
    p {
      margin: 0;
      margin-bottom: 6px;
    }
  }
  @media (max-width: 768px) {
    max-height: fit-content;
  }
`;
