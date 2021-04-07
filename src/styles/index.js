import styled from "styled-components";

export const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  flex: 1;
  position: relative;
`;

export const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #ffffff;
  // overflow-x: hidden;
`;

export const Container = styled.div`
  max-width: 1290px;
  margin-left: auto;
  margin-right: auto;
  padding-left 40px;
  padding-right: 40px;
  width: 100%;

  @media (max-width: 767px) {
    padding-left 20px;
    padding-right: 20px;
  }
`;

export const RadioButton = styled.button`
  position: relative;
  display: block;
  padding-left: 32px;

  border: none;
  outline: none;
  background: none;
  cursor: pointer;

  &:before {
    height: 24px;
    width: 24px;
    content: "";
    position: absolute;
    top: calc(50% - 12px);
    left: 0px;

    border-radius: 50%;
    border: 1px solid currentColor;
    user-select: none;
    transition: border 0.3s ease-in-out;

    ${({ checked, theme }) =>
      checked &&
      `
    border: 7px solid ${theme.color.status.primary};
    `}
  }
`;

export const OnePageHorizontalWrapper = styled.div`
  width: 100%;
  position: relative;
  height: fit-content;
`;

export const OnePageVerticalWrapper = styled.div`
  height: 100%;
  position: relative;
`;
