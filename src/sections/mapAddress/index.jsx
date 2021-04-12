import { map } from "lodash";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "../../components/button";
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
import { useSelector, useDispatch } from "react-redux";
import IconPhone from "../../components/icons/iconPhone";
import IconTriangleLineDown from "../../components/icons/iconTriangleLineDown";
import { FormattedMessage } from "react-intl";
import { Content, ItemContent, Title, WrapperAddress } from "../../components/item-restaurant/style";
import Link from "next/link";
import { getListRestaurant } from "../../services/backend";
import { showNotification } from "../../components/notification";
import PulseLoader from "../../components/loading";

const defaultConfig = {
  name: "Địa chỉ nhà hàng",
  code: "map",
  id: "map",
  title: "Image Marker",
  components: {
    imageMarker: { type: "image", title: "Image Marker", value: null },
  },
};

const MapAddress = ({ config = defaultConfig, restaurantViewMap, listRestaurant, brandId }) => {
  const dispatch = useDispatch()
  const iconMarker = config.components.imageMarker.value;
  const [size, ref] = useIframeResize();

  const headerHeight = useSelector((s) => s.get("headerHeight") ?? 0);
  const province = useSelector((state) => state.getIn(["provinceSelected"]))?.toJS();
  const latLng = useSelector((state) => state.get("latLng"));

  const [listRestaurantShow, setListRestaurantShow] = useState(listRestaurant)
  const [isEnd, setEnd] = useState();
  const [top, setTop] = useState();
  const [sItem, setSItem] = useState();
  const [loading, setLoading] = useState(false)

  const refList = useRef();

  // get list restaurant when user alow location
  useEffect(async () => {
    setSItem(null)
    if (latLng || !province.default) {
      setLoading(true)
      try {
        const { data: { result, messageCode }, error } = await getListRestaurant({
          brandId,
          provinceId: province.id,
          longitude: latLng?.lng,
          latitude: latLng?.lat,
        })
        if (error || messageCode !== 1) {
          showNotification(dispatch, { content: error.message ?? message ?? "Lỗi khi tải nhà hàng" })
          setLoading(false)
          return
        }
        setListRestaurantShow(result)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        showNotification(dispatch, { content: "Đã có lỗi xảy ra" })
      }
    }
  }, [province.id, latLng])

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
    if (restaurantViewMap) {
      const index = listRestaurantShow.findIndex((item) => item.code === restaurantViewMap.code);
      let position = index > 0 ? refList.current.children[index]?.offsetTop : 0;
      ref.current.scrollTo({ top: position - 60, left: 0 });
    }
  }, [restaurantViewMap]);

  useEffect(() => {
    if (sItem) {
      const index = listRestaurantShow.findIndex((item) => item.code === sItem.code);
      let position = index > 0 ? refList.current.children[index]?.offsetTop : 0;
      ref.current.scrollTo({ top: position - 20, left: 0 });
    }
  }, [sItem])

  return (
    <Container ref={measuredRef}>
      {loading && (
        <div
          style={{
            background: "rgba(0, 0, 0, 0.6)",
            height: "100vh",
            width: "100vw",
            zIndex: "3000",
            position: "fixed",
            top: 0,
            left: 0
          }}
        >
          <PulseLoader color="#DA841E" loading fill />
        </div>
      )}
      <MapAddressWrapper headerHeight={headerHeight}>
        <LeftContent className={isEnd ? "end" : ""}>
          {size.width <= 768 && (
            <TitleListMobile>
              <FormattedMessage id="map.address_restaurant" />
            </TitleListMobile>
          )}
          <MapItemsWrapper ref={ref}>
            <ul ref={refList}>
              {map(listRestaurantShow, (item, index) => {
                return (
                  <li key={index} className={`${item.code === sItem?.code || item.code === restaurantViewMap?.code ? "active" : ""}`}>
                    <MapItem onClick={() => setSItem(item)}>
                      <MapItemTitle>
                        <h4>{item.name}</h4>
                        {`${item.distance ? Math.round(item.distance) / 1000 + "km" : ""}`}
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
                    {index < listRestaurantShow.length - 1 && <hr />}
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
            listRestaurant={listRestaurantShow}
            restaurantViewMap={restaurantViewMap}
            item={sItem}
            setSItem={setSItem}
            onBack={() => setSItem(false)}
          />
        </RightContent>
      </MapAddressWrapper>
    </Container>
  );
};

MapAddress.defaultConfig = defaultConfig;

export default MapAddress;
