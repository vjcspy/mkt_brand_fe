import React from "react";
import MapLayout from "../../sections/mapAddress/mapLayout";
import Button from "../button";
import IConPhone from "../icons/iconPhone";
import { WrapperMapRestaurant, InfoRestaurant, MapWrapper, GroupButton } from "./style";
const ViewMapRestaurant = ({ restaurant }) => {
  return (
    <WrapperMapRestaurant>
      <InfoRestaurant>
        <h3>Gogi House Trần Phú</h3>
        <p>Hà Đông - 146 Trần Phú, Mỗ Lao, Hà Đông, Hà Nội</p>
        <GroupButton>
          <Button size="tiny" varian="outline">
            <IConPhone />
            19006622
          </Button>
          <Button size="tiny">Đặt bàn</Button>
        </GroupButton>
      </InfoRestaurant>
      <MapWrapper>
        <MapLayout />
      </MapWrapper>
    </WrapperMapRestaurant>
  );
};

export default ViewMapRestaurant;
