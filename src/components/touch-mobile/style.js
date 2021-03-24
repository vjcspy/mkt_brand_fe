import styled from "styled-components";

export const WrapperDrag = styled.div`
  background: #ffffff;
  border-radius: 10px 10px 0px 0px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  // transition: 0.3s;
  max-height: calc(100% - 35px);
  min-height: 260px;
  transition: 0.3s;
`;

export const ContentDrag = styled.div`
  height: 100%;
`;

export const IconDrag = styled.div`
  width: 100%;
  height: 45px;
  border-radius: 10px;
  background: #ffffff;
  position: relative;
  user-select: none;
  svg {
    position: absolute;
    top: 20px;
    right: 50%;
    transform: translateX(calc(50% + 10px));

    &.close {
      right: 40px;
    }
  }
`;
export const IconCloseDrag = styled.div`
  width: 100%;
  height: 40px;
  background: #ffffff;
  position: relative;
  svg {
    position: absolute;

    top: 20px;
  }
`;

export const Content = styled.div`
  height: 100%;
  padding: 0 20px 50px;
  &.show {
    overflow: scroll;
  }
  @media (max-width: 768px) {
    &.show {
      overflow: auto;
      padding-bottom: 50px;
    }
  }
`;
