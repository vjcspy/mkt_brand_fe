import React, { useMemo, useState } from "react";
import Button from "../../components/button";
import { useSelector } from "react-redux";
import { WrapperOnePageScroller, GroupButton, WrapperListPoint, WrapperSection } from "./style";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import loadable from "@loadable/component";
const ReactPageScroller = loadable(() => import("../../../plugins/react-page-scroller"));
const ImageMedia = loadable(() => import("../../development/components/imageMedia"));
const PointNavigation = loadable(() => import("../../components/point-navigation"));
const IconTriangleLineTop = loadable(() => import("../../components/icons/iconTriangleLineTop"));
const IconTriangleLineDown = loadable(() => import("../../components/icons/iconTriangleLineDown"));
const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "Booking",
  title: "Booking",
  components: {
    images: {
      type: "image",
      multiple: true,
      name: "images",
      value: [],
    },
  },
};

const Booking = ({ config = defaultConfig }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const components = config.components;
  const length = components.images?.value.length ?? 0;
  const headerHeight = useSelector((s) => s.get("headerHeight"));

  const Images = useMemo(() => {
    return components.images?.value.map((image, index) => (
      <WrapperSection key={index}>
        <ImageMedia preload={true} style={{ width: "100%", height: "100%", objectFit: "cover" }} media={image} />
        <GroupButton>
          <Link href="/map">
            <a>
              <Button className="button-banner">
                <FormattedMessage id="header.reservation" />
              </Button>
            </a>
          </Link>
        </GroupButton>
      </WrapperSection>
    ));
  }, [components.images]);

  return (
    <WrapperOnePageScroller>
      <ReactPageScroller
        customPageNumber={currentPage}
        containerHeight={`calc(100vh - ${headerHeight ?? 0}px)`}
        pageOnChange={setCurrentPage}
      >
        {Images}
      </ReactPageScroller>
      <WrapperListPoint>
        <IconTriangleLineTop className="top" color="#ffffff" />
        <PointNavigation display="block" currentIndex={currentPage} size={length} />
        <IconTriangleLineDown className="bottom" color="#ffffff" />
      </WrapperListPoint>
      {/* <GroupButton>
        {currentPage < components.images?.value.length - 1 ? (
          <IconViewMore onClick={() => setCurrentPage(currentPage + 1)} className="view-more" />
        ) : (
          <IconViewMore onClick={onScrollBottom} className="view-more" />
        )}
      </GroupButton> */}
    </WrapperOnePageScroller>
  );
};

Booking.defaultConfig = defaultConfig;

export default Booking;
