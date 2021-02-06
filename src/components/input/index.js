import React from "react";
import { InputWrapper, Title, InputTag } from "./style";
const InputComponent = ({ title, value, onChange, placeHolder, ...rest }) => {
  console.log(title);
  return (
    <InputWrapper {...rest}>
      <InputTag id="idInput" value={value} onChange={onChange} placeHolder={placeHolder} required />
      {title && <Title for="idInput">{title}</Title>}
    </InputWrapper>
  );
};

export default InputComponent;
