import React from "react";
import { LeftWrapper, ProfileGiftWrapper, RightWrapper, StoresWrapper } from "./styled";
import { FormattedMessage } from "react-intl";

const ProfileGift = ({ imageRegister }) => {
  return (
    <ProfileGiftWrapper>
      <LeftWrapper>
        {
          imageRegister && <img src={imageRegister.value?.url} />
        }
      </LeftWrapper>
      <RightWrapper>
        <h2>
          <FormattedMessage id="profile.register_download_app" />
        </h2>
        <ul>
          <li>
            <img width={20} height={20} src="/images/ic/ic_clock.svg" />
            <h6>
              <FormattedMessage id="profile.register_only_three_seconds" />
            </h6>
          </li>
          <li>
            <img width={20} height={20} src="/images/ic/ic_hand.svg" />
            <h6>
              <FormattedMessage id="profile.register_resend_money" />
            </h6>
          </li>
          <li>
            <img width={20} height={20} src="/images/ic/ic_store.svg" />
            <h6>
              <FormattedMessage id="profile.register_in_restaurant" />
            </h6>
          </li>
        </ul>
      </RightWrapper>
    </ProfileGiftWrapper>
  );
};

export default ProfileGift;
