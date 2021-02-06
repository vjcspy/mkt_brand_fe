import React, { useState } from "react";
import IconTriangleDown from "../icons/iconTriangleDown";

const dataPhoneLocation = ["+ 84", "+ 1", "+ 4", "+ 222"];
import { WrapperPhoneLocation, ListLocation, LocationSelected } from "./style";
const PhoneLocation = ({}) => {
  const [itemSelect, setItemSelect] = useState(dataPhoneLocation[0]);
  const [show, setShow] = useState(false);

  const onSelectItem = (value) => {
    setItemSelect(value);
    setShow(false);
  };
  return (
    <WrapperPhoneLocation>
      <LocationSelected onClick={() => setShow(true)}>
        <p>{itemSelect}</p>
        <IconTriangleDown />
      </LocationSelected>
      {show && (
        <ListLocation>
          {dataPhoneLocation.map((item) => (
            <p onClick={() => onSelectItem(item)}>{item}</p>
          ))}
        </ListLocation>
      )}
    </WrapperPhoneLocation>
  );
};

export default PhoneLocation;
