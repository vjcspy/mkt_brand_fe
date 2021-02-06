import React, { useState, useEffect, useRef } from "react";
import Button from "../button";
import { WrapperConfirm, Tittle, InputGroup, InfoTitle, DropdownPhoneLocation, PhoneInput } from "./style";
import { connect } from "react-redux";
import IconTriangleDown from "../icons/iconTriangleDown";
import PinInput from "../pin-input";

export const PhoneOTP = ({ onSubmitPhone, onSubmitOTP, onResult }) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [otp, setOTP] = useState();
  const [status, setStatus] = useState("phone");
  const inputRefOTP = useRef(null);
  const inputRefPhone = useRef(null);

  const onSubmitData = () => {
    if (status === "phone") {
      // onSubmitPhone(phoneNumber);

      setStatus("otp");
    } else {
      // onSubmitOTP(otp);
      onResult(true);
    }
  };

  useEffect(() => {
    inputRefOTP.current?.focus();

    inputRefPhone.current?.focus();
  }, [status]);

  return (
    <WrapperConfirm>
      <Tittle>{status === "phone" ? "Đăng nhập" : "Nhập mã OTP"}</Tittle>
      <InfoTitle>
        {status === "phone"
          ? "Vui lòng nhập số điện thoại của bạn để nhận mã ưu đãi"
          : "Mã OTP vừa được gửi đến số điện thoại 0900 xxx xxx"}
      </InfoTitle>

      {status === "phone" ? (
        <InputGroup>
          <DropdownPhoneLocation>
            <p>+ 84</p> <IconTriangleDown />
          </DropdownPhoneLocation>
          <PhoneInput ref={inputRefPhone} type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </InputGroup>
      ) : (
        <>
          <PinInput type="text" isSecured={false} value={otp} onChange={(otp) => setOTP(otp)} ref={inputRefOTP} />
        </>
      )}

      <Button onClick={onSubmitData}> {status === "phone" ? "Nhận OTP" : "Xác nhận"}</Button>
    </WrapperConfirm>
  );
};

export default PhoneOTP;
