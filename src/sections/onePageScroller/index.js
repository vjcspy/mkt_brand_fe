import React, { useMemo, useState } from "react";
import Button from "../../components/button";
import { useSelector } from "react-redux";
import LinkRouter from "../../components/link-router";
import { WrapperOnePageScroller, GroupButton, WrapperListPoint, WrapperSection } from "./style";
import { FormattedMessage } from "react-intl";
import loadable from "@loadable/component";

import ReactPageScroller from "../../../plugins/react-page-scroller";
import ImageMedia from "../../development/components/imageMedia";
import PointNavigation from "../../components/point-navigation";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import Head from "next/head";
const IconTriangleLineTop = loadable(() => import("../../components/icons/iconTriangleLineTop"));
const IconTriangleLineDown = loadable(() => import("../../components/icons/iconTriangleLineDown"));
const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "onePageScroller",
  title: "One Page Scroller",
  components: {
    images: {
      type: "image",
      multiple: true,
      name: "images",
      value: [],
    },
  },
};

const imageMobile = [
  "https://ggg-api.s3.ap-southeast-1.amazonaws.com/mobile_promo_2_de06fe170c.jpg",
  "https://ggg-api.s3.ap-southeast-1.amazonaws.com/mobile_promo_111bfaa78f.jpg",
  "https://ggg-api.s3.ap-southeast-1.amazonaws.com/mobile_promo_3_22c7f0a524.jpg",
];

const OnePageScroller = ({ config = defaultConfig }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const components = config.components;
  const length = components.images?.value.length ?? 0;
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const [{ width }, ref] = useIframeResize();
  console.log(width);
  const Images = useMemo(() => {
    return components.images?.value.map((image, index) => (
      <WrapperSection key={index}>
        {width >= 768 ? (
          <ImageMedia
            preload={true}
            width="100%"
            height="100%"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            media={image}
          />
        ) : (
          <>
            <Head>
              <link rel="preload" as="image" href={imageMobile[index]} />
            </Head>
            <img className="image-mobile" src={imageMobile[index]} />
          </>
        )}
        <GroupButton>
          <LinkRouter href={`/promo?id=${index}`} passHref>
            <a className="link-banner">
              <Button className="button-banner">
                <FormattedMessage id="banner.view_promo" />
              </Button>
            </a>
          </LinkRouter>
        </GroupButton>
      </WrapperSection>
    ));
  }, [components.images, width]);

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

OnePageScroller.defaultConfig = defaultConfig;

export default OnePageScroller;
