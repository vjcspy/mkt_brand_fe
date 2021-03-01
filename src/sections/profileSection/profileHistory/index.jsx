import React from "react";
import Button from "../../../components/button";
import Icon from "../../../components/icons";
import profileHistory from "../../../dummyData/profileHistory";
import { toMoney } from "../../../services/frontend";
import Rate from "./rate";
import { ProfileHistoryWrapper, ProfileHistoryItem, ProfileItemLeft, ProfileItemRight, Pricewrapper } from "./styled";
import { FormattedMessage } from "react-intl";

const ProfileHistory = () => {
  return (
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
            <Button width="100%" varian="primary" onClick={() => {}}>
              <FormattedMessage id="profile.history_view_detail" />
            </Button>
          </ProfileItemRight>
        </ProfileHistoryItem>
      ))}
    </ProfileHistoryWrapper>
  );
};

export default ProfileHistory;
