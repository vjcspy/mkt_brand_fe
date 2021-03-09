import React from "react";
import { InputWrapper, Title, InputTag } from "./style";
import { FormattedMessage } from "react-intl";

const InputComponent = ({ title, name, textAlign = "left", isValid = true, value = "", onChange, placeHolder, ...rest }) => {
  return (
    <InputWrapper {...rest}>
      <InputTag
        name={name ? name : ""}
        textAlign={textAlign}
        isValid={isValid}
        id="idInput"
        value={value}
        onChange={onChange}
        placeHolder={placeHolder}
        required
      />
      {title && (
        <Title htmlFor="idInput">
          <FormattedMessage id={title} />
        </Title>
      )}
    </InputWrapper>
  );
};

export default InputComponent;
