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
                <Image src={get(profile, ["avatar", "url"])} />
              ) : (
                <AvatarButton>
                  <Icon icon="camera" />
                </AvatarButton>
              )}
            </AvatarWrapper>
            <ProfileInfoWrapper>
              <ProfileInfoItem>
                <p>ID:</p>
                <p>123568</p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>Coin:</p>
                <p>
                  100.660 <Icon icon="coin" />
                </p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>Level:</p>
                <p>Sliver</p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>Phone number:</p>
                <p>0946 xxx xxx</p>
              </ProfileInfoItem>
              <ProfileButtons>
                <Button varian="outline">Cancel</Button>
                <Button varian="primary">Save</Button>
              </ProfileButtons>
            </ProfileInfoWrapper>
          </ProfileTabGrid>
          <ProfileTabGrid>
            <ProfileInputWrapper>
              <InputComponent title="First name" />
              <InputComponent title="Email" />
              <DropDown title="Gender" listData={genders} />
              <InputComponent title="City" />
            </ProfileInputWrapper>
          </ProfileTabGrid>
          <ProfileTabGrid>
            <ProfileInputWrapper>
              <InputComponent title="Last name" />
              <DropDown title="Birthday" listData={["20/2/1960"]} />
              <InputComponent title="Address (Street/Ward)" />
              <DropDown title="Country" listData={["VietNam"]} />
            </ProfileInputWrapper>
          </ProfileTabGrid>
        </>
      ) : (
        <>
          <ProfileTabGrid>
            <h3>Thông tin cá nhân</h3>
            <ProfileInfoWrapper>
              <AvatarWrapper>
                {has(profile, ["avatar", "url"]) ? (
                  <Image src={get(profile, ["avatar", "url"])} />
                ) : (
                  <AvatarButton>
                    <Icon icon="camera" />
                  </AvatarButton>
                )}
              </AvatarWrapper>
              <ProfileInfoItem>
                <p>ID:</p>
                <p>123568</p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>Coin:</p>
                <p>
                  100.660 <Icon icon="coin" />
                </p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>Level:</p>
                <p>Sliver</p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>Phone number:</p>
                <p>0946 xxx xxx</p>
              </ProfileInfoItem>
            </ProfileInfoWrapper>
            <ProfileInputWrapper>
              <InputComponent title="First name" />
              <InputComponent title="Email" />
              <DropDown title="Gender" listData={genders} />
              <InputComponent title="City" />
              <InputComponent title="Last name" />
              <DropDown title="Birthday" listData={["20/2/1960"]} />
              <InputComponent title="Address (Street/Ward)" />
              <DropDown title="Country" listData={["VietNam"]} />
            </ProfileInputWrapper>
            <ProfileButtons>
              <Button varian="outline">Cancel</Button>
              <Button varian="primary">Save</Button>
            </ProfileButtons>
          </ProfileTabGrid>
        </>
      )}
    </ProfileTabWrapper>
  );
};

export default ProfileTab;
