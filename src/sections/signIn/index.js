import React, { useState, useRef, useEffect } from "react";
import Button from "../../components/button";
import { Checkbox } from "../../components/checkbox";
import { Input } from "../../components/input-style";
import PinInput from "../../components/pin-input";
import InputComponent from "../../components/input";
import DropDown from "../../components/input/drop-down";
import InputPhone from "../../components/input/input-phone";
import {
  WrapperSignIn,
  Content,
  WrapperScroll,
  Item,
  WrapperContentScroll,
  Info,
  GroupInput,
  ContentSignIn,
  WrapperItemSignIn,
  ListItemScroll,
  ContentSingUp,
} from "./style";
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
          <h2>Sign in</h2>
          <WrapperItemSignIn>
            <ListItemScroll style={{ transform: `translateX(${-stepOTP * 50}%)` }}>
              {showGetOTP ? (
                <Item>
                  <Info>Enter your phone number and we'll send you OTP</Info>
                  <InputPhone
                    className="input-phone"
                    ref={refPhone}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target?.value)}
                  />
                  <Button onClick={onGetOTP}>Receive OTP</Button>
                </Item>
              ) : (
                <Item>
                  <Info>We sent OTP to your phone number 0944 xxx xxx</Info>
                  <PinInput ref={refOTP} value={otp} onChange={onSetOTP} />
                  <Button onClick={onSubmitOTP}>Sign in</Button>
                  <h5>
                    Did not receive the OTP? <span className="underline">Resend</span>
                  </h5>
                </Item>
              )}
            </ListItemScroll>
          </WrapperItemSignIn>
        </ContentSignIn>
      ) : (
        <ContentSingUp>
          <h2 style={{ marginLeft: 0 }}>Sign up</h2>
          <Info>Please fill in the form below to create new account</Info>
          <GroupInput>
            <InputComponent className="input" title="First name" placeHolder="Text" />
            <InputComponent className="input" title="Last name" placeHolder="Text" />
          </GroupInput>
          <GroupInput>
            <InputComponent className="input" title="Email address" placeHolder="Text" />
            <DropDown listData={genders} className="input dropdown" title="Gender" />
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
