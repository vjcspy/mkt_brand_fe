import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { DropDownWrapper, DropDownContent, DropDownItem, DropDownButton } from "./styled";

const Dropdown = ({ items }) => {
  const [show, setShow] = useState();

  return (
    <DropDownWrapper>
      {show && (
        <DropDownContent>
          {items.map((item, index) => (
            <DropDownItem
              key={index}
              disabled={item.disabled}
              onClick={() => {
                setShow(false);
                item.onClick?.();
              }}
            >
              {item.icon && <FontAwesomeIcon icon={item.icon} />}
              {item.label}
            </DropDownItem>
          ))}
        </DropDownContent>
      )}
      <DropDownButton icon onClick={() => setShow(true)} onBlur={() => setTimeout(() => setShow(false), 100)}>
        <FontAwesomeIcon icon="ellipsis-v" />
      </DropDownButton>
    </DropDownWrapper>
  );
};

export default Dropdown;
