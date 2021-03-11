import React from "react";
import ScrollShowContent from "../../../components/scroll-show-content";
import {
  CodeBill,
  DetailBill,
  FooterDetail,
  InfoRestaurant,
  ItemDetail,
  ListRating,
  LogoRestaurant,
  Restaurant,
  Tittle,
  WrapperRatting,
  WrapperViewDetail,
} from "./styled";
import Rate from "./rate";
import useIframeResize from "../../../hooks/useWindowResize/useIframeResize";
const ViewDetail = () => {
  const [sizeWidth] = useIframeResize();

  return (
    <WrapperViewDetail>
      <Tittle>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</Tittle>
      <CodeBill>Đơn hàng: #473_2003107_2020_10_24</CodeBill>
      <WrapperRatting>
        <h5>Đánh giá về nhà hàng</h5>
        <ListRating>
          <Rate rate={4} />
        </ListRating>
      </WrapperRatting>
      <Restaurant>
        <LogoRestaurant>
          <img />
        </LogoRestaurant>
        <InfoRestaurant>
          <h5>Gogi House Mipec Tây Sơn</h5>
          <p>Tầng 5 Artemis Tower, số 3 Lê Trọng Tấn, Khương Mai, Thanh Xuân, Hà Nội </p>
        </InfoRestaurant>
      </Restaurant>
      <DetailBill>
        <ScrollShowContent style={{ maxHeight: `%${sizeWidth.width > 768 ? "80px" : "100%"} ` }}>
          <ItemDetail>
            <h5>Chi tiết đơn hàng</h5>
            <span>24/10/2020 13:53:06</span>
          </ItemDetail>
          <ItemDetail>
            <span>Số tiền giảm giá</span>
            <span>-297.000đ</span>
          </ItemDetail>
          <ItemDetail>
            <span>Phí dịch vụ</span>
            <span>0đ</span>
          </ItemDetail>
          <ItemDetail>
            <span>VAT</span>
            <span>101.200đ</span>
          </ItemDetail>
          <ItemDetail>
            <span>Sử dụng voucher</span>
            <span>0đ</span>
          </ItemDetail>
          <ItemDetail>
            <span>Số tiền đã thanh toán</span>
            <span>1.113.200đ</span>
          </ItemDetail>
          <ItemDetail>
            <span>Tổng tiền hàng</span>
            <span>1.291.000đ</span>
          </ItemDetail>
          <ItemDetail>
            <span>Số đồng tích luỹ</span>
            <span>55.660 G - Coin (5%)</span>
          </ItemDetail>
          <ItemDetail>
            <span>Số điểm tích luỹ</span>
            <span>1.113.200đ</span>
          </ItemDetail>
        </ScrollShowContent>
      </DetailBill>
      <FooterDetail>
        <ItemDetail>
          <h5>Tổng số tiền phải trả</h5>
          <h5>1.113.200đ</h5>
        </ItemDetail>
      </FooterDetail>
    </WrapperViewDetail>
  );
};

export default ViewDetail;
