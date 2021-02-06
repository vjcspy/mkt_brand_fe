import styled from "styled-components";

export const MenuScrollItem = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MenuScrollWrapper = styled.div`
  flex: 1;
  max-height: 100%;
  position: relative;
`;

export const DotsWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 90px;
  transform: translateY(-50%);
`;

export const MenuInfoWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 17px;

  h1 {
    margin-bottom: 10px;
    color: white;
  }

  h3 {
    margin-bottom: 32px;
    color: white;
  }

  svg {
    margin-top: 40px;
  }
`;
