import styled, { css } from "styled-components";

export const ClickableStyle = css`
  cursor: pointer;
  transition: 0.3s background ease-in-out;
  border-radius: 4px;
  user-select: none;
  display: flex;
  align-items: center;
  background: initial;
  width: 100%;
  text-align: left;

  &:hover,
  &:focus {
    background: #dedede;
  }
`;

const BtnStyle = css`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;

  display: inline-block;
  text-align: center;

  min-width: 100px;
  height: 35px;
  padding-left: 20px;
  padding-right: 20px;

  border-radius: 4px;
  border: 0px none;
  outline: 0 none;
  cursor: pointer;
  position: relative;

  width: ${({ width }) => width ?? "auto"};

  ${({ icon }) =>
    icon
      ? `
  width: 35px;
  padding: 8px;
  min-width: 35px;
  
  svg {
    width: 18px;
    height: 18px;
  }
  `
      : ""}

  &:not(:last-child) {
    margin-right: 10px;
  }

  &:focus,
  &:hover {
    box-shadow: 0px 0px 4px 2px #9393cc;
    z-index: 1;
  }

  &:active {
    box-shadow: none;
  }

  &:disabled {
    background: #dcdcdc;
    color: white;
    border: 0 none;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const PrimaryStyle = css`
  ${BtnStyle}
  color: ${({ theme }) => theme.devColor.btn};
  background-color: ${({ theme }) => theme.devColor.btnBg};
`;

const SecondaryStyle = css`
  ${BtnStyle}
  color: #737373;
  border: 1px solid ${({ theme }) => theme.devColor.border};
  background-color: white;
`;

export const DevPrimaryButton = styled.button`
  ${PrimaryStyle}
`;

export const DevSecondaryButton = styled.button`
  ${SecondaryStyle}
`;

export const DevSecondaryA = styled.a`
  ${SecondaryStyle}
  display: inline-flex;
  jusity-content: center;
  align-items: center;
`;

export const DevInput = styled.input`
  border: 1px solid ${({ theme }) => theme.color.page.border};
  border-radius: 4px;
  background: white;
  text-align: left;
  font-size: 18px;
  line-height: 30px;
  font-weight: normal;
  font-style: normal;
  outline: 0 none;
  
  &:focus {
    box-shadow: 0px 0px 4px 2px #9393cc;
  }
`;
