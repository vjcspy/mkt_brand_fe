import styled from "styled-components";

export const WrapperLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #00000063;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GroupButton = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 10px;
  }
`;

export const ContentLayer = styled.div`
  display: block;
  width: 90%;
  height: 97%;
  max-width: 1024px;
  position: relative;
  background-color: white;
  overflow: scroll;

  padding: 10px;
  border-radius: 10px;
`;

export const WrapperEditContent = styled.div`
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  margin-bottom: 10px;
  & > div {
    border-bottom: none !important;
  }
`;

export const WrapperControl = styled.div`
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  margin-bottom: 10px;

  display: flex;
  justify-content: space-between;
  & > div {
    width: 32%;
    margin: 0;
    padding: 0;
    border-bottom: none;
    .custom-default {
      border: 1px solid #e5e5e5;
    }
  }
`;

export const WrapperListSection = styled.div``;

export const ListItemSection = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  & > div {
    padding: 5px 14px;
    cursor: grab;
  }
  & > div:not(:last-child) {
    border-bottom: 1px solid #cccccc;
  }
`;
