import React from "react";
import { WrapperFlex, NamePromo, Feature, Description } from "./style";
import Button from "../../../components/button";
import IconTriangleDown from "../../../components/icons/iconTriangleDown";
const PromoInfo = ({ promo, onGetCode, getRestaurant, getCondition }) => {
  return (
    <>
      <NamePromo>{promo.title}</NamePromo>
      <WrapperFlex>
        <h5>Khu vực</h5>
        <span>{promo.location}</span>
      </WrapperFlex>
      <WrapperFlex>
        <h5>Thời gian áp dụng</h5>
        <span>{promo.timeAvailable}</span>
      </WrapperFlex>
      <WrapperFlex>
        <h5>Số Voucher còn lại</h5>
        <span>{promo.voucher}</span>
      </WrapperFlex>
      <WrapperFlex>
        <h5>Hết hạn sau</h5>
        <span>{promo.dateExpend} ngày</span>
      </WrapperFlex>
      <Button onClick={onGetCode}>Nhận mã</Button>
      <h5>Nội dung chương trình</h5>
      <Description>{promo.description}</Description>
      <Feature onClick={getRestaurant}>
        Nhà hàng áp dụng <IconTriangleDown />
      </Feature>
      <Feature style={{ marginBottom: 0 }} onClick={getCondition}>
        Điều kiện áp dụng <IconTriangleDown />
      </Feature>
    </>
  );
};

export default PromoInfo;
