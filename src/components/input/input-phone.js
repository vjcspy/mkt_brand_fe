import React, { forwardRef } from "react";
import { InputTag, InputPhoneWrapper } from "./style";
import PhoneLocation from "./phone-loaction";
const InputPhone = forwardRef(({ value, onChange, ...rest }, ref) => {
  const onSelectPhoneLocation = () => {};
  return (
    <InputPhoneWrapper {...rest}>
      <InputTag ref={ref} type="number" placeholder="Ex: 0123456789" value={value} onChange={onChange} />
    </InputPhoneWrapper>
  );
});

export default InputPhone;
