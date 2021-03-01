import styled, { keyframes } from "styled-components";

export const MapAddressWrapper = styled.div`
  display: flex;
  width: 100%;
  max-height: calc(100vh - ${({ headerHeight }) => headerHeight ?? 0}px);
  padding-bottom: 40px;

  @media (max-width: 768px) {
    max-height: none;
    flex-wrap: wrap;
  }
`;

export const LeftContent = styled.div`
  width: 400px;
  margin-right: 40px;
  position: relative;

  @media (max-width: 768px) {
    margin-right: 0px;
    width: 100%;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 100px;
    background: linear-gradient(0deg, white, transparent);
    pointer: none;
    transition: opacity 0.3s ease-in-out;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &.end {
    &:after {
      opacity: 0;
    }
  }

  ul {
    margin: 0px;
    padding-left: 18px;

    li {
      list-style-type: disc;
    }
  }
`;

export const MapItemsWrapper = styled.div`
  height: 100%;
  overflow: auto;
  padding-right: 15px;
  margin-right: -15px;
`;

export const RightContent = styled.div`
  flex: 1 0 0;

  @media (max-width: 768px) {
    position: fixed;
    top: ${({ headerHeight }) => headerHeight}px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    padding: 24px 20px 20px;
    background: white;
  }
`;

export const MapLayoutWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const MapWrapper = styled.div`
  flex: 1;
  @media (max-width: 768px) {
    margin-top: 20px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.color.page.border};
  }
`;

export const MapItem = styled.div`
  p {
    margin-bottom: 0px;
  }
`;

export const MapMobileInfo = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    > button {
      margin-bottom: 40px;
    }
  }
`;

export const MapItemTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  h4 {
    flex: 1;
  }

  svg {
    margin-left: 6px;
    display: none;
    color: ${({ theme }) => theme.color.text.description};
    cursor: pointer;
    @media (max-width: 768px) {
      display: inline-block;
    }
  }
`;

export const MapButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    width: calc(50% - 12px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    svg {
      margin-right: 12px;
    }
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
  z-index: 100;

  & svg {
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
    bottom: -20px;
  }
`;
