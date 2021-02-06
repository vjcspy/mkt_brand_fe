import React, { useState, useRef, useEffect } from "react";
import Button from "../button";
import IconTriangleLineDown from "../icons/iconTriangleLineDown";
import { HeaderDesktop, HeaderMobile, WrapperQcCode, ContentHeader, WrapperScroll, HiddenContent } from "./style";
const SuccessRegister = () => {
  const [isShow, setShow] = useState(false);
  const refScroll = useRef();

  const onCheckHeight = () => {
    const scrollHeight = refScroll.current?.scrollHeight;
    const scroolTop = refScroll.current?.scrollTop;
    const clientHeight = refScroll.current?.clientHeight;
    if (scroolTop === scrollHeight - clientHeight) {
      return false;
    } else {
      return true;
    }
  };
  const onScrollContent = () => {
    setShow(onCheckHeight());
  };

  useEffect(() => {
    window.onresize = () => {
      setShow(onCheckHeight());
    };
  }, []);

  const onMoveBottom = () => {
    refScroll.current.scrollTo({
      top: 1000,
      left: 100,
      behavior: "smooth",
    });
  };

  return (
    <>
      <HeaderDesktop>
        <WrapperQcCode>
          <img src="/images/demo_qc.png" />
        </WrapperQcCode>
        <ContentHeader>
          <h3>Chúc mừng đăng ký thành công!</h3>
          <p>Mã voucher đã được gửi về Email và ví voucher của bạn.</p>
          <Button varian="outline">Xem ưu đãi của tôi</Button>
          <Button>Đặt bàn ngay</Button>
        </ContentHeader>
      </HeaderDesktop>

      <HeaderMobile>
        <h3>
          Chúc mừng đăng ký <br />
          thành công!
        </h3>
        <WrapperQcCode>
          <img src="/images/demo_qc.png" />
        </WrapperQcCode>
        <p>Mã ưu đãi</p>
        <h4>CQR42000V</h4>
        <p>Mã voucher đã được gửi về Email và ví voucher của bạn.</p>
        <Button>Đặt bàn ngay</Button>
        <Button varian="outline">Xem ưu đãi của tôi</Button>
      </HeaderMobile>

      <WrapperScroll ref={refScroll} onScroll={onScrollContent}>
        <h5>Nội dung chương trình</h5>
        <h6>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet,
          consectetur adipiscing elit ipsum dolor sit amet.
        </h6>
        <h5>Khu vực</h5>
        <h6>Hà Nội</h6>
        <h5>Thời gian áp dụng</h5>
        <h6>01/12/2020 - 31/12/2020</h6>
        <h5>Nhà hàng áp dụng</h5>
        <ul>
          <li>
            <h6>• Gogi House Trần Phú</h6>
            <p>
              Khu nhà ở liền kề 3C-10, 11, 24, 25. Đường Nguyễn Văn Lộc, khu đô thị Mỗ Lao, phường Mộ Lao, quận Hà Đông, Hà Nội -
              02473008011
            </p>
          </li>
        </ul>

        <HiddenContent className={`${isShow ? "show" : ""}`}>
          <IconTriangleLineDown onClick={onMoveBottom} />
        </HiddenContent>
      </WrapperScroll>
    </>
  );
};

export default SuccessRegister;
