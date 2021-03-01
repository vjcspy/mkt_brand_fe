import React from "react";
import Button from "../button";
import { HeaderDesktop, HeaderMobile, WrapperQcCode, ContentHeader, NameRestaurant } from "./style";
import { FormattedMessage } from "react-intl";
import { ContentInfo, TitleInfo } from "../popup-promo/style";
import IconTriangleDown from "../icons/iconTriangleDown";

const DetailPromo = ({ promo, onShowListRestaurant, onShowListCondition }) => {
  return (
    <>
      <HeaderDesktop>
        <WrapperQcCode>
          <img width={82} height={82} src="/images/demo_qc.png" />
        </WrapperQcCode>
        <ContentHeader>
          <h3>{promo?.title}</h3>
          <p>
            <FormattedMessage id="profile.promo_popup_send_email" />
          </p>
          <Button size="tiny">
            <FormattedMessage id="profile.promo_reservation" />
          </Button>
        </ContentHeader>
      </HeaderDesktop>

      <HeaderMobile>
        <h3>{promo?.title}</h3>
        <WrapperQcCode>
          <img width={82} height={82} src="/images/demo_qc.png" />
        </WrapperQcCode>
        <p>
          <FormattedMessage id="profile.promo_popup_promo_code" />
        </p>
        <h4>CQR42000V</h4>
        <p className="notify">
          <FormattedMessage id="profile.promo_popup_send_email" />
        </p>
        <Button>
          <FormattedMessage id="profile.promo_reservation" />
        </Button>
      </HeaderMobile>
      <TitleInfo>
        <FormattedMessage id="profile.promo_reservation" />
      </TitleInfo>
      <ContentInfo>
        Hỡi các thực thần tứ phương, cùng lên đường thẳng tiến GoGi để có 100% CƠ HỘI nhận hàng ngàn quà tặng cùng giải thưởng tiền mặt trao
        tay tổng trị giá 1 TỶ ĐỒNG
      </ContentInfo>
      <TitleInfo>
        <FormattedMessage id="profile.promo_location" />
      </TitleInfo>
      <ContentInfo>Hà Nội</ContentInfo>
      <TitleInfo>
        <FormattedMessage id="profile.promo_date_of_promo" />
      </TitleInfo>
      <ContentInfo>01/12/2020 - 31/12/2020</ContentInfo>
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
