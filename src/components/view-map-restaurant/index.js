import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";
import Button from "../button";
import IConPhone from "../icons/iconPhone";
import { useSelector } from "react-redux";
import { WrapperMapRestaurant, InfoRestaurant, MapWrapper, GroupButton } from "./style";
import GoogleMapReact from "google-map-react";
import Marker from "../../components/marker";
const ViewMapRestaurant = ({ restaurant }) => {
  const googleMapApi = useSelector((state) => state.get("googleMapApi"));
  const iconViewMap = useSelector((state) => state.get("iconViewMap"));
  return restaurant ? (
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
        {/* <GoogleMap
            zoom={10}
            center={{ lat: restaurant?.latitude, lng: restaurant?.longitude }}
            mapContainerStyle={{ height: "100%" }}
          >
            <Marker label={restaurant?.name} position={{ lat: restaurant?.latitude, lng: restaurant?.longitude }} />
          </GoogleMap> */}
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleMapApi.value }}
          center={{ lat: restaurant?.latitude, lng: restaurant?.longitude }}
          defaultZoom={8}
        >
          {restaurant && (
            <Marker
              image={iconViewMap?.url}
              lat={restaurant.latitude ?? null}
              lng={restaurant.longitude ?? null}
              // title={restaurant.name}
            />
          )}
        </GoogleMapReact>
      </MapWrapper>
    </WrapperMapRestaurant>
  ) : null;
};

export default ViewMapRestaurant;
