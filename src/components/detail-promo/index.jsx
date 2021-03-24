import React from "react";
import Button from "../button";
import { HeaderDesktop, HeaderMobile, WrapperQcCode, ContentHeader, NameRestaurant } from "./style";
import { FormattedMessage } from "react-intl";
import { ContentInfo, TitleInfo } from "../popup-promo/style";
import IconTriangleDown from "../icons/iconTriangleDown";
import Link from "next/link";

const DetailPromo = ({ promo, onShowListRestaurant, onShowListCondition }) => {
  return (
    <>
      <HeaderDesktop>
        <WrapperQcCode>
          <img width={82} height={82} src="/images/demo_qc.png" />
        </WrapperQcCode>
        <ContentHeader>
          <h3>{promo?.promotionTitle}</h3>
          <p>
            <FormattedMessage id="profile.promo_popup_send_email" />
          </p>
          <Button size="tiny">
            <FormattedMessage id="profile.promo_reservation" />
          </Button>
        </ContentHeader>
      </HeaderDesktop>

      <HeaderMobile>
        <h3>{promo?.promotionTitle}</h3>
        <WrapperQcCode>
          <img width={82} height={82} src="/images/demo_qc.png" />
        </WrapperQcCode>
        <p>
          <FormattedMessage id="profile.promo_popup_promo_code" />
        </p>
        <h4>{promo?.clmGiftCode}</h4>
        <p className="notify">
          <FormattedMessage id="profile.promo_popup_send_email" />
        </p>
        <Link href="https://booking.ggg.com.vn" passHref>
          <a class="booking-profile" target="_blank" href="https://booking.ggg.com.vn">
            <Button>
              <FormattedMessage id="profile.promo_reservation" />
            </Button>
          </a>
        </Link>
      </HeaderMobile>
      <TitleInfo>
        <FormattedMessage id="popupPromo.content_event" />
      </TitleInfo>
      <ContentInfo>
        <div dangerouslySetInnerHTML={{ __html: promo?.promotionContent }} />
      </ContentInfo>
      <TitleInfo>
        <FormattedMessage id="profile.promo_location" />
      </TitleInfo>
      <ContentInfo>{promo?.location}</ContentInfo>
      <TitleInfo>
        <FormattedMessage id="profile.promo_date_of_promo" />
      </TitleInfo>
      <ContentInfo>
        {promo?.startDate} - {promo?.endDate}
      </ContentInfo>
      <TitleInfo onClick={onShowListRestaurant}>
        <FormattedMessage id="profile.promo_restaurant_apply" />
        <IconTriangleDown width={20} height={20} />
      </TitleInfo>
      <TitleInfo onClick={onShowListCondition}>
        <FormattedMessage id="profile.promo_condition_apply" />
        <IconTriangleDown width={20} height={20} />
      </TitleInfo>
    </>
  );
};

export default DetailPromo;
