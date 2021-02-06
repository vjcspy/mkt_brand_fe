import styled from "styled-components";

export const WrapperCheckbox = styled.button`
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
    `};
  }
`;
