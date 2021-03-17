import React, { useState } from "react";
import { WrapperListCheckBox, WrapperTitle, WrapperListOption, ItemSelected, Checkbox } from "./styled";
const GroupCheckBoxComponent = ({ listOption, title, onSelect }) => {
  return (
    <WrapperListCheckBox>
      <WrapperTitle>{title}</WrapperTitle>
      <WrapperListOption>
        {listOption?.map((item, index) => (
          <ItemSelected key={index}>
            <Checkbox checked={item.checked} onClick={() => onSelect(item)} />
            <p>{item.title}</p>
          </ItemSelected>
        ))}
      </WrapperListOption>
    </WrapperListCheckBox>
  );
};

export default GroupCheckBoxComponent;
