import styled from "styled-components";

export const WrapperMapRestaurant = styled.div`
  height: 100%;
`;

export const InfoRestaurant = styled.div``;

export const MapWrapper = styled.div`
  height: calc(100% - 132px);
`;

export const GroupButton = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    padding: 10px 0;
    width: 48%;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      margin-right: 10px;
    }
  }
`;
