import React, { useState, useEffect } from "react";
import Button from "../../../components/button";
import Icon from "../../../components/icons";
import { toMoney } from "../../../services/frontend";
import Rate from "./rate";
import { ProfileHistoryWrapper, ProfileHistoryItem, ProfileItemLeft, ProfileItemRight, Pricewrapper } from "./styled";
import { FormattedMessage } from "react-intl";
import Popup from "../../../components/popup-wrapper";
import ViewDetail from "./viewDetail";
import useIframeResize from "../../../hooks/useWindowResize/useIframeResize";
import PopupMobile from "../../../components/popup-wrapper-mobile";
import { WrapperContentPopup } from "../../../components/popup-wrapper-mobile/style";
import { GET_TRANSACTION } from "../../../constants";
import { useSelector, useDispatch } from "react-redux";
import PulseLoader from "../../../components/loading";
import { showNotification } from "../../../components/notification";
import moment from "moment";
import Portal from "../../../development/containers/developmentDialog/portal";
const ProfileHistory = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [size] = useIframeResize();
  const dispatch = useDispatch();
  const { data, error, warning, loading, loaded } = useSelector((state) => state.get("transaction")) ?? {};
  useEffect(() => {
    if (!data && !loaded) {
      dispatch({ type: GET_TRANSACTION, value: { type: "all" } });
    } else if (data.length === 0 && loaded) {
      showNotification(dispatch, { content: "Chưa có lịch sử giao dịch", status: "warning" });
    }
  }, [data, loaded]);

  useEffect(() => {
    if (error && loaded) {
      showNotification(dispatch, { content: error, status: "error" });
    }
    if (warning && loaded) {
      showNotification(dispatch, { content: warning, status: "warning" });
    }
  }, [error, warning]);
  return (
    <ProfileHistoryWrapper>
      {loading ? (
        <Portal className="profile-history">
          <div
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              height: "100vh",
              width: "100vw",
              zIndex: "3000",
              position: "fixed",
              top: 0,
              left: 0,
            }}
          >
            <PulseLoader loading fill color="#F89520" />
          </div>
        </Portal>
      ) : null}
      {data?.map((item, index) => (
        <ProfileHistoryItem key={index}>
          <ProfileItemLeft>
            <h4>
              <FormattedMessage id="profile.history_review" />
            </h4>
            <Rate rate={item.rate} />
          </ProfileItemLeft>
          <ProfileItemRight>
            <h3>{item?.location}</h3>
            <h5>
              {moment(item?.date).format("L")} {moment(item?.date).format("LTS")}
            </h5>
            <Pricewrapper>
              <h5>
                <FormattedMessage id="profile.history_total" />: {toMoney(item.totalBill)}đ
              </h5>
              <h5>
                {toMoney(item?.amount)}
                <Icon icon="coin" />
              </h5>
            </Pricewrapper>
            <Button width="100%" varian="primary" onClick={() => setShowDetail(item)}>
              <FormattedMessage id="profile.history_view_detail" />
            </Button>
          </ProfileItemRight>
        </ProfileHistoryItem>
      ))}
      {size.width > 768 ? (
        <Popup style={{ maxHeight: "98vh", height: "90vh" }} show={showDetail} onClose={() => setShowDetail(false)}>
          <ViewDetail transition={showDetail} />
        </Popup>
      ) : (
        <PopupMobile show={showDetail} step={0} onBack={() => setShowDetail(false)}>
          <WrapperContentPopup>
            <ViewDetail transition={showDetail} />
          </WrapperContentPopup>
        </PopupMobile>
      )}
    </ProfileHistoryWrapper>
  );
};

export default ProfileHistory;
