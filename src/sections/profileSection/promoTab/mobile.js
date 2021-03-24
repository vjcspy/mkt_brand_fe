import React, { useState } from "react";
import { GroupButton, WrapperFlex, PromoMobile, WrapperEndpoint, WrapperScroller, ContentMobile } from "./style";
import { useSelector } from "react-redux";
import loadable from "@loadable/component";
import RatioImage from "../../../components/ratioImage";
import Button from "../../../components/button";
import DetailPromo from "../../../components/detail-promo";
import ReactPageScroller from "../../../../plugins/react-page-scroller";
import PointNavigation from "../../../components/point-navigation";
import PopupMobile from "../../../components/popup-wrapper-mobile";
import { FormattedMessage } from "react-intl";
import { WrapperContentPopup } from "../../../components/popup-wrapper-mobile/style";
import ListRestaurantBooking from "../../../components/list-restaurant/list-restaurant-booking";
import ListCondition from "../../promoSection/Conditions";
import ViewMapRestaurant from "../../../components/view-map-restaurant";
import Link from "next/link";
const CSSTransition = loadable(() => import("../../../components/css-transition"));
const listRestaurant = [
  {
    name: " Gogi House Trần Phú",
    address: "Hà Đông - 146 Trần Phú, Mỗ Lao, Hà Đông, Hà Nội",
    openClose: " Open - Close: 10:30 AM - 11:00 PM",
    phone: "19006622",
    map: {},
    aboutKm: "0.7",
  },
  {
    name: " Gogi House Trần Phú",
    address: "Hà Đông - 146 Trần Phú, Mỗ Lao, Hà Đông, Hà Nội",
    openClose: " Open - Close: 10:30 AM - 11:00 PM",
    phone: "19006622",
    map: {},
    aboutKm: "0.7",
  },
  {
    name: " Gogi House Trần Phú",
    address: "Hà Đông - 146 Trần Phú, Mỗ Lao, Hà Đông, Hà Nội",
    openClose: " Open - Close: 10:30 AM - 11:00 PM",
    phone: "19006622",
    map: {},
    aboutKm: "0.7",
  },
  {
    name: " Gogi House Trần Phú",
    address: "Hà Đông - 146 Trần Phú, Mỗ Lao, Hà Đông, Hà Nội",
    openClose: " Open - Close: 10:30 AM - 11:00 PM",
    phone: "19006622",
    map: {},
    aboutKm: "0.7",
  },
  {
    name: " Gogi House Trần Phú",
    address: "Hà Đông - 146 Trần Phú, Mỗ Lao, Hà Đông, Hà Nội",
    openClose: " Open - Close: 10:30 AM - 11:00 PM",
    phone: "19006622",
    map: {},
    aboutKm: "0.7",
  },
];
const conditions = [
  " Mã code có hiệu lực sau 3 tiếng tính từ thời gian đăng ký",
  " Không áp dụng song song với ưu đãi khác",
  " Không có giá trị quy đổi thành tiền mặt hay ưu đãi khác",
  " Được áp dụng lũy kế (hóa đơn 1.000.000đ giảm 200.00đ, hóa đơn   2.000.000đ giảm 400.000đ,…)",
  " Khách hàng là thành viên The Golden Spoon được tích điểm nâng hạng   thẻ, không tích tiền vào ví, không sử dụng tiền và voucher trong ví",
];

const PromoTabMobile = ({ profilePromo }) => {
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPromoMobile, setPromoMobile] = useState();
  const [stepFlowPopupMobile, setStepFlowPopupMobile] = useState(0);
  const [showConditionOrRestaurant, setShowConditionOrRestaurant] = useState(true);
  const [viewRestaurant, setViewRestaurant] = useState();
  const onBackPopup = () => {
    if (stepFlowPopupMobile === 0) {
      setStepFlowPopupMobile(0);
      setPromoMobile(null);
    } else {
      setStepFlowPopupMobile(stepFlowPopupMobile - 1);
    }
  };

  const onViewMap = (restaurant) => {
    setStepFlowPopupMobile(2);
    setViewRestaurant(restaurant);
  };

  const onShowListRestaurant = () => {
    setShowConditionOrRestaurant(true);
    setStepFlowPopupMobile(1);
  };
  const onShowListCondition = () => {
    setShowConditionOrRestaurant(false);
    setStepFlowPopupMobile(1);
  };

  return (
    <PromoMobile style={{ height: `calc(100vh - (${headerHeight + 96 ?? 0}px ` }}>
      <h3>
        <FormattedMessage id="profile.title_my_promo" />
      </h3>
      {profilePromo && (
        <WrapperScroller>
          <ReactPageScroller
            className="scroller"
            containerHeight={`calc(100vh - (${headerHeight + 301 ?? 0}px ))`}
            pageOnChange={setCurrentPage}
          >
            {profilePromo.map((item, index) => (
              <RatioImage key={index} ratio="1:1">
                <img width={364} height={364} src={item.promotionThumbnail} />
              </RatioImage>
            ))}
          </ReactPageScroller>
          <WrapperEndpoint>
            <PointNavigation display="block" size={profilePromo?.length} currentIndex={currentPage} />
          </WrapperEndpoint>
        </WrapperScroller>
      )}

      <ContentMobile>
        <h4>{profilePromo?.[currentPage]?.promotionTitle}</h4>
        <WrapperFlex>
          <h5>
            <FormattedMessage id="profile.promo_location" />
          </h5>
          <span>{profilePromo?.[currentPage]?.location}</span>
        </WrapperFlex>
        <WrapperFlex>
          <h5>
            <FormattedMessage id="profile.promo_date_of_promo" />
          </h5>
          <span>{profilePromo?.[currentPage]?.startDate}</span>
        </WrapperFlex>
        <GroupButton>
          <Button varian="outline" onClick={() => setPromoMobile(profilePromo?.[currentPage])}>
            <FormattedMessage id="profile.promo_view_detail" />
          </Button>
          <Link href="https://booking.ggg.com.vn" passHref>
            <a class="booking-profile" target="_blank" href="https://booking.ggg.com.vn">
              <Button>
                <FormattedMessage id="profile.promo_reservation" />
              </Button>
            </a>
          </Link>
        </GroupButton>
      </ContentMobile>
      <CSSTransition show={currentPromoMobile} classTransition="bottom-top">
        <PopupMobile step={stepFlowPopupMobile} onBack={onBackPopup}>
          <WrapperContentPopup>
            <DetailPromo
              promo={currentPromoMobile}
              onShowListRestaurant={onShowListRestaurant}
              onShowListCondition={onShowListCondition}
            />
          </WrapperContentPopup>

          <WrapperContentPopup style={{ height: "100%" }}>
            {showConditionOrRestaurant ? (
              <ListRestaurantBooking
                onBook={onViewMap}
                currentPage="profile-promo"
                promoId={profilePromo?.[currentPage]?.promotionId}
                listRestaurant={profilePromo?.[currentPage]?.restaurants}
                onViewMap={onViewMap}
              />
            ) : (
              <ListCondition listCondition={profilePromo?.[currentPage]?.restaurants} />
            )}
          </WrapperContentPopup>

          <WrapperContentPopup restaurant={profilePromo?.[currentPage]?.restaurants} style={{ height: "100%" }}>
            <ViewMapRestaurant restaurant={viewRestaurant} />
          </WrapperContentPopup>
        </PopupMobile>
      </CSSTransition>
    </PromoMobile>
  );
};

export default PromoTabMobile;
