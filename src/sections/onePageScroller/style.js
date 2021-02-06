import styled from "styled-components";

export const WrapperOnePageScroller = styled.div`
  flex: 1;
  max-height: 100%;
  position: relative;
`;

export const GroupButton = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 17px;

  button {
    margin-bottom: 30px;
  }
  svg {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    padding-bottom: 0px;
    svg {
      display: none;
    }
    button {
      margin-bottom: 96px;
    }
  }
`;

export const WrapperListPoint = styled.div`
  position: absolute;
  width: auto;
  height: 30px;
  top: 50%;
  right: 7%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    right: 0;
  }
`;
