import React, { useMemo, useState } from "react";
import Button from "../../components/button";
import { useSelector } from "react-redux";
import LinkRouter from "../../components/link-router";
import { WrapperOnePageScroller, GroupButton, WrapperListPoint, WrapperSection } from "./style";
import loadable from "@loadable/component";

import ReactPageScroller from "../../../plugins/react-page-scroller";
import ImageMedia from "../../development/components/imageMedia";
import PointNavigation from "../../components/point-navigation";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import OnePageScroll from "../../components/one-page-scroll/one-page-scroll";
import DynamicFooter from "../dynamic-footer";

const IconTriangleLineTop = loadable(() => import("../../components/icons/iconTriangleLineTop"));
const IconTriangleLineDown = loadable(() => import("../../components/icons/iconTriangleLineDown"));

const BannerItem = ({ config, footer }) => {
  const locale = useSelector((s) => s.get("locale"));
  const [currentPage, setCurrentPage] = useState(0);
  const tabShouldShow = config.value.filter((item) => item.statusTab.value.active === "Show");
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const [{ width, height }, ref] = useIframeResize();
  const Images = useMemo(() => {
    var items = tabShouldShow.concat(null);
    return items.map((item, index) =>
      item === null ? (
        <WrapperSection key={index}>
          <DynamicFooter config={footer} />
        </WrapperSection>
      ) : (
        <WrapperSection key={index}>
          <ImageMedia
            preload={true}
            width="100%"
            height="100%"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            media={width > 768 ? item.imageDesktop.value : item.imageMobile.value}
          />

          <GroupButton>
            {item.showHead.value.active === "Show" && <h1>{item.headText.value[locale]}</h1>}
            {item.showContent.value.active === "Show" && <h3>{item.contentText.value[locale]}</h3>}
            <LinkRouter href={`${item.link?.value?.url ?? "/ "}`} passHref>
              <a className="link-banner">
                <Button className="button-banner">
                  <span>{item.link?.value?.label[locale] ?? "Xem ưu đãi"}</span>
                </Button>
              </a>
            </LinkRouter>
          </GroupButton>
        </WrapperSection>
      )
    );
  }, [tabShouldShow, width]);
  return (
    <WrapperOnePageScroller ref={ref}>
      <OnePageScroll
        customPageNumber={currentPage}
        containerHeight={height - headerHeight}
        pageOnChange={setCurrentPage}
      >
        {Images}
      </OnePageScroll>
      <WrapperListPoint>
        <IconTriangleLineTop className="top" color="#ffffff" />
        <PointNavigation display="block" currentIndex={currentPage} size={tabShouldShow.length + 1} />
        <IconTriangleLineDown className="bottom" color="#ffffff" />
      </WrapperListPoint>
    </WrapperOnePageScroller>
  );
};

export default BannerItem;
