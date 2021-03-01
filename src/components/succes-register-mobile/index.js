import React from "react";
import Button from "../button";
import IconTriangleDown from "../icons/iconTriangleDown";
import { FormattedMessage } from "react-intl";

import { HeaderMobile, WrapperImageCode, WrapperScroll, Item } from "./style";
const SuccessRegisterMobile = ({ onReservation, onShowListRestaurant, onShowCondition }) => {
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
        <h4>CQR42000V</h4>
        <p>
          <FormattedMessage id="successRegister.send_voucher_email" />
        </p>
        <Button onClick={onReservation}>
          <FormattedMessage id="successRegister.reservation_now" />
        </Button>
        <Button varian="outline">
          <FormattedMessage id="successRegister.view_my_promo" />
        </Button>
      </HeaderMobile>

      <WrapperScroll>
        <Item>
          <h5>
            <FormattedMessage id="successRegister.content_event" />
          </h5>
          <h6>
            Hỡi các thực thần tứ phương, cùng lên đường thẳng tiến GoGi để có 100% CƠ HỘI nhận hàng ngàn quà tặng cùng giải thưởng tiền mặt
            trao tay tổng trị giá 1 TỶ ĐỒNG
          </h6>
        </Item>
        <Item>
          <h5>
            <FormattedMessage id="successRegister.location" />
          </h5>
          <h6>Hà Nội</h6>
        </Item>
        <Item>
          <h5>
            <FormattedMessage id="successRegister.date_apply" />
          </h5>
          <h6>01/12/2020 - 31/12/2020</h6>
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
