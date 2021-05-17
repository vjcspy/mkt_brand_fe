import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LinkRouter from "../../components/link-router";
import { WrapperOnePageScroller, GroupButton, WrapperListPoint, WrapperSection } from "./style";
import loadable from "@loadable/component";

import ImageMedia from "../../development/components/imageMedia";
import PointNavigation from "../../components/point-navigation";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import OnePageScrollHome from "../../components/one-page-scroll/one-page-scroll-home";
import useSiteRouter from "../../hooks/useSiteRouter";
import { stringifyUrl } from "query-string";
import useRefCallback from "../../hooks/useRefCallback";
import DynamicFooter from "../dynamic-footer";

const IconTriangleLineTop = loadable(() => import("../../components/icons/iconTriangleLineTop"));
const IconTriangleLineDown = loadable(() => import("../../components/icons/iconTriangleLineDown"));

const Link = ({ url, item, ...props }) => {
  const href = useMemo(() => {
    const query = {};
    if (item.promoCode.value) {
      query.promoCode = item.promoCode.value;
    }
    if (item.restaurantCode.value) {
      query.idRestaurant = item.restaurantCode.value;
    }
    if (item.menuCode.value) {
      query.menuCode = item.menuCode.value;
    }
    return stringifyUrl({ url, query });
  }, [url, item]);
  return <LinkRouter {...props} href={href} />;
};

const BannerItem = ({ config, tabCode, onChangeBanner, scrollToFooter, footer, footerRef, mainHeight }) => {
  const locale = useSelector((s) => s.get("locale"));
  const tabShouldShow = config.value.filter((item) => item.statusTab.value.active === "Show");
  const size = tabShouldShow?.length + 1 ?? 1;
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const [{ width, height }, ref] = useIframeResize();
  const router = useSiteRouter();
  const bannerItem = router.query.bannerItem;

  const initPage = (() => {
    if (bannerItem?.includes(tabCode)) {
      return (bannerItem?.replace(tabCode + "-", "") ?? 1) - 1;
    }
    return 0;
  })();
  const [currentPage, setCurrentPage] = useState(initPage);

  useEffect(() => {
    if (bannerItem?.includes(tabCode)) {
      let bannerIndex = bannerItem.replace(`${tabCode}-`, "") - 1;
      if (bannerIndex > -1 && tabShouldShow.length >= bannerIndex && bannerIndex != currentPage) {
        setCurrentPage(bannerIndex);
      }
    }
  }, [bannerItem]);

  const handlePageChange = useRefCallback((index) => {
    onChangeBanner(tabCode, index);
    if (index != currentPage) {
      router.pushQuery(
        stringifyUrl({ url: router.pathname, query: { bannerItem: `${tabCode}-${index + 1}` } }),
        undefined,
        {
          shallow: true,
        }
      );
    }
  }, []);

  const Images = useMemo(() => {
    let resutl = tabShouldShow.map((item, index) => (
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
          <Link url={item.link?.value.url} item={item} passHref>
            <a className="link-banner">{item.link?.value?.label[locale] ?? "Xem ưu đãi"}</a>
          </Link>
        </GroupButton>
      </WrapperSection>
    ));
    resutl.push(<DynamicFooter config={footer} ref={footerRef} mainHeight={mainHeight} />);
    return resutl;
  }, [tabShouldShow, width]);
  return (
    <WrapperOnePageScroller ref={ref}>
      <OnePageScrollHome
        customPageNumber={currentPage}
        containerHeight={height - headerHeight}
        pageOnChange={handlePageChange}
        scrollToFooter={scrollToFooter}
        child={true}
      >
        {Images}
      </OnePageScrollHome>
      <WrapperListPoint>
        <IconTriangleLineTop className="top" color="#ffffff" />
        <PointNavigation display="block" currentIndex={currentPage} size={size} />
        <IconTriangleLineDown className="bottom" color="#ffffff" />
      </WrapperListPoint>
    </WrapperOnePageScroller>
  );
};

export default BannerItem;
