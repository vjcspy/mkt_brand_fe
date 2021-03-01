import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { DropDownWrapper, DropDownContent, DropDownItem, DropDownButton, DropDownButtonLabel } from "./styled";

const Dropdown = ({ items, current, icon }) => {
  const [show, setShow] = useState();

  return (
    <DropDownWrapper>
      {show && (
        <DropDownContent icon={icon}>
          {items.map((item, index) => (
            <DropDownItem
              key={index}
              disabled={item.disabled}
              onClick={() => {
                setShow(false);
                item.onClick?.(item);
              }}
            >
              {item.icon && <FontAwesomeIcon icon={item.icon} />}
              {item.label}
            </DropDownItem>
          ))}
        </DropDownContent>
      )}
      <DropDownButton icon={icon} onClick={() => setShow(true)} onBlur={() => setTimeout(() => setShow(false), 100)}>
        {icon ? (
          <FontAwesomeIcon icon="ellipsis-v" />
        ) : (
          <>
            <DropDownButtonLabel>{current}</DropDownButtonLabel>
            <FontAwesomeIcon className="caret" icon={"caret-down"} />
          </>
        )}
      </DropDownButton>
    </DropDownWrapper>
  );
};

export default Dropdown;
