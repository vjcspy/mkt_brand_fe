import React from "react";
import Button from "../button";
import IconTriangleDown from "../icons/iconTriangleDown";
import { FormattedMessage } from "react-intl";

import { HeaderMobile, WrapperImageCode, WrapperScroll, Item, GroupButtonMobile } from "./style";
import Link from "next/link";
const SuccessRegisterMobile = ({ itemPromoGetCode, resultGetCode, onShowListRestaurant, onShowCondition }) => {
  return (
    <>
      <HeaderMobile>
        <h3>
          <FormattedMessage
            id="successRegister.congratulation_mobile"
            values={{
              br: <br />,
            }}
          />
        </h3>
        <WrapperImageCode>
          <img width={82} height={82} src="/images/demo_qc.png" />
        </WrapperImageCode>
        <h6>
          <FormattedMessage id="successRegister.promo_code" />
        </h6>
        <h4>{resultGetCode?.serialNo}</h4>
        <p>
          <FormattedMessage id="successRegister.send_voucher_email" />
        </p>
        <GroupButtonMobile>
          <Button varian="primary-router" target="_blank" href="https://booking.ggg.com.vn">
            <FormattedMessage id="successRegister.reservation_now" />
          </Button>
          <Link href="/profile/my-promo">
            <Button varian="outline-a" href="/profile/my-promo">
              <FormattedMessage id="successRegister.view_my_promo" />
            </Button>
          </Link>
        </GroupButtonMobile>
      </HeaderMobile>
      <WrapperScroll>
        <Item>
          <h5>
            <FormattedMessage id="successRegister.content_event" />
          </h5>
          <h6>
            <div dangerouslySetInnerHTML={{ __html: itemPromoGetCode?.content }} />
          </h6>
        </Item>
        <Item>
          <h5>
            <FormattedMessage id="successRegister.location" />
          </h5>
          <h6>{itemPromoGetCode?.location}</h6>
        </Item>
        <Item>
          <h5>
            <FormattedMessage id="successRegister.date_apply" />
          </h5>
          <h6>
            {itemPromoGetCode?.startDate} - {itemPromoGetCode?.endDate}
          </h6>
        </Item>
        <Item onClick={onShowListRestaurant}>
          <h5>
            <FormattedMessage id="successRegister.restaurant_apply" />
            <IconTriangleDown width={20} height={20} />
          </h5>
        </Item>
        <Item onClick={onShowCondition}>
          <h5>
            <FormattedMessage id="successRegister.condition_apply" />
            <IconTriangleDown width={20} height={20} />
          </h5>
        </Item>
      </WrapperScroll>
    </>
  );
};

export default SuccessRegisterMobile;
