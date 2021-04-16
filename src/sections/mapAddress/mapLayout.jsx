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

const MapLayout = ({ listRestaurant, restaurantViewMap, onBack, item, iconMarker, setSItem }) => {
  const googleMapApi = useSelector((state) => state.get("googleMapApi"));
  const provinceDefault = useSelector((state) => state.getIn(["provinceSelected", "default"]));
  const latLng = useSelector((state) => state.get("latLng"));
  const [zoom, setZoom] = useState(8)
  const [{ width }] = useIframeResize();
  let center = item ? { lat: item?.latitude, lng: item?.longitude }
    : restaurantViewMap ? { lat: restaurantViewMap?.latitude, lng: restaurantViewMap?.longitude } :
      provinceDefault ? latLng ? latLng : { lat: listRestaurant?.[0]?.latitude, lng: listRestaurant?.[0]?.longitude } : { lat: listRestaurant?.[0]?.latitude, lng: listRestaurant?.[0]?.longitude }

  useEffect(() => {
    if (item || restaurantViewMap) {
      setZoom(18)
    } else {
      setZoom(8)
    }
  }, [item, restaurantViewMap])

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
              <p>{`${item.distance ? Math.round(item.distance) / 1000 + "km" : ""}`}</p>
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
        {googleMapApi && (
          <GoogleMapReact bootstrapURLKeys={{ key: googleMapApi.value }} center={center} zoom={zoom}>
            {
              width > 768 && listRestaurant?.map((restaurant, index) => (
                <Marker
                  onClick={() => setSItem(restaurant)}
                  lat={restaurant?.latitude ?? null}
                  lng={restaurant?.longitude ?? null}
                  image={iconMarker?.url ?? "https://ggg-api.s3.ap-southeast-1.amazonaws.com//assets/Group_6577_c07b4df2c3.svg"}
                  zoom={zoom}
                />
              ))}
            {item && width <= 768 && (
              <Marker
                lat={item?.latitude ?? null}
                lng={item?.longitude ?? null}
                title={item?.name}
                image={iconMarker?.url ?? "https://ggg-api.s3.ap-southeast-1.amazonaws.com//assets/Group_6577_c07b4df2c3.svg"}
              />
            )}
            {restaurantViewMap && (
              <Marker

                lat={restaurantViewMap?.latitude ?? null}
                lng={restaurantViewMap?.longitude ?? null}
                title={restaurantViewMap?.name}
                image={iconMarker?.url ?? "https://ggg-api.s3.ap-southeast-1.amazonaws.com//assets/Group_6577_c07b4df2c3.svg"}
              />
            )}
          </GoogleMapReact>
        )}

      </MapWrapper>
    </MapLayoutWrapper>
  );
};

export default MapLayout;
