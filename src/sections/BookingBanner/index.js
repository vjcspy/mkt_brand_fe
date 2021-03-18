import React, { useMemo, useState } from "react";
import Button from "../../components/button";
import { useSelector } from "react-redux";
import LinkRouter from "../../components/link-router";
import { WrapperOnePageScroller, GroupButton, WrapperListPoint, WrapperSection, ItemBanner } from "./style";
import loadable from "@loadable/component";

import ReactPageScroller from "../../../plugins/react-page-scroller";
import ImageMedia from "../../development/components/imageMedia";
import PointNavigation from "../../components/point-navigation";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
const IconTriangleLineTop = loadable(() => import("../../components/icons/iconTriangleLineTop"));
const IconTriangleLineDown = loadable(() => import("../../components/icons/iconTriangleLineDown"));
const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "bookingBanner",
  title: "Booking Banner",
  components: {
    bookingBanner: {
      type: "group",
      title: "Booking Banner",
      name: "bookingBanner",
      defaultConfig: {
        title: {
          type: "text",
          title: "Booking Title",
          value: { vi: "Booking 1", en: "Booking 1" },
          name: "BookingName",
        },
        imageDesktop: { type: "image", title: "Banner Desktop" },
        imageMobile: { type: "image", title: "Banner Mobile" },
        head: { type: "text", title: "Head", value: { vi: "Booking header", en: "Booking header" } },
        showHead: { type: "radio", title: "Show Head", value: { active: "Show", titles: ["Show", "Hidden"] } },
        content: { type: "text", title: "Content", value: { vi: "Booking content", en: "Booking content" } },
        showContent: { type: "radio", title: "Show Content", value: { active: "Show", titles: ["Show", "Hidden"] } },
        linkBooking: {
          type: "link",
          name: "link",
          title: "Link",
          value: {
            label: { vi: "Đặt bàn", en: "Booking" },
            url: "/",
          },
        },
      },
      value: [
        {
          title: {
            type: "text",
            title: "Booking Title",
            value: { vi: "Booking 1", en: "Booking 1" },
            name: "BookingName",
          },
          imageDesktop: { type: "image", title: "Banner Desktop" },
          imageMobile: { type: "image", title: "Banner Mobile" },
          head: { type: "text", title: "Head", value: { vi: "Booking header", en: "Booking header" } },
          showHead: { type: "radio", title: "Show Head", value: { active: "Show", titles: ["Show", "Hidden"] } },
          content: { type: "text", title: "Content", value: { vi: "Booking content", en: "Booking content" } },
          showContent: { type: "radio", title: "Show Content", value: { active: "Show", titles: ["Show", "Hidden"] } },
          linkBooking: {
            type: "link",
            name: "link",
            title: "Link",
            value: {
              label: { vi: "Đặt bàn", en: "Booking" },
              url: "/",
            },
          },
        },
      ],
    },
  },
};

const BookingBanner = ({ config = defaultConfig }) => {
  const locale = useSelector((s) => s.get("locale"));
  const listBooking = useSelector((s) => s.get("listBooking"));
  const valueBooking = listBooking ?? config.components.bookingBanner.value ?? [];
  const [currentPage, setCurrentPage] = useState(0);
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const [{ width }, ref] = useIframeResize();
  const Images = useMemo(() => {
    return valueBooking?.map((item, index) => {
      const { imageDesktop, imageMobile, linkBooking, head, showHead, showContent, content } = item;
      return (
        <WrapperSection key={index}>
          <ImageMedia
            preload={true}
            width="100%"
            height="100%"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            media={width > 768 ? imageDesktop.value : imageMobile.value}
          />

          <GroupButton>
            {showHead.value.active === "Show" && <h1>{head.value[locale]}</h1>}
            {showContent.value.active === "Show" && <h3>{content.value[locale]}</h3>}
            <LinkRouter href={`${linkBooking.value?.url}`} passHref>
              <a className="link-banner">
                <Button className="button-banner">
                  {/* <FormattedMessage id="banner.view_promo" /> */}
                  <span>{linkBooking.value?.label[locale]}</span>
                </Button>
              </a>
            </LinkRouter>
          </GroupButton>
        </WrapperSection>
      );
    });
  }, [valueBooking, width]);

  return (
    <WrapperOnePageScroller>
      {valueBooking.length > 1 ? (
        <>
          <ReactPageScroller
            customPageNumber={currentPage}
            containerHeight={`calc(100vh - ${width > 768 ? headerHeight : headerHeight * 2 ?? 0}px)`}
            pageOnChange={setCurrentPage}
            totalElement={valueBooking.length}
          >
            {Images}
          </ReactPageScroller>
          <WrapperListPoint>
            <IconTriangleLineTop className="top" color="#ffffff" />
            <PointNavigation display="block" currentIndex={currentPage} size={valueBooking.length} />
            <IconTriangleLineDown className="bottom" color="#ffffff" />
          </WrapperListPoint>
        </>
      ) : (
        <ItemBanner>{Images}</ItemBanner>
      )}
    </WrapperOnePageScroller>
  );
};

BookingBanner.defaultConfig = defaultConfig;

export default BookingBanner;
