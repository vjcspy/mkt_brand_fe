import React, { forwardRef, useState, useEffect } from "react";
import Button from "../../components/button";
import IconTel from "../../components/icons/iconTel";
import Marker from "../../components/marker";
import { MapButtons, MapItem, MapItemTitle, MapLayoutWrapper, MapMobileInfo, MapWrapper } from "./styled";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import GoogleMapReact from "google-map-react";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";

const MapLayout = forwardRef(({ listRestaurant, restaurantViewMap, onBack, item, iconMarker, setSItem }, ref) => {
  const googleMapApi = useSelector((state) => state.get("googleMapApi"));
  const [{ width }] = useIframeResize();
  const [userPosition, setUserPosition] = useState()
  const [center, setCenter] = useState()
  let zoom = item || restaurantViewMap ? 18 : 8

  useEffect(() => {
    if (!process.browser) {
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // call api
        setUserPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            break;
          case error.POSITION_UNAVAILABLE:
            break;
          case error.TIMEOUT:
            break;
          default:
            break;
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  }, [])

  useEffect(() => {
    console.log(userPosition)
    if (item) {
      setCenter({ lat: item.latitude, lng: item.longitude })
    } else if (restaurantViewMap) {
      setCenter({ lat: restaurantViewMap.latitude, lng: restaurantViewMap.longitude })
    } else if (userPosition) {
      setCenter(userPosition)
    } else {
      setCenter({ lat: 21.025140, lng: 105.844173 })
    }
  }, [userPosition, item, restaurantViewMap])

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
              {/* <p>{item.distance + "km"}</p> */}
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
          <GoogleMapReact bootstrapURLKeys={{ key: googleMapApi.value }} center={center} zoom={zoom}>
            {
              width > 768 && listRestaurant?.map((restaurant, index) => (
                <Marker
                  onClick={() => setSItem(restaurant)}
                  lat={restaurant?.latitude ?? null}
                  lng={restaurant?.longitude ?? null}
                  title={restaurant.name}
                  image={iconMarker.url}
                />
              ))}
            {item && width <= 768 && (
              <Marker
                lat={item.latitude ?? null}
                lng={item.longitude ?? null}
                title={item.name}
                image={iconMarker.url}
              />
            )}
            {/* {restaurantViewMap && (
              <Marker

                lat={restaurantViewMap.latitude ?? null}
                lng={restaurantViewMap.longitude ?? null}
                title={restaurantViewMap.name}
                image={iconMarker.url}
              />
            )} */}
          </GoogleMapReact>
        )}
      </MapWrapper>
    </MapLayoutWrapper>
  );
});

export default MapLayout;
