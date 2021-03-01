import { first, has } from "lodash";
import React from "react";
import Button from "../../../components/button";
import Icon from "../../../components/icons";
import LinkRouter from "../../../components/link-router";
import useFromJS from "../../../hooks/useFromJS";
import useSiteRouter from "../../../hooks/useSiteRouter";
import { AvatarWrapper, Marker, DropDownWrapper, ProfileNameWrapper, ProfileWrapper, TabItem, TabsWrapper } from "./styled";
import { FormattedMessage } from "react-intl";

const ProfileDropdown = () => {
  const profile = useFromJS(["profile"]) ?? { name: "User name" };
  const router = useSiteRouter();
  return (
    <>
      <DropDownWrapper>
        <ProfileWrapper>
          <AvatarWrapper>
            {has(profile, ["avatar", "url"]) ? (
              <Image width="80" height="80" src={get(profile, ["avatar", "url"])} alt="avatar" title="Avatar" />
            ) : (
              <h1>{first(profile?.name)}</h1>
            )}
          </AvatarWrapper>
          <ProfileNameWrapper>
            <h5>{profile?.name}</h5>
            <Button
              width="100%"
              size="tiny"
              onClick={() => {
                router.push("/profile");
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
        <Button
          varian="outline"
          width="100%"
          size="tiny"
          onClick={() => {
            router.push("/login");
          }}
        >
          <FormattedMessage id="header.log_out" />
        </Button>
      </DropDownWrapper>
    </>
  );
};

export default ProfileDropdown;
