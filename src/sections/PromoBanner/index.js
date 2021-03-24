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
import useAppHeight from "../../hooks/useAppHeight";
const IconTriangleLineTop = loadable(() => import("../../components/icons/iconTriangleLineTop"));
const IconTriangleLineDown = loadable(() => import("../../components/icons/iconTriangleLineDown"));
const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "promoBanner",
  title: "Promo Banner",
  components: {
    promoBanner: {
      type: "group",
      title: "Promo Banner",
      name: "promoBanner",
      defaultConfig: {
        title: {
          type: "text",
          title: "Promo Name",
          value: { vi: "Ăn gogi Trúng 1 tỷ", en: "Ăn gogi Trúng 1 tỷ" },
          name: "PromoName",
        },
        promoCode: { type: "textIgnoreLocale", title: "Promo Code", value: "" },
        imageDesktop: { type: "image", title: "Banner Desktop", value: null },
        imageMobile: { type: "image", title: "Banner Mobile", value: null },
        statusPromo: { type: "radio", title: "Status", value: { active: "Show", titles: ["Show", "Hidden"] } },
        typePromo: { type: "radio", title: "Type", value: { active: "Normal", titles: ["Normal", "Flash"] } },
        link: {
          type: "link",
          name: "link",
          title: "Link",
          value: {
            label: { vi: "Xem ưu đãi", en: "Xem ưu đãi" },
            url: "/",
          },
        },
      },
      value: [],
    },
  },
};

const PromoBanner = ({ config = defaultConfig, listPromoActive }) => {
  const locale = useSelector((s) => s.get("locale"));
  const { value: valuePromo } = config.components.promoBanner;
  const [currentPage, setCurrentPage] = useState(0);
  const promoShouldShow = listPromoActive ?? valuePromo.filter((item) => item.statusPromo.value.active === "Show");
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const [{ width }, ref] = useIframeResize();
  const appHeight = useAppHeight();
  const Images = useMemo(() => {
    return promoShouldShow?.map((item, index) => (
      <WrapperSection key={index}>
        <ImageMedia
          preload={true}
          width="100%"
          height="100%"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          media={width > 768 ? item.imageDesktop.value : item.imageMobile.value}
        />

        <GroupButton>
          <LinkRouter href={`${item.link?.value?.url ?? "/promo "}`} passHref>
            <a className="link-banner">
              <Button className="button-banner">
                <span>{item.link?.value?.label[locale] ?? "Xem ưu đãi"}</span>
              </Button>
            </a>
          </LinkRouter>
        </GroupButton>
      </WrapperSection>
    ));
  }, [promoShouldShow, width]);
  return (
    <WrapperOnePageScroller ref={ref}>
      <ReactPageScroller
        customPageNumber={currentPage}
        containerHeight={appHeight - headerHeight}
        pageOnChange={setCurrentPage}
        totalElement={promoShouldShow.length}
      >
        {Images}
      </ReactPageScroller>
      <WrapperListPoint>
        <IconTriangleLineTop className="top" color="#ffffff" />
        <PointNavigation display="block" currentIndex={currentPage} size={promoShouldShow.length} />
        <IconTriangleLineDown className="bottom" color="#ffffff" />
      </WrapperListPoint>
    </WrapperOnePageScroller>
  );
};

PromoBanner.defaultConfig = defaultConfig;

export default PromoBanner;
