import React, { useState, useEffect, useRef } from "react";
import Button from "../button";
import { WrapperConfirm, Tittle, InputGroup, InfoTitle, DropdownPhoneLocation, PhoneInput } from "./style";
import { connect } from "react-redux";
import IconTriangleDown from "../icons/iconTriangleDown";
import PinInput from "../pin-input";
import { FormattedMessage } from "react-intl";

export const PhoneOTP = ({ onSubmitPhone, onSubmitOTP, onResult }) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [otp, setOTP] = useState();
  const [status, setStatus] = useState("phone");
  const inputRefOTP = useRef(null);
  const inputRefPhone = useRef(null);

  const onSubmitData = () => {
    onResult(true);
  };

  const onGetOTP = () => {
    setStatus("otp");
  };

  useEffect(() => {
    inputRefOTP.current?.focus();

    inputRefPhone.current?.focus();
  }, [status]);

  return (
    <WrapperConfirm>
      <Tittle>{status === "phone" ? <FormattedMessage id="phoneOTP.sign_in" /> : <FormattedMessage id="phoneOTP.enter_otp_code" />}</Tittle>

      <InfoTitle>
        {status === "phone" ? <FormattedMessage id="phoneOTP.notify_enter_phone" /> : <FormattedMessage id="phoneOTP.notify_send_otp" />}
      </InfoTitle>

      {status === "phone" ? (
        <>
          <InputGroup>
            {/* <DropdownPhoneLocation>
              <p>+ 84</p> <IconTriangleDown />
            </DropdownPhoneLocation> */}

            <PhoneInput
              ref={inputRefPhone}
              placeholder="Ex: 0123456789"
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </InputGroup>
          <Button onClick={onGetOTP}>
            <FormattedMessage id="phoneOTP.get_otp" />
          </Button>
        </>
      ) : (
        <>
          <PinInput type="text" isSecured={false} value={otp} onChange={(otp) => setOTP(otp)} ref={inputRefOTP} />
          <Button onClick={onSubmitData}>
            <FormattedMessage id="phoneOTP.confirm" />
          </Button>
        </>
      )}
    </WrapperConfirm>
  );
};

export default PhoneOTP;
