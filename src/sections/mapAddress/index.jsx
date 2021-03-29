import { map } from "lodash";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "../../components/button";
import maps from "../../dummyData/maps";
import { Container } from "../../styles";
import {
  LeftContent,
  MapAddressWrapper,
  MapButtons,
  MapItem,
  MapItemsWrapper,
  MapItemTitle,
  RightContent,
  HiddenContent,
  TitleListMobile,
} from "./styled";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import IconMap from "../../components/icons/iconMap";
import MapLayout from "./mapLayout";
import { useSelector } from "react-redux";
import IconPhone from "../../components/icons/iconPhone";
import IconTriangleLineDown from "../../components/icons/iconTriangleLineDown";
import { FormattedMessage } from "react-intl";
import { Content, ItemContent, Title, WrapperAddress } from "../../components/item-restaurant/style";
import Link from "next/link";

const defaultConfig = {
  name: "Địa chỉ nhà hàng",
  code: "map",
  id: "map",
  title: "Image Marker",
  components: {
    imageMarker: { type: "image", title: "Image Marker", value: null },
  },
};

const MapAddress = ({ config = defaultConfig, restaurantViewMap, listRestaurant }) => {
  const iconMarker = config.components.imageMarker.value;
  const mapRef = useRef();
  const refList = useRef();
  const [isEnd, setEnd] = useState();
  const [top, setTop] = useState();
  const [size, ref] = useIframeResize();
  const [sItem, setSItem] = useState();
  const headerHeight = useSelector((s) => s.get("headerHeight") ?? 0);



  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setTop(node.getBoundingClientRect().top);
    }
  }, []);

  const onScroll = useCallback((e) => {
    let dom = e.target ?? e;
    setEnd(dom.scrollTop + dom.offsetHeight >= dom.scrollHeight);
  }, []);

  useEffect(() => {
    ref.current?.addEventListener("scroll", onScroll, { passive: true });
    return () => ref.current?.removeEventListener("scroll", onScroll, { passive: true });
  }, [onScroll]);

  useEffect(() => {
    onScroll(ref.current);
  }, [size]);

  useEffect(() => {
    if (listRestaurant && restaurantViewMap || sItem) {
      console.log(restaurantViewMap)
      console.log(listRestaurant[9])
      const index = listRestaurant.findIndex((item) => item.code === restaurantViewMap?.code || item.code === sItem?.code);
      let position = index > 0 ? refList.current.children[index]?.offsetTop : 0;
      ref.current.scrollTo({ top: position - 60, left: 0 });
    }
  }, [sItem, listRestaurant]);

  return (
    <Container ref={measuredRef}>
      <MapAddressWrapper headerHeight={headerHeight}>
        <LeftContent className={isEnd ? "end" : ""}>
          {size.width <= 768 && (
            <TitleListMobile>
              <FormattedMessage id="map.address_restaurant" />
            </TitleListMobile>
          )}
          <MapItemsWrapper ref={ref}>
            <ul ref={refList}>
              {map(listRestaurant, (item, index) => {
                return (
                  <li key={index} className={`${item.code === sItem?.code || item.code === restaurantViewMap?.code ? "active" : ""}`}>
                    <MapItem onClick={() => setSItem(item)}>
                      <MapItemTitle>
                        <h4>{item.name}</h4>
                        {/* <p>{"km"}</p> */}
                        <IconMap className="text-description" />
                      </MapItemTitle>

                      <WrapperAddress>
                        <ItemContent>
                          <Content>{item?.address}</Content>
                        </ItemContent>
                        <ItemContent>
                          <Title style={{ minWidth: 80 }}>
                            <FormattedMessage id="promo.restaurant_openClose" />:
                          </Title>
                          <Content>
                            {item?.openTime}-{item?.closeTime}
                          </Content>
                        </ItemContent>
                      </WrapperAddress>

                      <MapButtons>
                        <Button varian="outline" href="tel:19006622">
                          <IconPhone width={200} />
                          <span>{item.tel}</span>
                        </Button>
                        {size.width > 768 ? (
                          <Link href="https://booking.ggg.com.vn" passHref>
                            <a target="_blank" href="https://booking.ggg.com.vn">
                              <Button>
                                <FormattedMessage id="map.booking" />
                              </Button>
                            </a>
                          </Link>
                        ) : (
                          <Button onClick={() => setSItem(item)}>
                            <FormattedMessage id="map.booking" />
                          </Button>
                        )}
                      </MapButtons>
                    </MapItem>
                    {index < listRestaurant.length - 1 && <hr />}
                  </li>
                );
              })}
            </ul>
          </MapItemsWrapper>
          <HiddenContent className={`${!isEnd ? "show" : ""}`}>
            <IconTriangleLineDown />
          </HiddenContent>
        </LeftContent>

        <RightContent className={`${sItem ? "open" : ""}`} headerHeight={headerHeight}>
          <MapLayout
            iconMarker={iconMarker}
            listRestaurant={listRestaurant}
            restaurantViewMap={restaurantViewMap}
            item={sItem}
            setSItem={setSItem}
            onBack={() => setSItem(false)}
            ref={mapRef}
          />
        </RightContent>
      </MapAddressWrapper>
    </Container>
  );
};

MapAddress.defaultConfig = defaultConfig;

export default MapAddress;
