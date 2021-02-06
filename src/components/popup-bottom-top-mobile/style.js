import styled from "styled-components";

export const WrapperPopup = styled.div`
  background: #ffffff;
  border-radius: 10px 10px 0px 0px;

  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 0;
  overflow: hidden;
  transition: 0.3s;

  &.show {
    height: calc(100% - 117px);
  }
`;

export const ContentPopup = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;

  border-radius: 10px 10px 0px 0px;

  & > svg {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;
