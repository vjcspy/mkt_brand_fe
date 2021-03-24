import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import Button from "../button";
import IconPhone from "../icons/iconPhone";
import IconPoint from "../icons/IconPoint";
import IConViewMap from "../icons/iconViewMap";
import {
  WrapperItemRestaurant,
  HeadRestaurant,
  WrapperAddress,
  GroupButton,
  Title,
  ItemContent,
  Content,
  ViewMap,
} from "./style";
const ItemRestaurantViewMap = ({ restaurant, onViewMap, promoId }) => {
  const { name, address, openTime, closeTime, tel, aboutKm, code } = restaurant ?? {};
  const [height, setHeight] = useState("auto");
  const [sizeWidth] = useIframeResize();
  const refGroupButton = useRef();
  const onMouseOut = () => {
    if (sizeWidth.width <= 768) return;
    setHeight(refGroupButton.current.scrollHeight);
  };
  const onMouseLeave = () => {
    if (sizeWidth.width <= 768) return;
    setHeight(0);
  };

  // useEffect(() => {
  //   if (sizeWidth.width <= 768) {
  //     setHeight("auto");
  //   }
  // }, []);

  return (
    // <WrapperItemRestaurant onMouseOut={onMouseOut} onMouseLeave={onMouseLeave}>
    <WrapperItemRestaurant>
      <HeadRestaurant>
        <h5>{name}</h5>
        <ViewMap className="view-map" onClick={() => onViewMap()}>
          <span>{aboutKm}km</span>
          <span>
            <IConViewMap color="#7B7979" />
          </span>
        </ViewMap>
      </HeadRestaurant>

      <WrapperAddress>
        <ItemContent>
          <Title>
            <FormattedMessage id="promo.restaurant_address" />:
          </Title>
          <Content>{address}</Content>
        </ItemContent>
        <ItemContent>
          <Title>
            <FormattedMessage id="promo.restaurant_openClose" />:
          </Title>
          <Content>
            {openTime}-{closeTime}
          </Content>
        </ItemContent>
      </WrapperAddress>
      <GroupButton ref={refGroupButton} style={{ height }} className="group-button">
        <Link href={`tel:${tel}`} passHref>
          <Button varian="outline-a" size="tiny">
            <IconPhone />
            {tel}
          </Button>
        </Link>
        <Link href={`/map?idRestaurant=${code}`} passHref>
          <Button target="_blank" varian="outline-a" size="tiny">
            <IConViewMap />
            <FormattedMessage id="promo.view_map" />
          </Button>
        </Link>
      </GroupButton>
    </WrapperItemRestaurant>
  );
};

export default ItemRestaurantViewMap;
