import { first, has } from "lodash";
import React from "react";
import Button from "../../../components/button";
import Icon from "../../../components/icons";
import LinkRouter from "../../../components/link-router";
import useFromJS from "../../../hooks/useFromJS";
import useSiteRouter from "../../../hooks/useSiteRouter";
import { AvatarWrapper, DropDownWrapper, ProfileNameWrapper, ProfileWrapper, TabItem, TabsWrapper } from "./styled";

const ProfileDropdown = () => {
  const profile = useFromJS(["profile"]) ?? { name: "User name" };
  const router = useSiteRouter();
  return (
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
            Edit profile
          </Button>
        </ProfileNameWrapper>
      </ProfileWrapper>
      <hr />
      <TabsWrapper>
        <LinkRouter href="/profile/my-profile" passHref>
          <TabItem>
            <Icon icon="tab-profile" />
            <h5>Thông tin tài khoản</h5>
          </TabItem>
        </LinkRouter>
        <LinkRouter href="/profile/my-promo" passHref>
          <TabItem>
            <Icon icon="tab-promo" />
            <h5>Ưu đãi của tôi</h5>
          </TabItem>
        </LinkRouter>
        <LinkRouter href="/profile/my-history" passHref>
          <TabItem>
            <Icon icon="tab-history" />
            <h5>Lịch sử giao dịch</h5>
          </TabItem>
        </LinkRouter>
        <LinkRouter href="/profile/register-promo" passHref>
          <TabItem>
            <Icon icon="tab-gift" />
            <h5>Đăng ký nhận tin ưu đãi</h5>
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
        Logout
      </Button>
    </DropDownWrapper>
  );
};

export default ProfileDropdown;
