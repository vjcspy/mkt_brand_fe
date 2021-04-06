import React, { useState, useEffect } from "react";
import Icon from "../../../components/icons";
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
import { useSelector, useDispatch } from "react-redux";
import { genders } from "../../signIn/createInfo";
import useApi from "../../../hooks/useApi";
import { SET_USER_INFO } from "../../../constants";
import PulseLoader from "../../../components/loading";
import { showNotification } from "../../../components/notification";
import InputDataPicker from "../../../components/input-date-picker";

const ProfileTab = ({ }) => {
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    email,
    gender,
    dob,
    address,
    avatar,
    coinAmount,
    cellphone,
    customerNumber,
    currentMembershipName,
  } = useSelector((state) => state.get("userInfo"))?.toJS() ?? {};
  const { token } = useSelector((state) => state.get("tokenUser")).toJS();
  const [size, ref] = useIframeResize();

  const [profile, setProfile] = useState({
    firstName,
    lastName,
    email,
    gender,
    dob,
    address,
  });

  const [{ loading, error, data }, onUpdateUserInfo] = useApi(
    `${process.env.NEXT_PUBLIC_GGG_INTERNAL}/update-profile`,
    profile,
    { "tgs-version": "2.6.10", Authorization: `Bearer ${token}` },
    "POST"
  );

  const onChange = (e) => {
    const { name, value } = e.target ?? e;
    setProfile((state) => ({
      ...state,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (data) {
      const { message, messageCode, result, error } = data;
      if (messageCode === 1) {
        showNotification(dispatch, { content: message, status: "success" });
        dispatch({ type: SET_USER_INFO, value: result });
      } else {
        showNotification(dispatch, { content: error.message ?? message, status: "error" });
      }
    }
    if (error) {
      showNotification(dispatch, { content: "Lỗi mạng", status: "error" });
    }
  }, [data, error]);

  const onChangeGender = (value) => {
    setProfile(pre => ({ ...pre, gender: value }))
  };

  return (
    <ProfileTabWrapper className="profile" ref={ref}>
      {size.width > 768 ? (
        <>
          <ProfileTabGrid>
            <AvatarWrapper>
              {avatar ? (
                <Image width={130} height={130} src={avatar} />
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
                <p>{customerNumber}</p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>
                  <FormattedMessage id="profile.info_coin" />:
                </p>
                <p>
                  {coinAmount ?? 0} <Icon icon="coin" />
                </p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>
                  <FormattedMessage id="profile.info_level" />:
                </p>
                <p>{currentMembershipName}</p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>
                  <FormattedMessage id="profile.info_phone_number" />:
                </p>
                <p>{cellphone}</p>
              </ProfileInfoItem>
              <ProfileButtons>
                <Button varian="outline">
                  <FormattedMessage id="profile.info_cancel" />
                </Button>
                <Button onClick={() => onUpdateUserInfo()} varian="primary">
                  {loading ? <PulseLoader loading fill /> : <FormattedMessage id="profile.info_save" />}
                </Button>
              </ProfileButtons>
            </ProfileInfoWrapper>
          </ProfileTabGrid>
          <ProfileTabGrid>
            <ProfileInputWrapper>
              <InputComponent
                onChange={onChange}
                name="firstName"
                value={profile.firstName}
                title="profile.info_first_name"
              />
              <InputComponent onChange={onChange} name="email" value={profile.email} title="profile.info_email" />
              <DropDown
                onChangeGender={onChangeGender}
                value={profile.gender}
                style={{ borderBottom: "1px solid #231F20" }}
                title="profile.info_gender"
                listData={genders}
              />
              {/* <InputComponent
                onChange={onChange}
                value={profile.provinceId}
                name={"provinceId"}
                title="profile.info_city"
              /> */}
            </ProfileInputWrapper>
          </ProfileTabGrid>
          <ProfileTabGrid>
            <ProfileInputWrapper>
              <InputComponent
                onChange={onChange}
                name="lastName"
                value={profile.lastName}
                title="profile.info_last_name"
              />
              {/* <InputComponent onChange={onChange} name="dob" title="profile.info_birth_day" value={profile.dob} />
               */}
              <InputDataPicker date={profile.dob} onChangeDate={onChange} title="profile.info_birth_day" />
              <InputComponent onChange={onChange} name="address" value={profile.address} title="profile.info_address" />
              {/* <InputComponent
                onChange={onChange}
                value={profile.addresses}
                name="addresses"
                title="profile.info_country"
              /> */}
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
                {avatar ? (
                  <Image width={130} height={130} src={avatar} />
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
                <p>{customerNumber}</p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>
                  <FormattedMessage id="profile.info_coin" />:
                </p>
                <p>
                  {coinAmount}
                  <Icon icon="coin" />
                </p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>
                  <FormattedMessage id="profile.info_level" />:
                </p>
                <p>{currentMembershipName}</p>
              </ProfileInfoItem>
              <ProfileInfoItem>
                <p>
                  <FormattedMessage id="profile.info_phone_number" />:
                </p>
                <p>{cellphone}</p>
              </ProfileInfoItem>
            </ProfileInfoWrapper>
            <ProfileInputWrapper>
              <InputComponent
                title="profile.info_first_name"
                name="firstName"
                value={profile.firstName}
                onChange={onChange}
              />
              <InputComponent
                title="profile.info_last_name"
                name="lastName"
                value={profile.lastName}
                onChange={onChange}
              />
              <InputDataPicker date={profile.dob} onChangeDate={onChange} title="profile.info_birth_day" />
              <DropDown
                style={{ borderBottom: "1px solid #231F20" }}
                title="profile.info_gender"
                listData={genders}
                value={profile.gender}
                onChangeGender={onChangeGender}
              />
              <InputComponent title="profile.info_email" name="email" value={profile.email} onChange={onChange} />
              <InputComponent title="profile.info_address" name="address" value={profile.address} onChange={onChange} />
              {/* <InputComponent
                title="profile.info_city"
                name="provinceId"
                value={profile.provinceId}
                onChange={onChange}
              /> */}
              {/* <InputComponent
                title="profile.info_country"
                name="addresses"
                value={profile.addresses}
                onChange={onChange}
              /> */}
            </ProfileInputWrapper>
            <ProfileButtons>
              <Button varian="outline">
                <FormattedMessage id="profile.info_cancel" />
              </Button>
              <Button onClick={onUpdateUserInfo} varian="primary">
                {loading ? <PulseLoader loading fill /> : <FormattedMessage id="profile.info_save" />}
              </Button>
            </ProfileButtons>
          </ProfileTabGrid>
        </>
      )}
    </ProfileTabWrapper>
  );
};

export default ProfileTab;
