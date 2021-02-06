import React from "react";
import { WrapperCheckbox } from "./style";
const Radio = ({ isCheck, children, ...rest }) => {
  return (
    <WrapperCheckbox checked={isCheck} {...rest}>
      {children}
    </WrapperCheckbox>
  );
};

export default Radio;
