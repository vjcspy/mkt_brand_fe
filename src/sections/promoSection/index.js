import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactPageScroller from "../../../plugins/react-page-scroller";
import Button from "../../components/button";
import { Container } from "../../styles";
import {
  WrapperContentPromo,
  RightPromo,
  LeftPromo,
  WrapperEndpoint,
  Promo,
  WrapperPopupContent,
  Restaurant,
  WrapperPromo,
  HiddenContent,
  WrapperScroll,
  MainPromo,
  WrapperDragMobile,
  WrapperScroller,
  ContentScroller,
} from "./style";
import IConPhone from "../../components/icons/iconPhone";
import CSSTransition from "../../components/css-transition";
import IConViewMap from "../../components/icons/iconViewMap";
import PointNavigation from "../../components/point-navigation";
import Popup from "../../components/popup-wrapper";
import IconPoint from "../../components/icons/IconPoint";
import RatioImage from "../../components/ratioImage";
import IconTriangleLineDown from "../../components/icons/iconTriangleLineDown";
import PhoneOTP from "../../components/phone-opt";
import SuccessRegister from "../../components/success-register";
import DragMobile from "../../components/touch-mobile";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import PopupMobile from "../../components/popup-wrapper-mobile";
import SuccessRegisterMobile from "../../components/succes-register-mobile";
import { ListRestaurant, ListRestaurantBooking } from "../../components/list-restaurant";
import ViewMapRestaurant from "../../components/view-map-restaurant";
import PromoInfo from "./PromoInfo";
import PopupBottomToMobile from "../../components/popup-bottom-top-mobile";
import { dummyPromoList } from "../../dummyData/listPromo";
import ListCondition from "./Conditions";
const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "promoSection",
  title: "Promo Section",
  components: {},
};

