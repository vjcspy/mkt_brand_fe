import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { forwardRef } from "react";
import Button from "../../components/button";
import IconTel from "../../components/icons/iconTel";
import { MapButtons, MapItem, MapItemTitle, MapLayoutWrapper, MapMobileInfo, MapWrapper } from "./styled";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

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
    <LoadScript googleMapsApiKey={googleMapApi?.value}>
      <MapLayoutWrapper>
        {item && (
          <MapMobileInfo>
            <Button varian="back" onClick={onBack}>
              Back
            </Button>
            <MapItem>
              <MapItemTitle onClick={() => {}}>
                <h4>{item.name}</h4>
                <p>{item.distance + "km"}</p>
              </MapItemTitle>

              <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
              <div dangerouslySetInnerHTML={{ __html: item.openHour }}></div>

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
          <GoogleMap zoom={10} center={center} mapContainerStyle={{ height: "100%" }} ref={ref}>
            {item ? (
              <Marker icon={iconMarker?.url} position={{ lat: item.latitude, lng: item.longitude }} />
            ) : restaurantViewMap ? (
              <Marker
                icon={iconMarker?.url}
                position={{ lat: restaurantViewMap.latitude, lng: restaurantViewMap.longitude }}
              />
            ) : (
              listRestaurant?.map((restaurant, index) => (
                <Marker
                  icon={iconMarker?.url}
                  key={index}
                  position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
                />
              ))
            )}
          </GoogleMap>
        </MapWrapper>
      </MapLayoutWrapper>
    </LoadScript>
  );
});

export default MapLayout;
