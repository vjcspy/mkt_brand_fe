import React, { useState } from "react";
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

const PromoMobile = ({ listPromo, onViewMyPromo, onGetCode, viewMapRestaurant, stateAction, setStateAction }) => {
  const { promoCode, showPopUpSuccess } = stateAction;
  const [currentPage, setCurrentPage] = useState(promoCode ? promoCode : 0);
  const [listRestaurant, setListRestaurant] = useState();
  const [listCondition, setListCondition] = useState();
  const [mapRestaurant, setMapRestaurant] = useState();
  const [showLogin, setShowLogin] = useState(false);
  const [showConditionOrRestaurant, setShowConditionOrRestaurant] = useState(); // true: restaurant, false:condition
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const [stepFlowPopupMobile, setStepFlowPopupMobile] = useState(0);
  const [showPopupRegisterMobile, setShowPopupRegisterMobile] = useState(false);
  const appHeight = useAppHeight();

  const size = listPromo.length;

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

  const onBackPopup = () => {
    if (stepFlowPopupMobile === 0) {
      setStateAction({ ...stateAction, showPopUpSuccess: false });
      setStepFlowPopupMobile(0);
      setShowLogin(false);
    } else {
      setStepFlowPopupMobile(stepFlowPopupMobile - 1);
    }
  };

  return (
    <>
      <WrapperContentPromo className="promo-mobile" style={{ height: appHeight - headerHeight }}>
        <WrapperScroller className="wrapper-scroller">
          <ReactPageScroller
            className="scroller"
            customPageNumber={+currentPage}
            containerHeight={appHeight - headerHeight - 300 + 50}
            pageOnChange={setCurrentPage}
          >
            {listPromo.map((item, index) => (
              <React.Fragment key={index}>
                <Head>
                  <link rel="preload" as="image" href={item?.image} />
                </Head>
                <RatioImage ratio="1:1">
                  <img width={500} height={500} src={item?.image} alt={item?.title} />
                </RatioImage>
              </React.Fragment>
            ))}
          </ReactPageScroller>
          <WrapperEndpoint>
            <PointNavigation display="block" size={size} currentIndex={currentPage} />
          </WrapperEndpoint>
        </WrapperScroller>

        <DragMobile>
          <WrapperDragMobile>
            <PromoInfo
              promo={listPromo[currentPage]}
              hadGetCode={false}
              onGetCode={() => onGetCode(listPromo[currentPage]?.id)}
              onViewMyPromo={() => onViewMyPromo(listPromo[currentPage]?.id)}
              getRestaurant={() => setListRestaurant(listPromo[currentPage]?.listRestaurant)}
              getCondition={() => setListCondition(listPromo[currentPage]?.conditions)}
            />
          </WrapperDragMobile>
        </DragMobile>

        <CSSTransition show={showPopUpSuccess} classTransition="bottom-top">
          <PopupMobile step={stepFlowPopupMobile} onBack={onBackPopup}>
            {showLogin && (
              <WrapperContentPopup>
                <PhoneOTP onResult={onGetValueOTP} />
              </WrapperContentPopup>
            )}

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
                  listRestaurant={listPromo[2]?.listRestaurant}
                  onViewMap={viewMapPromo}
                />
              </WrapperContentPopup>
            ) : (
              <WrapperContentPopup style={{ height: "100%" }}>
                <ListCondition listCondition={listPromo[currentPage]?.conditions} />
              </WrapperContentPopup>
            )}
            <WrapperContentPopup style={{ height: "100%" }}>
              <ViewMapRestaurant />
            </WrapperContentPopup>
          </PopupMobile>
        </CSSTransition>

        {listRestaurant && (
          <PopupBottomToMobile show={listRestaurant} onClose={() => setListRestaurant(null)}>
            <ListRestaurant listRestaurant={listRestaurant} onViewMap={viewMapRestaurant} />
          </PopupBottomToMobile>
        )}

        {listCondition && (
          <PopupBottomToMobile show={listCondition} onClose={() => setListCondition(null)}>
            <WrapperPopupContent>
              <ListCondition listCondition={listCondition} />
            </WrapperPopupContent>
          </PopupBottomToMobile>
        )}

        {mapRestaurant && (
          <PopupBottomToMobile show={mapRestaurant} onClose={() => setMapRestaurant(false)}>
            <ViewMapRestaurant />
          </PopupBottomToMobile>
        )}
      </WrapperContentPromo>
    </>
  );
};

export default PromoMobile;
