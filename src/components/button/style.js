import styled, { css } from "styled-components";
// import { shadeColor } from "../../services/frontend";

const buttonSize = (size) => {
  let s = {
    large: 56,
    medium: 48,
    small: 44,
    tiny: 36,
  };
  return s[size] ?? s.medium;
};
// const buttonColor = ({ theme, status }) => theme.color.status[status] ?? theme.color.status.primary;
// const buttonColorHover = (props) => shadeColor(buttonColor(props), 20);
// const buttonColorActive = (props) => buttonColor(props);

const BtnStyle = css`
  border-radius: 4px;

  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  display: inline-block;
  text-align: center;
  padding-left: 36px;
  padding-right: 36px;

  border: 0px none;
  outline: 0 none;
  cursor: pointer;
  position: relative;
  transition: 0.3s all ease-in-out;
  width: ${({ width }) => width ?? "auto"};
  height: ${({ size }) => buttonSize(size)}px;

  ${({ icon, size }) =>
    icon
      ? `
  width: ${buttonSize(size)}px;
  padding: 8px;
  
  svg {
    width: 18px;
    height: 18px;
  }
  `
      : ""}

  &:hover {
    color: white;
    background: ${({ theme }) => theme.color.status.primaryHover};
    z-index: 1;
  }

  &:focus,
  &:active {
    color: white;
    background: ${({ theme }) => theme.color.status.primaryPressed};
  }

  &:disabled {
    background: ${({ theme }) => theme.color.status.disabled} !important;
    color: ${({ theme }) => theme.color.text.disabled} !important;
    border: 0 none;
    box-shadow: none;
    cursor: not-allowed !important;
  }
`;

const PrimaryStyle = css`
  ${BtnStyle}
  color: white;
  background-color: ${({ theme }) => theme.color.status.primary};
`;

const OutlineStyle = css`
  ${BtnStyle}
  color: ${({ theme }) => theme.color.status.primary};
  border: 1px solid ${({ theme }) => theme.color.status.primary};
  background-color: white;
`;

export const PrimaryButton = styled.button`
  ${PrimaryStyle}
`;

export const OutlineButton = styled.button`
  ${OutlineStyle}
`;

export const PrimaryA = styled.a`
  ${PrimaryStyle}
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const PrimaryLink = styled.a`
  ${PrimaryStyle}
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const OutlineA = styled.a`
  ${OutlineStyle}
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonLink = styled.a`
  position: relative;
  cursor: pointer;
  color: ${({ theme }) => theme.color.status.primary};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: currentColor;
  }

  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 2px;
    background: currentColor;
  }

  &:hover {
    color: ${({ theme }) => theme.color.status.primaryHover};
  }

  &:disabled,
  &.disabled {
    cursor: not-allowed !important;
    color: ${({ theme }) => theme.color.text.disabled} !important;
  }
`;

export const ButtonBack = styled.button`
  border: 0px none;
  outline: 0 none;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: transparent;
  padding: 0px;

  svg {
    margin-right: 12px;
    display: block;
    transform: translateY(-1px);
  }
`;
