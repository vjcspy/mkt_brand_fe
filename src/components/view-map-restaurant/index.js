import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";
import MapLayout from "../../sections/mapAddress/mapLayout";
import Button from "../button";
import IConPhone from "../icons/iconPhone";
import { WrapperMapRestaurant, InfoRestaurant, MapWrapper, GroupButton } from "./style";
const ViewMapRestaurant = ({ restaurant }) => {
  return (
    <WrapperMapRestaurant>
      <InfoRestaurant>
        <h3>{restaurant?.name}</h3>
        <p>{restaurant?.address}</p>
        <GroupButton>
          <Button size="tiny" varian="outline">
            <IConPhone />
            {restaurant?.tel}
          </Button>
          <Link href="https://booking.ggg.com.vn" passHref>
            <a target="_blank" href="https://booking.ggg.com.vn">
              <Button>
                <FormattedMessage id="map.booking" />
              </Button>
            </a>
          </Link>
        </GroupButton>
      </InfoRestaurant>
      <MapWrapper>
        <MapLayout />
      </MapWrapper>
    </WrapperMapRestaurant>
  );
};

export default ViewMapRestaurant;
