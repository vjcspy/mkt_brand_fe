import { map } from "lodash";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "../../components/button";
import IconTel from "../../components/icons/iconTel";
import maps from "../../dummyData/maps";
import { Container } from "../../styles";
import { LeftContent, MapAddressWrapper, MapButtons, MapItem, MapItemsWrapper, MapItemTitle, RightContent } from "./styled";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import IconMap from "../../components/icons/iconMap";
import MapLayout from "./mapLayout";
import { useSelector } from "react-redux";

const defaultConfig = {
  name: "Địa chỉ nhà hàng",
  code: "map",
  id: "map",
  title: "Address Map",
  components: {},
};

const MapAddress = () => {
  const mapRef = useRef();
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
    onScroll(ref.current);
  }, [size]);

  return (
    <Container ref={measuredRef} onLoad={() => console.log("onLoad")}>
      <MapAddressWrapper headerHeight={top}>
        <LeftContent className={isEnd ? "end" : ""}>
          <MapItemsWrapper ref={ref} onScroll={onScroll}>
            <ul>
              {map(maps, (item, index) => {
                return (
                  <li key={index}>
                    <MapItem>
                      <MapItemTitle
                        onClick={() => {
                          setSItem(item);
                        }}
                      >
                        <h4>{item.name}</h4>
                        <p>{item.distance + "km"}</p>
                        <IconMap className="text-description" />
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
                    {index < maps.length - 1 && <hr />}
                  </li>
                );
              })}
            </ul>
          </MapItemsWrapper>
        </LeftContent>
        {size.width > 768 || sItem ? (
          <RightContent headerHeight={headerHeight}>
            <MapLayout item={sItem} onBack={() => setSItem(null)} ref={mapRef} />
          </RightContent>
        ) : null}
      </MapAddressWrapper>
    </Container>
  );
};

MapAddress.defaultConfig = defaultConfig;

export default MapAddress;
