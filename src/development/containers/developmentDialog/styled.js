import styled from "styled-components";

export const DialogBackground = styled.div`
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  width: 100%;
  height: var(--app-height);
  overflow: auto;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1500;

  &.center {
    align-items: center;
  }

  &.top {
    align-items: flex-start;
  }
`;

export const DialogWrapper = styled.div`
  max-width: 80%;
  background: white;
  border-radius: 4px;
  margin-top: 20px;
  overflow: hidden;
`;

export const DialogBody = styled.div`
  padding: 10px 20px;
  position: relative;
`;

export const DialogHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.devColor.border};
  padding: 20px;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  height: 70px;

  h3 {
    margin: 0px;
  }
`;

export const DialogFooter = styled.div`
  max-height: 100px;
  border-top: 1px solid ${({ theme }) => theme.devColor.border};
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #fafafa;
`;

export const SearchWrapper = styled.div`
  display: flex;
  width: 100%;

  svg {
    margin-right: 10px;
  }

  input {
    position: relative;
    width: 100%;
    outline: 0px;
    background-color: transparent;
    border-style: none;

    ::-webkit-input-placeholder {
      color: #afafaf;
    }
    ::-moz-placeholder {
      color: #afafaf;
    }
    :-ms-input-placeholder {
      color: #afafaf;
    }
    :-moz-placeholder {
      color: #afafaf;
    }
  }
`;
