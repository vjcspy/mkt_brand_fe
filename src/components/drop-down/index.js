import React, { useState } from "react";
import { WrapperSelectLocation } from "./style";
const DropDown = ({ listData, itemSelected, iconRight }) => {
  return (
    <WrapperSelectLocation>
      <TitleLocation>{iconRight}</TitleLocation>
    </WrapperSelectLocation>
  );
};

export default DropDown;
