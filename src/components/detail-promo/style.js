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
    margin-bottom: 10px;
    text-align: center;
  }
  .notify {
    margin: 8px 0;
  }
  button {
    margin-top: 12px;
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
    width: 90%;
  }
  button:last-child {
    margin-right: 0;
  }
  button:hover {
    z-index: 0;
  }
`;

export const Restaurant = styled.div``;
export const NameRestaurant = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  p {
    margin: 0;
    display: flex;
    align-items: center;
    svg {
      margin-left: 5px;
    }
  }
`;
