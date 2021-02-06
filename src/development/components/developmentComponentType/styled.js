import styled from "styled-components";
import { ClickableStyle } from "../../../styles/developmentStyle";

export const ComponentWrapper = styled.div`
  position: relative;

  &:not(:last-child) {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.devColor.border};
  }

  &:not(:first-child) {
    margin-top: 10px;
  }

  label {
    color: #525252;
    text-transform: capitalize;
    display: block;
  }
`;

/// Color component

export const ColorWrapper = styled.button`
  ${ClickableStyle}
  position: relative;
  padding: 5px;
  background: white;
  text-transform: uppercase;

  &:before {
    content: "";
    display: block;
    background: ${({ color }) => color};
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.devColor.border};
  }
`;

export const PickerBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1;
`;

export const PickerDialog = styled.div`
  position: absolute;
  z-index: 2;
  left: 1px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px, rgba(0, 0, 0, 0.3) 0px 4px 8px;
  ${({ position }) => `${position}: calc(100% + 7px);`}

  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 14px;
    height: 14px;
    left: 2px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px, rgba(0, 0, 0, 0.3) 0px 4px 8px;
    background: white;
    transform: translateX(10px) rotate(45deg);
    ${({ position }) => `${position}: -6px;`}
  }

  .chrome-picker {
    box-shadow: none !important;
    padding: 5px;
    border-radius: 4px;
    background: white;
    position: relative;
  }
`;

/// Group

/// Image Component

export const MediaWrapper = styled.div`
  &:not(:first-child) {
    margin-top: 10px;
  }
`;

export const MediaGroupButton = styled.div`
  display: flex;
  flex-wrap: nowrap;

  > button {
    border-radius: 0px;
    margin-right: 0px !important;
    flex: 1 0 auto;

    &:last-child {
      border-bottom-right-radius: 4px;
    }
    &:first-child {
      border-bottom-left-radius: 4px;
    }

    &:not(:first-child) {
      margin-left: -1px;
    }
  }
`;

export const ImageWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.color.page.border};
  border-radius: 4px 4px 0px 0px;
  padding: 5px;
  width: 100%;
  height: 100px;
  background: #d4dce4 url("/images/pattern-transparent.png") 0 0 repeat;
  position: relative;

  img,
  svg {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    margin-left: auto;
    margin-right: auto;
  }
`;

/// Link Component

export const LinkWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.devColor.border};
  padding: 5px;
  background: #e4e9ec;
  border-radius: 4px;
  position: relative;

  ${({ add }) =>
    add
      ? `
      border-style: dashed;
      text-align:center;
      cursor: copy;
      `
      : ""}

  &:not(:first-child) {
    margin-top: 10px;
  }

  label {
    display: block;
    font-size: 15px;
    line-height: 18px;
    &:not(:first-child) {
      margin-top: 10px;
    }
  }

  input {
    width: 100%;
    height: 30px;
    padding: 0px 10px;
    font-weight: 400;
    font-size: 13px;
    cursor: text;
    outline: 0px;
    border: 1px solid rgb(227, 233, 243);
    border-radius: 4px;
    color: rgb(51, 55, 64);
    background-color: white;

    &:not(:first-child) {
      margin-top: 5px;
    }
  }
`;

export const RemoveMenuLink = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: transparent;
  border: 0 none;
  outline: 0 none;
  padding: 3px;
  cursor: pointer;

  &:hover {
    background: white;
  }
`;

export const MultipleWrapper = styled.div`
  // border-radius: 4px;
  // border: 1px solid ${({ theme }) => theme.devColor.border};
  // padding: 5px;
  // background: white;

  > button {
    margin-top: 10px;
  }
`;
