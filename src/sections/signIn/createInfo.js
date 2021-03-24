import React, { useState, useRef, useEffect } from "react";
import Button from "../../components/button";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox } from "../../components/checkbox";
import InputComponent from "../../components/input";
import DropDown from "../../components/input/drop-down";
import { FormattedMessage } from "react-intl";

import { Info, GroupInput, ContentSingUp } from "./style";
import useSiteRouter from "../../hooks/useSiteRouter";
import useApi from "../../hooks/useApi";
import { GGG_INTERNAL, SET_USER_INFO } from "../../constants";
import PulseLoader from "../../components/loading";
import { showNotification } from "../../components/notification";

export const genders = [
  { title: "woman", value: 0 },
  { title: "man", value: 1 },
];

const CreateInfo = ({ getCheckGetCode }) => {
  const dispatch = useDispatch();
  const refOTP = useRef();
  const tokenUser = useSelector((state) => state.get("tokenUser")).toJS();
  const { firstName, lastName, gender, email } = useSelector((state) => state.get("userInfo")).toJS() ?? {};
  const [checkPolicy, setCheckPolicy] = useState(true);
  const [sendToEmail, setSenToEmail] = useState(false);

  const [info, setInfo] = useState({
    firstName,
    lastName,
    email,
    gender,
  });

  const [dataCreate, action] = useApi(
    `${process.env.NEXT_PUBLIC_GGG_INTERNAL}/update-profile`,
    {
      ...info,
      customerNumber: tokenUser.customerNumber,
    },
    { "tgs-version": "2.6.10", Authorization: `Bearer ${tokenUser.token}` },
    "POST"
  );
  const onCreateAccount = () => {
    action();
  };

  useEffect(() => {
    refOTP.current?.focus();
  }, []);

  const onChangeGender = (id) => {
    setInfo((state) => ({
      ...state,
      gender: id,
    }));
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setInfo((state) => ({
      ...state,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (dataCreate.data) {
      const { messageCode, message, error, result } = dataCreate.data;
      if (messageCode === 1) {
        dispatch({ type: SET_USER_INFO, value: result });
        showNotification(dispatch, { content: message, status: "success" });
        getCheckGetCode();
      } else {
        const content = message ?? error.message;
        showNotification(dispatch, { content, status: "error" });
      }
    }
    return () => {
      dataCreate.data = null;
    };
  }, [dataCreate]);

  return (
    <ContentSingUp>
      <h2 style={{ marginLeft: 0 }}>
        <FormattedMessage id="login.sign_up" />
      </h2>
      <Info>
        <FormattedMessage id="login.note_create_account" />
      </Info>
      <GroupInput>
        <InputComponent
          value={info.firstName}
          onChange={onChange}
          name="firstName"
          className="input"
          title="login.first_name"
          placeHolder="Text"
        />
        <InputComponent
          value={info.lastName}
          onChange={onChange}
          name="lastName"
          className="input"
          title="login.last_name"
          placeHolder="Text"
        />
      </GroupInput>
      <GroupInput>
        <InputComponent
          value={info.email}
          onChange={onChange}
          name="email"
          className="input"
          title="login.email_address"
          placeHolder="Text"
        />
        <DropDown
          onChangeGender={onChangeGender}
          style={{ borderBottom: "1px solid #231F20" }}
          className="input"
          listData={genders}
          title="login.gender"
          value={info.gender}
        />
      </GroupInput>
      <Info>
        <Checkbox checked={checkPolicy} onClick={() => setCheckPolicy(!checkPolicy)} />
        <span>
          By creating an account you agree to the <a className="underline">term of use</a> and our{" "}
          <a className="underline">privacy policy</a>
        </span>
      </Info>
      <Info>
        <Checkbox checked={sendToEmail} onClick={() => setSenToEmail(!sendToEmail)} />
        We'll send you promotions and policy update via email
      </Info>
      <Button onClick={onCreateAccount}>
        {" "}
        {dataCreate?.loading ? <PulseLoader loading fill /> : <span>Đăng kí</span>}
      </Button>
    </ContentSingUp>
  );
};
export default CreateInfo;
