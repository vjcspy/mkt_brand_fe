import React from "react";
import { FormattedMessage } from "react-intl";
import { WrapperListRestaurant, Title, List } from "./style";
import ScrollShowContent from "../scroll-show-content";
import ItemRestaurantBooking from "../item-restaurant/item-restaurant-booking";
const ListRestaurantBooking = ({ listRestaurant, onBook, onViewMap }) => {
  return (
    <WrapperListRestaurant>
      <Title>
        <FormattedMessage id="promo.list_restaurant_have_promo" />
      </Title>
      <ScrollShowContent>
        <List>
          {listRestaurant?.map((item, index) => (
            <ItemRestaurantBooking key={index} restaurant={item} />
          ))}
        </List>
      </ScrollShowContent>
    </WrapperListRestaurant>
  );
};

export default ListRestaurantBooking;
