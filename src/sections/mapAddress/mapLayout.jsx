import React, { forwardRef } from "react";
import Button from "../../components/button";
import IconTel from "../../components/icons/iconTel";
import Marker from "../../components/marker";
import { MapButtons, MapItem, MapItemTitle, MapLayoutWrapper, MapMobileInfo, MapWrapper } from "./styled";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import GoogleMapReact from "google-map-react";

const MapLayout = forwardRef(({ listRestaurant, restaurantViewMap, onBack, item, iconMarker }, ref) => {
  const googleMapApi = useSelector((state) => state.get("googleMapApi"));
  let center = item
    ? { lat: item.latitude, lng: item.longitude }
    : restaurantViewMap
      ? { lat: restaurantViewMap.latitude, lng: restaurantViewMap.longitude }
      : listRestaurant
        ? { lat: listRestaurant[0].latitude, lng: listRestaurant[0].longitude }
        : { lat: 10.7770335, lng: 106.693882 };
  return (
    <MapLayoutWrapper>
      {item && (
        <MapMobileInfo>
          <Button varian="back" onClick={onBack}>
            Back
          </Button>
          <MapItem>
            <MapItemTitle onClick={() => { }}>
              <h4>{item.name}</h4>
              <p>{item.distance + "km"}</p>
            </MapItemTitle>
            <p>{item?.address}</p>

            <MapButtons>
              <Button varian="outline-a" href="tel:19006622">
                <IconTel />
                {item.tel}
              </Button>
              <Link href="https://booking.ggg.com.vn" passHref>
                <a target="_blank" href="https://booking.ggg.com.vn">
                  <Button>
                    <FormattedMessage id="map.booking" />
                  </Button>
                </a>
              </Link>
            </MapButtons>
          </MapItem>
        </MapMobileInfo>
      )}
      <MapWrapper>
        {googleMapApi?.value && (
          <GoogleMapReact bootstrapURLKeys={{ key: googleMapApi.value }} center={center} defaultZoom={8}>
            {!item && !restaurantViewMap &&
              listRestaurant?.map((restaurant, index) => (
                <Marker
                  lat={restaurant?.latitude ?? null}
                  lng={restaurant?.longitude ?? null}
                  title={restaurant.name}
                  image={iconMarker.url}
                />
              ))}
            {item && (
              <Marker
                lat={item.latitude ?? null}
                lng={item.longitude ?? null}
                title={item.name}
                image={iconMarker.url}
              />
            )}
            {restaurantViewMap && (
              <Marker
                lat={restaurantViewMap.latitude ?? null}
                lng={restaurantViewMap.longitude ?? null}
                title={restaurantViewMap.name}
                image={iconMarker.url}
              />
            )}
          </GoogleMapReact>
        )}
      </MapWrapper>
    </MapLayoutWrapper>
  );
});

export default MapLayout;
