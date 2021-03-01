import { get, has } from "lodash";
import React from "react";
import Icon from "../../../components/icons";
import useFromJS from "../../../hooks/useFromJS";
import Image from "../../../components/image";
import {
  AvatarWrapper,
  AvatarButton,
  ProfileTabGrid,
  ProfileTabWrapper,
  ProfileInfoWrapper,
  ProfileInfoItem,
  ProfileButtons,
  ProfileInputWrapper,
} from "./styled";
import Button from "../../../components/button";
import InputComponent from "../../../components/input";
import DropDown from "../../../components/input/drop-down";
import useIframeResize from "../../../hooks/useWindowResize/useIframeResize";
import { FormattedMessage } from "react-intl";

const genders = ["Woman", "Man", "Other"];

const ProfileTab = ({}) => {
  const profile = useFromJS(["profile"]);
  const [size, ref] = useIframeResize();
  return (
    <ProfileTabWrapper ref={ref}>
      {size.width > 768 ? (
        <>
          <ProfileTabGrid>
            <AvatarWrapper>
              {has(profile, ["avatar", "url"]) ? (
                <Image width={130} height={130} src={get(profile, ["avatar", "url"])} />
              ) : (
                <AvatarButton>
                  <Icon icon="camera" />
                </AvatarButton>
              )}
            </AvatarWrapper>
            <ProfileInfoWrapper>
              <ProfileInfoItem>
                <p>
                  <FormattedMessage id="profile.info_code" />:
                </p>
                <p>123568</p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>
                  <FormattedMessage id="profile.info_coin" />:
                </p>
                <p>
                  100.660 <Icon icon="coin" />
                </p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>
                  <FormattedMessage id="profile.info_level" />:
                </p>
                <p>Sliver</p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>
                  <FormattedMessage id="profile.info_phone_number" />:
                </p>
                <p>0946 xxx xxx</p>
              </ProfileInfoItem>
              <ProfileButtons>
                <Button varian="outline">
                  <FormattedMessage id="profile.info_cancel" />
                </Button>
                <Button varian="primary">
                  <FormattedMessage id="profile.info_save" />
                </Button>
              </ProfileButtons>
            </ProfileInfoWrapper>
          </ProfileTabGrid>
          <ProfileTabGrid>
            <ProfileInputWrapper>
              <InputComponent title="profile.info_first_name" />
              <InputComponent title="profile.info_email" />
              <DropDown title="profile.info_gender" listData={genders} />
              <InputComponent title="profile.info_city" />
            </ProfileInputWrapper>
          </ProfileTabGrid>
          <ProfileTabGrid>
            <ProfileInputWrapper>
              <InputComponent title="profile.info_last_name" />
              <DropDown title="profile.info_birth_day" listData={["20/2/1960"]} />
              <InputComponent title="profile.info_address" />
              <DropDown title="profile.info_country" listData={["VietNam"]} />
            </ProfileInputWrapper>
          </ProfileTabGrid>
        </>
      ) : (
        <>
          <ProfileTabGrid>
            <h3>
              <FormattedMessage id="profile.title_info_account" />
            </h3>
            <ProfileInfoWrapper>
              <AvatarWrapper>
                {has(profile, ["avatar", "url"]) ? (
                  <Image width={130} height={130} src={get(profile, ["avatar", "url"])} />
                ) : (
                  <AvatarButton>
                    <Icon icon="camera" />
                  </AvatarButton>
                )}
              </AvatarWrapper>
              <ProfileInfoItem>
                <p>
                  <FormattedMessage id="profile.info_code" />:
                </p>
                <p>123568</p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>
                  <FormattedMessage id="profile.info_coin" />:
                </p>
                <p>
                  100.660 <Icon icon="coin" />
                </p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>
                  <FormattedMessage id="profile.info_level" />:
                </p>
                <p>Sliver</p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>
                  <FormattedMessage id="profile.info_phone_number" />:
                </p>
                <p>0946 xxx xxx</p>
              </ProfileInfoItem>
            </ProfileInfoWrapper>
            <ProfileInputWrapper>
              <InputComponent title="profile.info_first_name" />
              <InputComponent title="profile.info_email" />
              <DropDown title="profile.info_gender" listData={genders} />
              <InputComponent title="profile.info_city" />
              <InputComponent title="profile.info_last_name" />
              <DropDown title="profile.info_birth_day" listData={["20/2/1960"]} />
              <InputComponent title="profile.info_address" />
              <DropDown title="profile.info_country" listData={["VietNam"]} />
            </ProfileInputWrapper>
            <ProfileButtons>
              <Button varian="outline">
                <FormattedMessage id="profile.info_cancel" />
              </Button>
              <Button varian="primary">
                <FormattedMessage id="profile.info_save" />
              </Button>
            </ProfileButtons>
          </ProfileTabGrid>
        </>
      )}
    </ProfileTabWrapper>
  );
};

export default ProfileTab;
