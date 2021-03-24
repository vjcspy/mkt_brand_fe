import React, { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import ReactPageScroller from "../../../plugins/react-page-scroller";
import loadable from "@loadable/component";

import { WrapperContentPromo, WrapperEndpoint, WrapperPopupContent, WrapperDragMobile, WrapperScroller } from "./style";
import { WrapperContentPopup } from "../../components/popup-wrapper-mobile/style";

import PromoInfo from "./PromoInfo";
import Head from "next/head";
import useAppHeight from "../../hooks/useAppHeight";
const ListRestaurant = loadable(() => import("../../components/list-restaurant"));
const ListRestaurantBooking = loadable(() => import("../../components/list-restaurant/list-restaurant-booking"));
const CSSTransition = loadable(() => import("../../components/css-transition"));
const PointNavigation = loadable(() => import("../../components/point-navigation"));
const RatioImage = loadable(() => import("../../components/ratioImage"));
const PhoneOTP = loadable(() => import("../../components/phone-opt"));
const DragMobile = loadable(() => import("../../components/touch-mobile"));
const PopupMobile = loadable(() => import("../../components/popup-wrapper-mobile"));
const PopupBottomToMobile = loadable(() => import("../../components/popup-bottom-top-mobile"));
const ViewMapRestaurant = loadable(() => import("../../components/view-map-restaurant"));
const SuccessRegisterMobile = loadable(() => import("../../components/succes-register-mobile"));
const ListCondition = loadable(() => import("./Conditions"));

const PromoMobile = ({ promoListApi, onViewMyPromo, onGetCode, viewMapRestaurant, stateAction, setStateAction }) => {
  const { promoCode, showPopUpSuccess } = stateAction;
  const [currentPage, setCurrentPage] = useState(promoCode ? promoCode : 0);
  const [viewRestaurant, setViewRestaurant] = useState();
  const [condition, setCondition] = useState();
  const [showConditionOrRestaurant, setShowConditionOrRestaurant] = useState(); // true: restaurant, false:condition
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const [stepFlowPopupMobile, setStepFlowPopupMobile] = useState(0);
  const appHeight = useAppHeight();

  const [restaurantViewMap, setRestaurantViewMap] = useState();
  const size = promoListApi.length;

  // update step flow popup on mobile, = 1 => show success register mobile
  const onGetValueOTP = (result) => {
    setStepFlowPopupMobile(1);
  };

  // update step flow popup on mobile = 2  => show list restaurant have booking on mobile
  const onShowListRestaurant = () => {
    setStepFlowPopupMobile(stepFlowPopupMobile + 1);
    setShowConditionOrRestaurant(true);
  };

  // update step flow popup on mobile = 2 => show list condition of promo success register
  const onShowConditionRegister = () => {
    setStepFlowPopupMobile(stepFlowPopupMobile + 1);
    setShowConditionOrRestaurant(false);
  };

  // update step flow popup on mobile = 3 => show map of restaurant have promo
  const viewMapPromo = () => {
    setStepFlowPopupMobile(stepFlowPopupMobile + 1);
  };

  const onReservation = () => {};

  const onBook = (value) => {};

  const onViewMapMobile = (restaurant) => {
    setStepFlowPopupMobile(1);
    setRestaurantViewMap(restaurant);
  };

  const onBackPopup = () => {
    if (stepFlowPopupMobile === 0) {
      setStateAction({ ...stateAction, showPopUpSuccess: false });
      setStepFlowPopupMobile(0);
      setCondition(false);
      setViewRestaurant(false);
    } else {
      setStepFlowPopupMobile(stepFlowPopupMobile - 1);
    }
  };

  const promoMobile = useMemo(() => {
    return (
      <ReactPageScroller
        className="scroller"
        customPageNumber={+currentPage}
        containerHeight={appHeight - headerHeight - 300 + 50}
        pageOnChange={setCurrentPage}
      >
        {promoListApi.map((item, index) => (
          <React.Fragment key={index}>
            <Head>
              <link rel="preload" as="image" href={item?.thumbnail} />
            </Head>
            <RatioImage ratio="1:1">
              <img width={500} height={500} src={item?.thumbnail} alt={item?.title} />
            </RatioImage>
          </React.Fragment>
        ))}
      </ReactPageScroller>
    );
  }, [promoListApi, headerHeight, appHeight]);

  return (
    <>
      <WrapperContentPromo className="promo-mobile" style={{ height: appHeight - headerHeight }}>
        <WrapperScroller className="wrapper-scroller">
          {promoMobile}
          <WrapperEndpoint>
            <PointNavigation display="block" size={size} currentIndex={currentPage} />
          </WrapperEndpoint>
        </WrapperScroller>

        <DragMobile>
          <WrapperDragMobile>
            <PromoInfo
              promo={promoListApi[currentPage]}
              hadGetCode={false}
              onGetCode={() => onGetCode(promoListApi[currentPage]?.id, promoListApi[currentPage]?.clmIsCashVoucher)}
              onViewMyPromo={() => onViewMyPromo(promoListApi[currentPage]?.id)}
              getRestaurant={() => setViewRestaurant(promoListApi[currentPage]?.restaurants)}
              getCondition={() => setCondition(promoListApi[currentPage]?.condition)}
            />
          </WrapperDragMobile>
        </DragMobile>

        <PopupMobile show={showPopUpSuccess} step={stepFlowPopupMobile} onBack={onBackPopup}>
          <WrapperContentPopup>
            <SuccessRegisterMobile
              onReservation={onReservation}
              onShowListRestaurant={onShowListRestaurant}
              onShowCondition={onShowConditionRegister}
            />
          </WrapperContentPopup>

          {showConditionOrRestaurant ? (
            <WrapperContentPopup style={{ height: "100%" }}>
              <ListRestaurantBooking
                onBook={onBook}
                viewRestaurant={promoListApi[2]?.viewRestaurant}
                onViewMap={viewMapPromo}
              />
            </WrapperContentPopup>
          ) : (
            <WrapperContentPopup style={{ height: "100%" }}>
              <ListCondition condition={promoListApi[currentPage]?.conditions} />
            </WrapperContentPopup>
          )}
          <WrapperContentPopup style={{ height: "100%" }}>
            <ViewMapRestaurant />
          </WrapperContentPopup>
        </PopupMobile>

        <PopupMobile show={viewRestaurant} step={stepFlowPopupMobile} onBack={onBackPopup}>
          <WrapperContentPopup style={{ height: "100%" }}>
            <ListRestaurant listRestaurant={viewRestaurant} onViewMap={onViewMapMobile} />
          </WrapperContentPopup>
          <WrapperContentPopup style={{ height: "100%" }}>
            <ViewMapRestaurant restaurant={restaurantViewMap} />
          </WrapperContentPopup>
        </PopupMobile>

        <PopupMobile show={condition} step={stepFlowPopupMobile} onBack={onBackPopup}>
          <WrapperContentPopup style={{ height: "100%" }}>
            <ListCondition listCondition={condition} />
          </WrapperContentPopup>
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
