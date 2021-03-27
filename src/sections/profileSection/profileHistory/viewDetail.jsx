import React, { useState, useRef, useEffect } from "react";
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
  HiddenContent,
} from "./styled";
import Rate from "./rate";
import useIframeResize from "../../../hooks/useWindowResize/useIframeResize";
import { FormattedMessage } from "react-intl";
import IconTriangleLineDown from "../../../components/icons/iconTriangleLineDown";

const ViewDetail = ({ transition }) => {
  const [{ width }] = useIframeResize();
  const [show, setShow] = useState(width > 768 ? true : false);
  const refScroll = useRef();

  const onScroll = () => {
    const scrollHeight = refScroll.current?.scrollHeight;
    const scroolTop = refScroll.current?.scrollTop;
    const clientHeight = refScroll.current?.clientHeight;
    if (scroolTop >= scrollHeight - clientHeight - 20) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  return (
    <WrapperViewDetail>
      <Tittle>
        <FormattedMessage id="profile.history_success_review" />!
      </Tittle>
      <CodeBill>
        <FormattedMessage id="profile.history_bill_code" />: {transition?.receiptNumber}
      </CodeBill>
      <WrapperRatting>
        <h5>
          <FormattedMessage id="profile.history_review" />
        </h5>
        <ListRating>
          <Rate rate={4} />
        </ListRating>
      </WrapperRatting>
      <Restaurant>
        <LogoRestaurant>
          <img src={transition?.restaurant?.logo} />
        </LogoRestaurant>
        <InfoRestaurant>
          <h5>{transition?.restaurant?.name}</h5>
          <p>{transition?.restaurant?.address}</p>
        </InfoRestaurant>
      </Restaurant>

      <DetailBill>
        <div onScroll={onScroll} ref={refScroll}>
          <ItemDetail>
            <h5>
              <FormattedMessage id="profile.history_detail_bill" />
            </h5>
            <span>24/10/2020 13:53:06</span>
          </ItemDetail>
          <ItemDetail>
            <span>
              <FormattedMessage id="profile.history_money_discount" />
            </span>
            <span>-297.000đ</span>
          </ItemDetail>
          <ItemDetail>
            <span>
              <FormattedMessage id="profile.history_service_charge" />
            </span>
            <span>0đ</span>
          </ItemDetail>
          <ItemDetail>
            <FormattedMessage id="profile.history_VAT" />
            <span>101.200đ</span>
          </ItemDetail>
          <ItemDetail>
            <span>
              <FormattedMessage id="profile.history_use_voucher" />
            </span>
            <span>0đ</span>
          </ItemDetail>
          <ItemDetail>
            <span>
              <FormattedMessage id="profile.history_money_payment" />
            </span>
            <span>1.113.200đ</span>
          </ItemDetail>
          <ItemDetail>
            <span>
              <FormattedMessage id="profile.history_total_money" />
            </span>
            <span>1.291.000đ</span>
          </ItemDetail>
          <ItemDetail>
            <span>
              <FormattedMessage id="profile.history_accumulated_coin" />
            </span>
            <span>55.660 G - Coin (5%)</span>
          </ItemDetail>
          <ItemDetail>
            <span>
              <FormattedMessage id="profile.history_accumulated_points" />
            </span>
            <span>1.113.200đ</span>
          </ItemDetail>
          <HiddenContent className={`${show ? "show option" : "option"}`}>
            <IconTriangleLineDown />
          </HiddenContent>
        </div>
      </DetailBill>

      <FooterDetail>
        <ItemDetail>
          <h5>
            <FormattedMessage id="profile.history_total_need_pay" />
          </h5>
          <h5>1.113.200đ</h5>
        </ItemDetail>
      </FooterDetail>
    </WrapperViewDetail>
  );
};

export default ViewDetail;
