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

const PromoTabMobile = ({ profilePromo, setDetailPromoMobile }) => {
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <PromoMobile className="moileeee" style={{ height: `calc(100vh - (${headerHeight + 96 + 56 ?? 0}px ` }}>
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
          <Button varian="outline" onClick={() => setDetailPromoMobile(profilePromo?.[currentPage])}>
            <FormattedMessage id="profile.promo_view_detail" />
          </Button>
          <Link href="https://booking.ggg.com.vn" passHref>
            <a className="booking-profile" target="_blank" href="https://booking.ggg.com.vn">
              <Button>
                <FormattedMessage id="profile.promo_reservation" />
              </Button>
            </a>
          </Link>
        </GroupButton>
      </ContentMobile>
    </PromoMobile>
  );
};

export default PromoTabMobile;
