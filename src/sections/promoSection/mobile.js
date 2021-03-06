import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import loadable from "@loadable/component";

import { WrapperContentPromo, WrapperEndpoint, WrapperDragMobile, WrapperScroller } from "./style";
import { WrapperContentPopup } from "../../components/popup-wrapper-mobile/style";

import PromoInfo from "./PromoInfo";
import Head from "next/head";
import OnePageScroll from "../../components/one-page-scroll/one-page-scroll";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
const ListRestaurant = loadable(() => import("../../components/list-restaurant"));
const ListRestaurantBooking = loadable(() => import("../../components/list-restaurant/list-restaurant-booking"));
const PointNavigation = loadable(() => import("../../components/point-navigation"));
const RatioImage = loadable(() => import("../../components/ratioImage"));
const DragMobile = loadable(() => import("../../components/touch-mobile"));
const PopupMobile = loadable(() => import("../../components/popup-wrapper-mobile"));
const ViewMapRestaurant = loadable(() => import("../../components/view-map-restaurant"));
const SuccessRegisterMobile = loadable(() => import("../../components/succes-register-mobile"));
const ListCondition = loadable(() => import("./Conditions"));

const PromoMobile = ({ promoListApi, setResultGetCode, onGetCode, resultGetCode, indexPromoParam }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [viewRestaurant, setViewRestaurant] = useState();
  const [condition, setCondition] = useState();
  const [showConditionOrRestaurant, setShowConditionOrRestaurant] = useState(); // true: restaurant, false:condition
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const [stepFlowPopupMobile, setStepFlowPopupMobile] = useState(0);
  const [{ height }, ref] = useIframeResize();

  const { data: promoUser } = useSelector((state) => state.get("promoOfUser")) ?? {};
  const [restaurantViewMap, setRestaurantViewMap] = useState();
  const size = promoListApi?.length ?? 0;

  const onShowListRestaurant = () => {
    setStepFlowPopupMobile(stepFlowPopupMobile + 1);
    setShowConditionOrRestaurant(true);
  };

  const onShowConditionRegister = () => {
    setStepFlowPopupMobile(stepFlowPopupMobile + 1);
    setShowConditionOrRestaurant(false);
  };

  const viewMapPromo = (restaurant) => {
    setRestaurantViewMap(restaurant);
    setStepFlowPopupMobile(stepFlowPopupMobile + 1);
  };

  const onViewMapMobile = (restaurant) => {
    setStepFlowPopupMobile(1);
    setRestaurantViewMap(restaurant);
  };

  const onBackPopup = () => {
    if (stepFlowPopupMobile === 0) {
      setResultGetCode(false);
      setStepFlowPopupMobile(0);
      setCondition(false);
      setViewRestaurant(false);
    } else {
      setStepFlowPopupMobile(stepFlowPopupMobile - 1);
    }
  };

  const promoMobile = useMemo(() => {
    return (
      <OnePageScroll
        className="scroller"
        customPageNumber={indexPromoParam ?? currentPage}
        containerHeight={height - headerHeight - 230 + 30}
        pageOnChange={setCurrentPage}
      >
        {promoListApi?.map((item, index) => (
          <React.Fragment key={index}>
            <Head>
              <link rel="preload" as="image" href={item?.thumbnail} />
            </Head>
            <RatioImage ratio="1:1">
              <img width={500} height={500} src={item?.thumbnail} alt={item?.title} />
            </RatioImage>
          </React.Fragment>
        ))}
      </OnePageScroll>
    );
  }, [promoListApi, headerHeight, height, indexPromoParam]);
  return (
    <>
      <WrapperContentPromo className="promo-mobile" style={{ height: height - headerHeight }} ref={ref}>
        <WrapperScroller className="wrapper-scroller">
          {promoMobile}
          <WrapperEndpoint>
            <PointNavigation display="block" size={size} currentIndex={currentPage} />
          </WrapperEndpoint>
        </WrapperScroller>

        {promoListApi && (
          <DragMobile>
            <WrapperDragMobile>
              <PromoInfo
                promo={promoListApi[currentPage]}
                hadGetCode={
                  promoUser ? promoUser.find((item) => item?.promotionId === promoListApi[currentPage]?.id) : false
                }
                onGetCode={() => onGetCode(promoListApi[currentPage]?.id)}
                getRestaurant={() => setViewRestaurant(promoListApi[currentPage]?.restaurants)}
                getCondition={() => setCondition(promoListApi[currentPage]?.condition)}
              />
            </WrapperDragMobile>
          </DragMobile>
        )}

        <PopupMobile show={resultGetCode} step={stepFlowPopupMobile} onBack={onBackPopup}>
          <WrapperContentPopup style={{ height: "100%" }}>
            <SuccessRegisterMobile
              itemPromoGetCode={promoListApi?.find((item) => item.id === resultGetCode?.promotionId)}
              resultGetCode={resultGetCode}
              onShowListRestaurant={onShowListRestaurant}
              onShowCondition={onShowConditionRegister}
            />
          </WrapperContentPopup>
          <WrapperContentPopup style={{ height: "100%" }}>
            {stepFlowPopupMobile === 1 && (
              <>
                {showConditionOrRestaurant ? (
                  <ListRestaurantBooking
                    listRestaurant={promoListApi?.[currentPage]?.restaurants}
                    onViewMap={viewMapPromo}
                  />
                ) : (
                  <ListCondition condition={promoListApi?.[currentPage]?.condition} />
                )}
              </>
            )}
          </WrapperContentPopup>
          <WrapperContentPopup style={{ height: "100%" }}>
            <ViewMapRestaurant restaurant={restaurantViewMap} />
          </WrapperContentPopup>
        </PopupMobile>

        <PopupMobile show={viewRestaurant} step={stepFlowPopupMobile} onBack={onBackPopup}>
          <WrapperContentPopup style={{ height: "100%" }}>
            {viewRestaurant && <ListRestaurant listRestaurant={viewRestaurant} onViewMap={onViewMapMobile} />}
          </WrapperContentPopup>
          <WrapperContentPopup style={{ height: "100%" }}>
            <ViewMapRestaurant restaurant={restaurantViewMap} />
          </WrapperContentPopup>
        </PopupMobile>

        <PopupMobile show={condition} step={stepFlowPopupMobile} onBack={onBackPopup}>
          {condition && (
            <WrapperContentPopup style={{ height: "100%" }}>
              <ListCondition listCondition={condition} />
            </WrapperContentPopup>
          )}
        </PopupMobile>

        {/* {viewRestaurant?.restaurants && (
          <PopupBottomToMobile show={viewRestaurant} onClose={() => setViewRestaurant(null)}>
            <ListRestaurant
              listRestaurant={viewRestaurant?.restaurants}
              promoId={viewRestaurant?.promotionId}
              onViewMap={viewMapRestaurant}
            />
          </PopupBottomToMobile>
        )}

        {condition && (
          <PopupBottomToMobile show={condition} onClose={() => setCondition(null)}>
            <WrapperPopupContent>
              <ListCondition listCondition={condition} />
            </WrapperPopupContent>
          </PopupBottomToMobile>
        )}

        {mapRestaurant && (
          <PopupBottomToMobile show={mapRestaurant} onClose={() => setMapRestaurant(false)}>
            <ViewMapRestaurant />
          </PopupBottomToMobile>
        )} */}
      </WrapperContentPromo>
    </>
  );
};

export default PromoMobile;
