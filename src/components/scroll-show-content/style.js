import styled, { keyframes } from "styled-components";

export const WrapperScroll = styled.div`
  height: 100%;
`;

export const WrapperContent = styled.div`
  position: relative;
  @media (max-width: 768px) {
    position: unset;
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

export const Content = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding-right: 15px;
  margin-right: -15px;
  @media (max-width: 768px) {
    max-height: 100vh;
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
