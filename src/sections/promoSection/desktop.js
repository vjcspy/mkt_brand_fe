import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import ReactPageScroller from "../../../plugins/react-page-scroller";
import loadable from "@loadable/component";
import { Container } from "../../styles";
import { WrapperContentPromo, RightPromo, LeftPromo, WrapperEndpoint, Promo, WrapperPromo, ContentScroller } from "./style";
import SuccessRegister from "../../components/success-register";
import ListRestaurant from "../../components/list-restaurant";
import PromoInfo from "./PromoInfo";
import useHistory from "../../hooks/useHistory";
import IconTriangleLineTop from "../../components/icons/iconTriangleLineTop";
import PointNavigation from "../../components/point-navigation";
import RatioImage from "../../components/ratioImage";
import IconTriangleLineDown from "../../components/icons/iconTriangleLineDown";
import Head from "next/head";

const PhoneOTP = loadable(() => import("../../components/phone-opt"));
const Popup = loadable(() => import("../../components/popup-wrapper"));
const ListCondition = loadable(() => import("./Conditions"));

const PromoDesktop = ({ listPromo, detailPromo, config, theme }) => {
  const [currentPage, setCurrentPage] = useState(detailPromo ? detailPromo : 0);
  console.log(detailPromo);
  const [listRestaurant, setListRestaurant] = useState();
  const [listCondition, setListCondition] = useState();
  const [showLogin, setShowLogin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const size = listPromo.length;
  const [state, history] = useHistory();
  const onGetValueOTP = (result) => {
    if (result) {
      setShowSuccess(true);
    } else {
      setShowSuccess(true);
    }
    setShowLogin(false);
  };

  const viewMapRestaurant = (value) => {
    history.push(state, "Map", "/map");
  };

  const PromoList = useMemo(
    () =>
      listPromo.map((item, index) => (
        <React.Fragment key={index}>
          <Head>
            <link rel="preload" as="image" href={item.image} />
          </Head>
          <Container key={index} style={{ height: "100%" }}>
            <WrapperPromo>
              <Promo className="Promo">
                <LeftPromo className="LeftPromo">
                  <RatioImage ratio="1:1">
                    <img width={500} height={500} src={item.image} alt={item.title} />
                  </RatioImage>
                </LeftPromo>
                <RightPromo className="RightPromo">
                  <PromoInfo
                    promo={item}
                    onGetCode={() => setShowLogin(true)}
                    getRestaurant={() => setListRestaurant(item.listRestaurant)}
                    getCondition={() => setListCondition(item.conditions)}
                  />
                </RightPromo>
              </Promo>
            </WrapperPromo>
          </Container>
        </React.Fragment>
      )),
    [listPromo]
  );

  return (
    <>
      <WrapperContentPromo className="Wrapper-promo-desktop" style={{ height: `calc(100vh - (${headerHeight + 104 ?? 0}px ` }}>
        <ContentScroller className="content-scroller">
          <ReactPageScroller
            customPageNumber={+currentPage}
            containerHeight={`calc(100vh - ${headerHeight + 104 ?? 0}px)`}
            pageOnChange={setCurrentPage}
          >
            {PromoList}
          </ReactPageScroller>
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

      <Popup show={showLogin} onClose={() => setShowLogin(false)}>
        <PhoneOTP onResult={onGetValueOTP} />
      </Popup>

      <Popup show={showSuccess} onClose={() => setShowSuccess(false)}>
        <SuccessRegister listRestaurant={listPromo[currentPage]?.listRestaurant} />
      </Popup>

      <Popup show={listRestaurant} onClose={() => setListRestaurant(null)}>
        <ListRestaurant listRestaurant={listRestaurant} onViewMap={viewMapRestaurant} />
      </Popup>

      <Popup show={listCondition} onClose={() => setListCondition(null)}>
        <ListCondition listCondition={listCondition} />
      </Popup>
    </>
  );
};

export default PromoDesktop;
