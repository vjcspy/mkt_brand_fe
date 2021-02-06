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
  flex-direction: column;
  display: flex;
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
  h4 {
    margin-bottom: 8px;
    line-height: 24px;
  }
  h6 {
    font-weight: 600;
    line-height: 22px;
    color: #7b7979;
    margin-bottom: 2px;
  }
  p {
    margin: 0;
    text-align: center;
    margin-bottom: 22px;
  }
`;

export const WrapperImageCode = styled.div`
  padding: 3px;
  border-radius: 4px;
  background: ${({ theme }) => theme.color.page.borderInput};
  margin-bottom: 8px;
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
    display: flex;
    align-items: center;

    svg {
      margin-left: 5px;
      transform: rotate(-90deg);
    }
  }
  h6 {
    margin-bottom: 20px;
    color: 1px solid ${({ theme }) => theme.color.text.subColor};
  }
  @media (max-width: 768px) {
    max-height: fit-content;
  }
`;

export const Item = styled.div`
  margin-bottom: 20px;
`;
