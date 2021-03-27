import React from "react";
import { FormattedMessage } from "react-intl";
import { WrapperListRestaurant, Title, List } from "./style";
import ScrollShowContent from "../scroll-show-content";
import ItemRestaurantBooking from "../item-restaurant/item-restaurant-booking";
const ListRestaurantBooking = ({ listRestaurant, onBook, onViewMap, promoId }) => {
  return (
    <WrapperListRestaurant>
      <Title>
        <FormattedMessage id="promo.list_restaurant_have_promo" />
      </Title>
      <ScrollShowContent key="ListRestaurantBooking">
        <List>
          {listRestaurant?.map((item, index) => (
            <ItemRestaurantBooking
              promoId={promoId}
              key={index}
              restaurant={item}
              onViewMap={onViewMap}
              onBook={onBook}
            />
          ))}
        </List>
      </ScrollShowContent>
    </WrapperListRestaurant>
  );
};

export default ListRestaurantBooking;
