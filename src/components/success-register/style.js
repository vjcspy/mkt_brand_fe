import styled, { keyframes } from "styled-components";

export const HeaderDesktop = styled.div`
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.color.page.border};
  margin-bottom: 16px;
  display: flex;
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
  margin-right: 10px;
  background: ${({ theme }) => theme.color.page.borderInput};
  @media (max-width: 768px) {
    margin: 0;
    margin-bottom: 8px;
    padding: 3px;
    border-radius: 4px;
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
  }
  button:last-child {
    margin-right: 0;
  }
  button:hover {
    z-index: 0;
  }
`;

export const WrapperScroll = styled.div`
  max-height: 410px;
  overflow-y: auto;

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
  @media (max-width: 768px) {
    max-height: fit-content;
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
