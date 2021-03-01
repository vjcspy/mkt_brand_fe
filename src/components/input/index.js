import React from "react";
import { InputWrapper, Title, InputTag } from "./style";
import { FormattedMessage } from "react-intl";

const InputComponent = ({ title, value, onChange, placeHolder, ...rest }) => {
  return (
    <InputWrapper {...rest}>
      <InputTag id="idInput" value={value} onChange={onChange} placeHolder={placeHolder} required />
      {title && (
        <Title htmlFor="idInput">
          <FormattedMessage id={title} />
        </Title>
      )}
    </InputWrapper>
  );
};

export default InputComponent;
