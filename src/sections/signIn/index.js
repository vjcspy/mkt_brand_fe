import React, { useState, useRef, useEffect } from "react";
import Button from "../../components/button";
import { Checkbox } from "../../components/checkbox";
import PinInput from "../../components/pin-input";
import InputComponent from "../../components/input";
import DropDown from "../../components/input/drop-down";
import InputPhone from "../../components/input/input-phone";
import { FormattedMessage } from "react-intl";

import { WrapperSignIn, Item, Info, GroupInput, ContentSignIn, WrapperItemSignIn, ListItemScroll, ContentSingUp } from "./style";
import useSiteRouter from "../../hooks/useSiteRouter";
const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "login",
  title: "Login Section",
  components: {},
};

const genders = ["Woman", "Man", "Other"];

const SectionSignIn = () => {
  const router = useSiteRouter();
  const [phoneNumber, setPhoneNumber] = useState();
  const [otp, setOTP] = useState();
  const [stepOTP, setStepOTP] = useState(0);
  const refPhone = useRef();
  const refOTP = useRef();

  const [checkPolicy, setCheckPolicy] = useState(true);
  const [sendToEmail, setSenToEmail] = useState(false);

  const [showLogin, setShowLogin] = useState(true);
  const [showGetOTP, setShowGetOTP] = useState(true);

  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });

  const onGetOTP = () => {
    setShowGetOTP(false);
  };
  const onSubmitOTP = (value) => {
    setShowLogin(false);
  };

  const onSetOTP = (value) => {
    setOTP(value);
    if (value?.length >= 6) {
      console.log("submit");
    }
  };

  const onCreateAccount = () => {
    setShowLogin(true);
    setShowGetOTP(true);
  };

  useEffect(() => {
    refPhone.current?.focus();
    refOTP.current?.focus();
  }, [showLogin, showGetOTP]);

  return (
    <WrapperSignIn>
      {showLogin ? (
        <ContentSignIn className="content">
          <h2>
            <FormattedMessage id="login.sign_in" />
          </h2>
          <WrapperItemSignIn>
            <ListItemScroll style={{ transform: `translateX(${-stepOTP * 50}%)` }}>
              {showGetOTP ? (
                <Item>
                  <Info>
                    <FormattedMessage id="login.note_phone_number" />
                  </Info>
                  <InputPhone
                    className="input-phone"
                    ref={refPhone}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target?.value)}
                  />
                  <Button onClick={onGetOTP}>
                    <FormattedMessage id="login.get_opt" />
                  </Button>
                </Item>
              ) : (
                <Item>
                  <Info>
                    <FormattedMessage id="login.nofity_get_otp" /> 0944 xxx xxx
                  </Info>
                  <PinInput ref={refOTP} value={otp} onChange={onSetOTP} />
                  <Button onClick={onSubmitOTP}>
                    <FormattedMessage id="login.sign_in" />
                  </Button>
                  <h5>
                    <FormattedMessage id="login.fail_otp" /> <span className="underline">Resend</span>
                  </h5>
                </Item>
              )}
            </ListItemScroll>
          </WrapperItemSignIn>
        </ContentSignIn>
      ) : (
        <ContentSingUp>
          <h2 style={{ marginLeft: 0 }}>
            <FormattedMessage id="login.sign_up" />
          </h2>
          <Info>
            <FormattedMessage id="login.note_create_account" />
          </Info>
          <GroupInput>
            <InputComponent className="input" title="login.first_name" placeHolder="Text" />
            <InputComponent className="input" title="login.last_name" placeHolder="Text" />
          </GroupInput>
          <GroupInput>
            <InputComponent className="input" title="login.email_address" placeHolder="Text" />
            <DropDown className="input" listData={genders} title="login.gender" />
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
          <Button
            onClick={() => {
              router.push("/");
            }}
          >
            Create account
          </Button>
        </ContentSingUp>
      )}
    </WrapperSignIn>
  );
};
SectionSignIn.defaultConfig = defaultConfig;
export default SectionSignIn;
