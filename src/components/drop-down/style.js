import styled from "styled-components";

export const WrapperSelectLocation = styled.div`
  position: relative;
`;

export const TitleLocation = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 2;
  p {
    margin: 0 63px 0 17px;
  }
  @media (max-width: 768px) {
    p {
      margin: 0 10px 0 5px;
    }
  }
`;

export const ListLocation = styled.div`
  position: absolute;
  background: #ffffff;
  width: 160px;
  overflow: auto;
  z-index: 10;
  border: 1px solid #231f20;
  box-sizing: border-box;
  border-radius: 4px;
  top: 100%;
  padding-top: 2px;
  max-height: 150px;
  overflow-y:auto;
  z-index:10;
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

export const Marker = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1;
`;
