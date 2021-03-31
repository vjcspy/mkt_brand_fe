import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPageScroller from "../../../plugins/react-page-scroller";
import loadable from "@loadable/component";
import { Container } from "../../styles";
import {
  WrapperContentPromo,
  RightPromo,
  LeftPromo,
  WrapperEndpoint,
  Promo,
  WrapperPromo,
  ContentScroller,
} from "./style";
import SuccessRegister from "../../components/success-register";
import ListRestaurant from "../../components/list-restaurant";
import PromoInfo from "./PromoInfo";
import IconTriangleLineTop from "../../components/icons/iconTriangleLineTop";
import PointNavigation from "../../components/point-navigation";
import RatioImage from "../../components/ratioImage";
import IconTriangleLineDown from "../../components/icons/iconTriangleLineDown";
import Head from "next/head";
import OnePageScroll from "../../components/one-page-scroll/one-page-scroll";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";

const Popup = loadable(() => import("../../components/popup-wrapper"));
const ListCondition = loadable(() => import("./Conditions"));

const PromoDesktop = ({ promoListApi, onGetCode, resultGetCode, setResultGetCode, indexPromoParam }) => {
  const [currentPage, setCurrentPage] = useState(indexPromoParam > 0 ? indexPromoParam : 0);
  const [listRestaurant, setListRestaurant] = useState();
  const [condition, setCondition] = useState();
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const [{ height }, ref] = useIframeResize();
  const size = promoListApi?.length;
  const { data: promoUser } = useSelector((state) => state.get("promoOfUser")) ?? {};
  const PromoList = useMemo(
    () =>
      promoListApi?.map((item, index) => (
        <React.Fragment key={index}>
          <Head>
            <link rel="preload" as="image" href={item.thumbnail} />
          </Head>
          <Container key={index} style={{ height: "100%" }}>
            <WrapperPromo>
              <Promo className="Promo">
                <LeftPromo className="LeftPromo">
                  <RatioImage ratio="1:1">
                    <img width={500} height={500} src={item.thumbnail} alt={item.thumbnail} />
                  </RatioImage>
                </LeftPromo>
                <RightPromo className="RightPromo">
                  <PromoInfo
                    promo={item}
                    hadGetCode={promoUser ? promoUser.find((promo) => promo.promotionId === item.id) : false}
                    onGetCode={() => {
                      onGetCode(item.id, item.clmIsCashVoucher);
                    }}
                    getRestaurant={() => setListRestaurant({ restaurants: item.restaurants, promoId: item.id })}
                    getCondition={() => setCondition(item.condition)}
                  />
                </RightPromo>
              </Promo>
            </WrapperPromo>
          </Container>
        </React.Fragment>
      )),
    [promoListApi, promoUser]
  );

  return (
    <>
      <WrapperContentPromo
        ref={ref}
        className="Wrapper-promo-desktop"
        style={{ height: `calc(100vh - (${headerHeight}px ` }}
      >
        <ContentScroller className="content-scroller">
          <OnePageScroll
            renderAllPagesOnFirstRender={true}
            customPageNumber={+currentPage}
            // containerHeight={`calc(100vh - ${headerHeight + 104 ?? 0}px)`}
            containerHeight={height - headerHeight}
            pageOnChange={setCurrentPage}
          >
            {promoListApi?.map((item, index) => (
              <React.Fragment key={index}>
                <Head>
                  <link rel="preload" as="image" href={item.thumbnail} />
                </Head>
                <Container key={index} style={{ height: "100%" }}>
                  <WrapperPromo>
                    <Promo className="Promo">
                      <LeftPromo className="LeftPromo">
                        <RatioImage ratio="1:1">
                          <img width={500} height={500} src={item.thumbnail} alt={item.thumbnail} />
                        </RatioImage>
                      </LeftPromo>
                      <RightPromo className="RightPromo">
                        <PromoInfo
                          promo={item}
                          hadGetCode={promoUser ? promoUser.find((promo) => promo.promotionId === item.id) : false}
                          onGetCode={() => {
                            onGetCode(item.id, item.clmIsCashVoucher);
                          }}
                          getRestaurant={() => setListRestaurant({ restaurants: item.restaurants, promoId: item.id })}
                          getCondition={() => setCondition(item.condition)}
                        />
                      </RightPromo>
                    </Promo>
                  </WrapperPromo>
                </Container>
              </React.Fragment>
            ))}
          </OnePageScroll>
        </ContentScroller>

        <WrapperEndpoint>
          <IconTriangleLineTop className="top" />
          <PointNavigation
            className="point-pagination-promo"
            sizeAfter={7}
            display="block"
            size={size}
            currentIndex={currentPage}
            borderColor="#7B7979"
            backgroundActive="#7B7979"
          />
          <IconTriangleLineDown className="bottom " />
        </WrapperEndpoint>
      </WrapperContentPromo>

      <Popup show={resultGetCode} onClose={() => setResultGetCode(false)}>
        <SuccessRegister
          resultGetCode={resultGetCode}
          itemPromoGetCode={promoListApi?.find((item) => item.id === resultGetCode?.promotionId)}
        />
      </Popup>

      <Popup show={listRestaurant?.restaurants} onClose={() => setListRestaurant(null)}>
        <ListRestaurant promoId={listRestaurant?.promoId} listRestaurant={listRestaurant?.restaurants} />
      </Popup>

      <Popup show={condition} onClose={() => setCondition(null)}>
        <ListCondition condition={condition} />
      </Popup>
    </>
  );
};

export default PromoDesktop;
