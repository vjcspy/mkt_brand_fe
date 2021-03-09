import React, { useState } from "react";
import { DropdownWrapper, TitleDopDown, ContentDropDown, ListData, ItemSelect, MarkerDropdown } from "./style";
import IconTriangleDown from "../icons/iconTriangleDown";
import IconTick from "../icons/iconTick";
import { FormattedMessage } from "react-intl";

const DropDown = ({ title, onChangeGender, value, listData, ...rest }) => {
  value = value > 2 ? 2 : value;
  const [openDropdown, setOpenDropdown] = useState(false);
  const [itemSelected, setItemSelected] = useState(value ?? 0);
  const onSelectItem = (item) => {
    setItemSelected(item);
    onChangeGender && onChangeGender(item);
    setOpenDropdown(false);
  };
  return (
    <DropdownWrapper {...rest}>
      {openDropdown && <MarkerDropdown onClick={() => setOpenDropdown(false)} />}
      <TitleDopDown>
        <FormattedMessage id={title} />
      </TitleDopDown>
      <ContentDropDown onClick={() => setOpenDropdown(true)}>
        <p>
          <FormattedMessage id={`login.${listData[itemSelected]?.title}`} />
        </p>
        <IconTriangleDown />
      </ContentDropDown>

      {openDropdown && (
        <ListData>
          {listData?.map((item, key) => (
            <ItemSelect className={`${item.value === itemSelected ? "active" : ""}`} key={key} onClick={() => onSelectItem(item.value)}>
              <FormattedMessage id={`login.${item.title}`} />
              <IconTick />
            </ItemSelect>
          ))}
        </ListData>
      )}
    </DropdownWrapper>
  );
};

export default DropDown;
