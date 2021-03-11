import React, { useState } from "react";
import Button from "../../../components/button";
import Icon from "../../../components/icons";
import profileHistory from "../../../dummyData/profileHistory";
import { toMoney } from "../../../services/frontend";
import Rate from "./rate";
import { ProfileHistoryWrapper, ProfileHistoryItem, ProfileItemLeft, ProfileItemRight, Pricewrapper } from "./styled";
import { FormattedMessage } from "react-intl";
import Popup from "../../../components/popup-wrapper";
import ViewDetail from "./viewDetail";
import PopupBottomToMobile from "../../../components/popup-bottom-top-mobile";
import useIframeResize from "../../../hooks/useWindowResize/useIframeResize";
import CSSTransition from "../../../components/css-transition";
import PopupMobile from "../../../components/popup-wrapper-mobile";
import { WrapperContentPopup } from "../../../components/popup-wrapper-mobile/style";

const ProfileHistory = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [sizeWidth] = useIframeResize();

  return (
    <>
      <ProfileHistoryWrapper>
        {profileHistory.map((item, index) => (
          <ProfileHistoryItem key={index}>
            <ProfileItemLeft>
              <h4>
                <FormattedMessage id="profile.history_review" />
              </h4>
              <Rate rate={item.rate} />
            </ProfileItemLeft>
            <ProfileItemRight>
              <h3>{item.name}</h3>
              <h5>{item.date}</h5>
              <Pricewrapper>
                <h5>
                  <FormattedMessage id="profile.history_total" />: {toMoney(item.totalBill)}đ
                </h5>
                <h5>
                  + {toMoney(item.coin)}
                  <Icon icon="coin" />
                </h5>
              </Pricewrapper>
              <Button width="100%" varian="primary" onClick={() => setShowDetail(true)}>
                <FormattedMessage id="profile.history_view_detail" />
              </Button>
            </ProfileItemRight>
          </ProfileHistoryItem>
        ))}
      </ProfileHistoryWrapper>
      {sizeWidth.width > 768 ? (
        <Popup style={{ maxHeight: "98vh" }} show={showDetail} onClose={() => setShowDetail(false)}>
          <ViewDetail />
        </Popup>
      ) : (
        <CSSTransition show={showDetail} classTransition="bottom-top">
          <PopupMobile step={0} onBack={() => setShowDetail(false)}>
            <WrapperContentPopup>
              <ViewDetail />
            </WrapperContentPopup>
          </PopupMobile>
        </CSSTransition>
      )}
    </>
  );
};

export default ProfileHistory;
