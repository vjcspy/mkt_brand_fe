import React from "react";
import Button from "../button";
import IconPoint from "../icons/IconPoint";
import IConPhone from "../icons/iconPhone";
import IConViewMap from "../icons/iconViewMap";

import { WrapperListRestaurant, ItemRestaurant, Title, List, GroupButton } from "./style";
export const ListRestaurant = ({ listRestaurant, onCallPhone, onViewMap }) => {
  return (
    <WrapperListRestaurant>
      <Title>Danh sách các nhà hàng áp dụng mã ưu đãi</Title>
      <List>
        {listRestaurant?.map((item, index) => (
          <ItemRestaurant key={index}>
            <h5>
              <span>
                <IconPoint /> {item.name}
              </span>
            </h5>
            <p>{item.address}</p>
            <GroupButton>
              <Button size="tiny" varian="outline">
                <IConPhone />
                {item.phone}
              </Button>
              <Button size="tiny" varian="outline" onClick={() => onViewMap(true)}>
                <IConViewMap />
                View map
              </Button>
            </GroupButton>
          </ItemRestaurant>
        ))}
      </List>
    </WrapperListRestaurant>
  );
};

export const ListRestaurantBooking = ({ listRestaurant, onBook, onViewMap }) => {
  return (
    <WrapperListRestaurant>
      <Title>Danh sách các nhà hàng áp dụng mã ưu đãi</Title>
      <List>
        {listRestaurant?.map((item, index) => (
          <ItemRestaurant key={index}>
            <h5>
              <span>
                <IconPoint /> {item.name}
              </span>
              <span onClick={() => onViewMap()}>
                0.7km
                <IConViewMap color="#7B7979" />
              </span>
            </h5>
            <p>{item.address}</p>
            <GroupButton>
              <Button size="tiny" varian="outline">
                <IConPhone />
                {item.phone}
              </Button>
              <Button size="tiny" onClick={() => onBook()}>
                Đặt bàn
              </Button>
            </GroupButton>
          </ItemRestaurant>
        ))}
      </List>
    </WrapperListRestaurant>
  );
};
