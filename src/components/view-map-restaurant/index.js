import Link from "next/link";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";
import { FormattedMessage } from "react-intl";
import MapLayout from "../../sections/mapAddress/mapLayout";
import Button from "../button";
import IConPhone from "../icons/iconPhone";
import { useSelector } from "react-redux";
import { WrapperMapRestaurant, InfoRestaurant, MapWrapper, GroupButton } from "./style";
const ViewMapRestaurant = ({ restaurant }) => {
  const googleMapApi = useSelector((state) => state.get("googleMapApi"));

  return (
    <LoadScript googleMapsApiKey={googleMapApi?.value}>
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
                <Button size="tiny">
                  <FormattedMessage id="map.booking" />
                </Button>
              </a>
            </Link>
          </GroupButton>
        </InfoRestaurant>
        <MapWrapper>
          <GoogleMap
            zoom={10}
            center={{ lat: restaurant?.latitude, lng: restaurant?.longitude }}
            mapContainerStyle={{ height: "100%" }}
          >
            <Marker label={restaurant?.name} position={{ lat: restaurant?.latitude, lng: restaurant?.longitude }} />
          </GoogleMap>
        </MapWrapper>
      </WrapperMapRestaurant>
    </LoadScript>
  );
};

export default ViewMapRestaurant;
