import { first } from "lodash";
import React from "react";
import Button from "../../../components/button";
import Icon from "../../../components/icons";
import LinkRouter from "../../../components/link-router";
import useSiteRouter from "../../../hooks/useSiteRouter";
import { AvatarWrapper, DropDownWrapper, ProfileNameWrapper, ProfileWrapper, TabItem, TabsWrapper } from "./styled";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { SET_TOKEN_USER, SET_USER_INFO } from "../../../constants";

const ProfileDropdown = ({ userName, avatar, setShowProfile }) => {
  const router = useSiteRouter();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch({ type: SET_TOKEN_USER, value: {} });
    dispatch({ type: SET_USER_INFO, value: {} });
    dispatch({ type: SET_PROMO_OF_USER, value: {} });
    setShowProfile(false);
    router.pushQuery("/");
  };
  
  return (
    <>
      <DropDownWrapper>
        <ProfileWrapper>
          <AvatarWrapper>
            {avatar ? (
              <Image width="80" height="80" src={avatar} alt="avatar" title="Avatar" />
            ) : (
              <h1>{first(userName)}</h1>
            )}
          </AvatarWrapper>
          <ProfileNameWrapper>
            <h5>{userName}</h5>
            <Button
              width="100%"
              size="tiny"
              onClick={() => {
                router.pushQuery("/profile");
              }}
            >
              <FormattedMessage id="header.edit_info" />
            </Button>
          </ProfileNameWrapper>
        </ProfileWrapper>
        <hr />
        <TabsWrapper>
          <LinkRouter href="/profile/my-profile" passHref>
            <TabItem>
              <Icon icon="tab-profile" />
              <h5>
                <FormattedMessage id="header.info_account" />
              </h5>
            </TabItem>
          </LinkRouter>
          <LinkRouter href="/profile/my-promo" passHref>
            <TabItem>
              <Icon icon="tab-promo" />
              <h5>
                <FormattedMessage id="header_my_promo" />
              </h5>
            </TabItem>
          </LinkRouter>
          <LinkRouter href="/profile/my-history" passHref>
            <TabItem>
              <Icon icon="tab-history" />
              <h5>
                <FormattedMessage id="header.history_deal" />
              </h5>
            </TabItem>
          </LinkRouter>
          <LinkRouter href="/profile/register-promo" passHref>
            <TabItem>
              <Icon icon="tab-gift" />
              <h5>
                <FormattedMessage id="header.register_to_get_promo" />
              </h5>
            </TabItem>
          </LinkRouter>
        </TabsWrapper>
        <hr />
        <Button varian="outline" width="100%" size="tiny" onClick={onLogout}>
          <FormattedMessage id="header.log_out" />
        </Button>
      </DropDownWrapper>
    </>
  );
};

export default ProfileDropdown;
