import React from "react";
import Button from "../button";
import IconPoint from "../icons/IconPoint";
import IConPhone from "../icons/iconPhone";
import IConViewMap from "../icons/iconViewMap";
import { FormattedMessage } from "react-intl";
import { WrapperListRestaurant, ItemRestaurant, Title, List, GroupButton } from "./style";
import ScrollShowContent from "../scroll-show-content";
import ItemRestaurantViewMap from "../item-restaurant/item-restaurant-view-map";

const ListRestaurant = ({ listRestaurant, onCallPhone, onViewMap, promoId }) => {
  return (
    <WrapperListRestaurant>
      <Title>
        <FormattedMessage id="promo.list_restaurant_have_promo" />
      </Title>
      <ScrollShowContent>
        <List>
          {listRestaurant?.map((item, index) => (
            <ItemRestaurantViewMap promoId={promoId} restaurant={item} key={index} />
            // <ItemRestaurant key={index}>
            //   <h5>
            //     <span>
            //       <IconPoint /> {item.name}
            //     </span>
            //   </h5>
            //   <p>
            //     {item.address}
            //     <br />
            //     {item.openClose}
            //   </p>
            //   <GroupButton>
            //     <Button size="tiny" varian="outline">
            //       <IConPhone />
            //       {item.phone}
            //     </Button>
            //     <Button size="tiny" varian="outline" onClick={() => onViewMap(true)}>
            //       <IConViewMap />
            //       <FormattedMessage id="promo.view_map" />
            //     </Button>
            //   </GroupButton>
            // </ItemRestaurant>
          ))}
        </List>
      </ScrollShowContent>
    </WrapperListRestaurant>
  );
};

export default ListRestaurant;
