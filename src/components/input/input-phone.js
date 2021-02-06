import React, { forwardRef } from "react";
import { InputTag, InputPhoneWrapper } from "./style";
import PhoneLocation from "./phone-loaction";
const InputPhone = forwardRef(({ value, onChange, ...rest }, ref) => {
  const onSelectPhoneLocation = () => {};
  return (
    <InputPhoneWrapper {...rest}>
      <PhoneLocation onSelectLocation={onSelectPhoneLocation} />
      <InputTag ref={ref} type="number" value={value} onChange={onChange} />
    </InputPhoneWrapper>
  );
});

export default InputPhone;
