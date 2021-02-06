import { GoogleMap, LoadScript } from "@react-google-maps/api";
import React, { forwardRef } from "react";
import Button from "../../components/button";
import IconTel from "../../components/icons/iconTel";
import { MapButtons, MapItem, MapItemTitle, MapLayoutWrapper, MapMobileInfo, MapWrapper } from "./styled";

const MapLayout = forwardRef(({ onBack, item, center = { lat: 10.7770335, lng: 106.693882 } }, ref) => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
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
                  19006622
                </Button>
                <Button>Đặt bàn</Button>
              </MapButtons>
            </MapItem>
          </MapMobileInfo>
        )}
        <MapWrapper>
          <GoogleMap zoom={14} center={center} mapContainerStyle={{ height: "100%" }} ref={ref}></GoogleMap>
        </MapWrapper>
      </MapLayoutWrapper>
    </LoadScript>
  );
});

export default MapLayout;
