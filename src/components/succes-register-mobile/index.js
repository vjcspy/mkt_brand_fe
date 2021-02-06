import React from "react";
import Button from "../button";
import IconTriangleDown from "../icons/iconTriangleDown";
import { HeaderMobile, WrapperImageCode, WrapperScroll, Item } from "./style";
const SuccessRegisterMobile = ({ onReservation, onShowListRestaurant, onShowCondition }) => {
  return (
    <>
      <HeaderMobile>
        <h3>
          Chúc mừng đăng ký <br />
          thành công!
        </h3>
        <WrapperImageCode>
          <img src="/images/demo_qc.png" />
        </WrapperImageCode>
        <h6>Mã ưu đãi</h6>
        <h4>CQR42000V</h4>
        <p>Mã voucher đã được gửi về Email và ví voucher của bạn.</p>
        <Button onClick={onReservation}>Đặt bàn ngay</Button>
        <Button varian="outline">Xem ưu đãi của tôi</Button>
      </HeaderMobile>

      <WrapperScroll>
        <Item>
          <h5>Nội dung chương trình</h5>
          <h6>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet,
            consectetur adipiscing elit ipsum dolor sit amet.
          </h6>
        </Item>
        <Item>
          <h5>Khu vực</h5>
          <h6>Hà Nội</h6>
        </Item>
        <Item>
          <h5>Thời gian áp dụng</h5>
          <h6>01/12/2020 - 31/12/2020</h6>
        </Item>
        <Item onClick={onShowListRestaurant}>
          <h5>
            Nhà hàng áp dụng <IconTriangleDown />
          </h5>
        </Item>
        <Item onClick={onShowCondition}>
          <h5>
            Điều kiện áp dụng
            <IconTriangleDown />
          </h5>
        </Item>
      </WrapperScroll>
    </>
  );
};

export default SuccessRegisterMobile;