const PromoSection = ({ config = defaultConfig }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const [listRestaurant, setListResaurant] = useState();
  const [listCondition, setListCondition] = useState();
  const [mapRestaurant, setMapRestaurant] = useState();

  const [isBottom, setIsBottom] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showSucces, setShowSuccess] = useState(false);
  const [showConditionOrRestaurant, setShowConditionOrRestaurant] = useState(); // true: restaurant, false:condition
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const [sizeWidth, ref] = useIframeResize();

  const [stepFlowPopupMobile, setStepFlowPopupMobile] = useState(0);
  const [showPopupRegisterMobile, setShowPopupRegisterMobile] = useState(false);

  const refScroll = useRef();

  const size = dummyPromoList.length;

  const onScroll = () => {
    const scrollHeight = refScroll.current.scrollHeight;
    const scroolTop = refScroll.current.scrollTop;
    const clientHeight = refScroll.current.clientHeight;
    if (scroolTop === scrollHeight - clientHeight) {
      setIsBottom(false);
    } else {
      setIsBottom(true);
    }
  };

  const onMoveBottom = () => {
    refScroll.current.scrollTo({
      top: 1000,
      left: 100,
      behavior: "smooth",
    });
  };

  // update step flow popup on mobile = 1 => show success register mobile
  const onGetValueOTP = (result) => {
    if (result) {
      setShowSuccess(true);
    } else {
      setShowSuccess(true);
    }
    if (sizeWidth.width > 768) {
      setShowLogin(false);
    } else {
      setStepFlowPopupMobile(1);
    }
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

  const viewMapRestaurant = (value) => {
    setMapRestaurant(value);
  };

  const onCall = (value) => {};

  const onBackPopup = () => {
    if (stepFlowPopupMobile === 0) {
      setShowPopupRegisterMobile(false);
      setStepFlowPopupMobile(0);
    } else {
      setStepFlowPopupMobile(stepFlowPopupMobile - 1);
    }
  };

  const onGetCode = () => {
    setShowPopupRegisterMobile(true);
    setShowLogin(true);
  };

  useEffect(() => {
    if (refScroll.current) {
      const scrollHeight = refScroll.current.scrollHeight;
      const clientHeight = refScroll.current.clientHeight;
      if (scrollHeight > clientHeight) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    }
  }, [listRestaurant]);

  return (
    <MainPromo ref={ref} className="main-promo">
      {sizeWidth.width > 768 ? (
        <>
          <WrapperContentPromo className="Wrapper-promo-desktop" style={{ height: `calc(100vh - (${headerHeight + 104 ?? 0}px ` }}>
            <ContentScroller className="content-scroller">
              <ReactPageScroller containerHeight={`calc(100vh - ${headerHeight + 104 ?? 0}px)`} pageOnChange={setCurrentPage}>
                {dummyPromoList.map((item, index) => (
                  <Container key={index} style={{ height: "100%" }}>
                    <WrapperPromo>
                      <Promo className="Promo">
                        <LeftPromo className="LeftPromo">
                          <RatioImage ratio="1:1">
                            <img src="https://gogi.com.vn/wp-content/uploads/sites/2/2021/01/GG-GVM.1.png" />
                          </RatioImage>
                        </LeftPromo>
                        <RightPromo className="RightPromo">
                          <PromoInfo
                            promo={item}
                            onGetCode={() => setShowLogin(true)}
                            getRestaurant={() => setListResaurant(item.listRestaurant)}
                            getCondition={() => setListCondition(item.conditions)}
                          />
                        </RightPromo>
                      </Promo>
                    </WrapperPromo>
                  </Container>
                ))}
              </ReactPageScroller>
            </ContentScroller>

            <WrapperEndpoint>
              <PointNavigation display="block" size={size} currentIndex={currentPage} borderColor="#717171" backgroundActive="#717171" />
            </WrapperEndpoint>

            <Popup show={showLogin} onClose={() => setShowLogin(false)}>
              <PhoneOTP onResult={onGetValueOTP} />
            </Popup>

            <Popup show={showSucces} onClose={() => setShowSuccess(false)}>
              <SuccessRegister />
            </Popup>
          </WrapperContentPromo>

          <Popup show={listRestaurant} onClose={() => setListResaurant(null)}>
            <WrapperPopupContent className="list-restaurant">
              <h3>Danh sách các nhà hàng áp dụng mã ưu đãi </h3>
              <WrapperScroll ref={refScroll} onScroll={onScroll}>
                {listRestaurant?.map((item, index) => (
                  <Restaurant key={index}>
                    <h5>
                      <IconPoint /> {item.name}
                    </h5>
                    <p>{item.address}</p>
                    <Button size="tiny" varian="outline">
                      <IConPhone />
                      {item.phone}
                    </Button>
                    <Button size="tiny" varian="outline">
                      <IConViewMap />
                      View map
                    </Button>
                  </Restaurant>
                ))}
              </WrapperScroll>
              <HiddenContent onClick={onMoveBottom} className={`${isBottom ? "show" : ""}`}>
                <IconTriangleLineDown />
              </HiddenContent>
            </WrapperPopupContent>
          </Popup>

          <Popup show={listCondition} onClose={() => setListCondition(null)}>
            <WrapperPopupContent>
              <ListCondition listCondition={listCondition} />
            </WrapperPopupContent>
          </Popup>
        </>
      ) : (
        <>
          <WrapperContentPromo className="promo-mobile" style={{ height: `calc(100vh - (${headerHeight ?? 0}px ` }}>
            <WrapperScroller className="wrapper-scroller">
              <ReactPageScroller
                className="scroller"
                containerHeight={`calc(100vh - (${headerHeight ?? 0}px + 270px))`}
                pageOnChange={setCurrentPage}
              >
                {dummyPromoList.map((item, index) => (
                  <RatioImage ratio="1:1">
                    <img src="https://gogi.com.vn/wp-content/uploads/sites/2/2021/01/GG-GVM.1.png" />
                  </RatioImage>
                ))}
              </ReactPageScroller>
              <WrapperEndpoint>
                <PointNavigation display="block" size={size} currentIndex={currentPage} />
              </WrapperEndpoint>
            </WrapperScroller>

            <DragMobile>
              <WrapperDragMobile>
                <PromoInfo
                  promo={dummyPromoList[currentPage]}
                  onGetCode={onGetCode}
                  getRestaurant={() => setListResaurant(dummyPromoList[currentPage].listRestaurant)}
                  getCondition={() => setListCondition(dummyPromoList[currentPage].conditions)}
                />
              </WrapperDragMobile>
            </DragMobile>

            <CSSTransition show={showPopupRegisterMobile} classTransition="bottom-top">
              <PopupMobile step={stepFlowPopupMobile} onBack={onBackPopup}>
                {showLogin && (
                  <div>
                    <PhoneOTP onResult={onGetValueOTP} />
                  </div>
                )}

                <div>
                  <SuccessRegisterMobile
                    onReservation={onReservation}
                    onShowListRestaurant={onShowListRestaurant}
                    onShowCondition={onShowConditionRegister}
                  />
                </div>
                {showConditionOrRestaurant ? (
                  <div style={{ height: "100%" }}>
                    <ListRestaurantBooking onBook={onBook} listRestaurant={dummyPromoList[2].listRestaurant} onViewMap={viewMapPromo} />
                  </div>
                ) : (
                  <div style={{ height: "100%" }}>
                    <ListCondition listCondition={dummyPromoList[currentPage].conditions} />
                  </div>
                )}
                <div style={{ height: "100%" }}>
                  <ViewMapRestaurant />
                </div>
              </PopupMobile>
            </CSSTransition>

            {/* {showPopupRegisterMobile && (
              <PopupMobile step={stepFlowPopupMobile} onBack={onBackPopup}>
                {showLogin && (
                  <div>
                    <PhoneOTP onResult={onGetValueOTP} />
                  </div>
                )}

                <div>
                  <SuccessRegisterMobile
                    onReservation={onReservation}
                    onShowListRestaurant={onShowListRestaurant}
                    onShowCondition={onShowConditionRegister}
                  />
                </div>
                {showConditionOrRestaurant ? (
                  <div style={{ height: "100%" }}>
                    <ListRestaurantBooking listRestaurant={dummyPromoList[2].listRestaurant} onViewMap={viewMapPromo} />
                  </div>
                ) : (
                  <div style={{ height: "100%" }}>
                    <ListCondition listCondition={dummyPromoList[currentPage].conditions} />
                  </div>
                )}
                <div style={{ height: "100%" }}>
                  <ViewMapRestaurant />
                </div>
              </PopupMobile>
            )} */}

            {listRestaurant && (
              <PopupBottomToMobile show={listRestaurant} onClose={() => setListResaurant(null)}>
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
      )}
    </MainPromo>
  );
};

PromoSection.defaultConfig = defaultConfig;
export default PromoSection;
