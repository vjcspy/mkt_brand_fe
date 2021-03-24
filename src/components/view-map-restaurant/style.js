import styled from "styled-components";

export const WrapperMapRestaurant = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const InfoRestaurant = styled.div`
  p {
    margin: 0;
  }
`;

export const MapWrapper = styled.div`
  height: calc(100% - 132px);
  .gm-fullscreen-control,
  .gm-svpc,
  .gmnoprint {
    display: none;
  }
`;

export const GroupButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  button,
  a {
    padding: 10px 0;
    width: 48%;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      margin-right: 10px;
    }
    button {
      width: 100%;
    }
  }
`;
