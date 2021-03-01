import styled, { keyframes } from "styled-components";

export const WrapperScroll = styled.div`
  overflow-y: auto;
  padding-right: 15px;
  margin-right: -15px;
  height: 100%;
  max-height: ${({ maxHeight }) => (maxHeight > 0 ? maxHeight + "px" : 50 + "%")};
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
  position: relative;
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
