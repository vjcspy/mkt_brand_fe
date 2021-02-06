import styled from "styled-components";
export const Checkbox = styled.button`
  padding-left: 26px;
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

  &:focus {
    &:before {
      box-shadow: 0 0 0 0.2rem ${({ theme }) => theme.focusShadow};
      color: transparent;
    }
  }

  &:before {
    content: "";
    display: block;
    width: 18px;
    height: 18px;
    border: ${({ checked, theme }) => (checked ? "none" : "1px solid #7B7979;")};
    border-radius: 4px;
    position: absolute;
    top: -12px;
    left: 1px;
  }
  &:after {
    content: "";
    display: ${({ checked }) => (checked ? "block" : "none")};
    width: 18px;
    height: 18px;
    background: url("/images/ic/ic_check_square.svg");
    position: absolute;
    top: -12px;
    left: 1px;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
