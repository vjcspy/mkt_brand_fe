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

export const WrapperButtonEditer = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: flex-end;
`;

export const WrapperRatio = styled.div`
  display: flex;
  border-radius: 4px;
  justify-content: space-between;
  padding: 5px 10px;
  background: #fff;
  margin-top: 10px;
`;

export const ItemRadio = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 45px;
`;

export const PopupWrapperEditer = styled.div`
  position: fixed;
  width: 100vw;
  height: var(--app-height);
  top: 50%;
  left: 50%;
  /* -webkit-transform: translate(-50%,-50%); */
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 1000;
  padding: 20px;
  background-color: #0000009e;
`;

export const ContentEditer = styled.div`
  position: relative;
  padding: 20px;
  border-radius: 5px;
  background-color: #ffff;
  h3 {
    margin-bottom: 10px;
  }
  .read-only {
    background-color: #cccccc36;
  }
`;

export const WrapperButtonSave = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  button:first-child {
    margin-right: 10px;
  }
`;

export const SectionTitleWrapper = styled.div`
  flex: 1 0 0;
`;

export const GroupButton = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  // button:not(:last-child) {
  //   margin-right: 10px;
  // }
  button {
    width: calc(50% - 5px);
    padding: 0;
  }
  .btn-edit-content {
    padding: 0;
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

export const WrapperDropDown = styled.div`
  position: relative;
  margin-top: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.devColor.border};
`;

export const Marker = styled.div`
  position: fixed;
  width: 100vw;
  height: var(--app-height);
  left: 0;
  top: 0;
  z-index: 1;
`;

export const TitleDropDown = styled.div`
  background: #ffff;
  padding: 14px 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 2;
  p {
    margin: 0 63px 0 17px;
  }

  svg {
    position: absolute;
    right: 20px;
  }

  @media (max-width: 768px) {
    p {
      margin: 0 30px 0 17px;
    }
  }
`;

export const ListOption = styled.div`
  position: absolute;
  background: #ffffff;
  width: 160px;
  overflow: auto;
  z-index: 10;
  border: 1px solid #231f20;
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  padding-top: 2px;
  max-height: 160px;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 24px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background: #e9e9e9;
    }

    p {
      margin: 0;
    }

    svg {
      color: ${({ theme }) => theme.color.status.primary};
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    div {
      padding: 10px 16px;
      p {
        font-size: 14px;
      }
    }
  }
`;

export const WrapperListCheckBox = styled.div`
  margin-top: 18px;
`;

export const WrapperTitle = styled.div``;

export const WrapperListOption = styled.div`
  padding: 10px;
  background: #ffff;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const ItemSelected = styled.div`
  display: flex;
  margin-right: 15px;
  cursor: pointer;
  margin-bottom: 10px;
  p {
    margin: 0;
  }
`;

export const Checkbox = styled.button`
  padding-left: 20px;
  cursor: pointer;
  border: 0 none;
  outline: 0 none;
  border-radius: 5px;
  font-style: normal;
  font-size: 14px;
  line-height: 24px;
  transition: all 0.3s ease-in-out;
  background: transparent;
  position: relative;
  cursor: pointer;
  display: inline-flex;
  text-align: left;

  // &:focus {
  //   &:before {
  //     box-shadow: 0 0 0 0.2rem ${({ theme }) => theme.color.status.primary};
  //     color: transparent;
  //   }
  // }

  &:before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    border: ${({ checked, theme }) => (checked ? "none" : "1px solid " + theme.devColor.border)};
    border-radius: 4px;
    position: absolute;
    top: 3px;
    left: 0px;
  }
  &:after {
    content: "";
    display: ${({ checked }) => (checked ? "block" : "none")};
    width: 20px;
    height: 20px;
    background: url("/images/ic_checked_square.svg");
    position: absolute;
    top: 3px;
    left: 1px;
    background-repeat: no-repeat;
  }
`;

export const WrapperUploadImageBlog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: var(--app-height);
`;
