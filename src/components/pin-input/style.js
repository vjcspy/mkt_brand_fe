import styled from "styled-components";

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.inputBackground};
  border-bottom: 1px solid ${({ theme }) => theme.color.page.borderInput};
  // border-radius: 4px;
  outline: 0 none;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  position: relative;
  margin-bottom: 20px;
  &.focus {
    box-shadow: 0 0 0 0.2rem rgba(232, 119, 34, 0.333333);
  }

  > input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: -1;
  }
`;

export const Code = styled.label`
  display: inline-block;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.page.borderInput};
  width: 20px;
  height: 24px;
  margin-left: 7px;
  margin-right: 7px;
`;
