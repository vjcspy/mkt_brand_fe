import React, { useState } from "react";
import { DropdownWrapper, TitleDopDown, ContentDropDown, ListData, ItemSelect, MarkerDropdown } from "./style";
import IconTriangleDown from "../icons/iconTriangleDown";
import IconTick from "../icons/iconTick";
const DropDown = ({ title, listData, ...rest }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [itemSelected, setItemSelected] = useState(listData[0]);
  const onSelectItem = (value) => {
    setItemSelected(value);
    setOpenDropdown(false);
  };
  return (
    <DropdownWrapper {...rest}>
      {openDropdown && <MarkerDropdown onClick={() => setOpenDropdown(false)} />}
      <TitleDopDown>{title}</TitleDopDown>
      <ContentDropDown onClick={() => setOpenDropdown(true)}>
        <p>{itemSelected}</p>
        <IconTriangleDown />
      </ContentDropDown>

      {openDropdown && (
        <ListData>
          {listData?.map((item, key) => (
            <ItemSelect className={`${item === itemSelected ? "active" : ""}`} key={key} onClick={() => onSelectItem(item)}>
              <span>{item}</span>
              <IconTick />
            </ItemSelect>
          ))}
        </ListData>
      )}
    </DropdownWrapper>
  );
};

export default DropDown;
