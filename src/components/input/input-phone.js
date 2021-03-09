import React, { forwardRef, useState, useEffect } from "react";
import { InputTag, InputPhoneWrapper, WrapperError } from "./style";
import PhoneLocation from "./phone-loaction";
import { FormattedMessage } from "react-intl";
const InputPhone = forwardRef(({ value, onChange, ...rest }, ref) => {
  const [isValid, setIsValid] = useState(true);
  const onCheck = () => {
    if (value?.length !== 10) {
      setIsValid(false);
    }
  };
  const onChangeValue = (e) => {
    const value = e.target.value;
    if (value && value[0] !== "0") {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    onChange(value);
  };
  useEffect(() => {
    ref?.current?.addEventListener("mousewheel", function (evt) {
      evt.preventDefault();
    });
    return () => {
      ref?.current?.removeEventListener("mousewheel", function () {
        return null;
      });
    };
  });

  return (
    <InputPhoneWrapper {...rest}>
      <InputTag
        isValid={isValid}
        textAlign="center"
        ref={ref}
        type="number"
        placeholder="Ex: 0123456789"
        value={value}
        onBlur={onCheck}
        onChange={onChangeValue}
      />
      {!isValid && (
        <WrapperError>
          <img width={24} height={24} src="/images/icon_error_input.svg" />
          <span>
            <FormattedMessage id="login.fail_phone_number" />
          </span>
        </WrapperError>
      )}
    </InputPhoneWrapper>
  );
});

export default InputPhone;
