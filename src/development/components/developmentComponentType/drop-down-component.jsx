import React, { useState } from "react";
import IconTicker from "../../../components/icons/iconTicker";
import IconTriangleDown from "../../../components/icons/iconTriangleDown";
import { WrapperDropDown, TitleDropDown, Marker, ListOption } from "./styled";
const DropDownComponent = ({ tittle, listOption, onSelect, optionSelected }) => {
  const [showList, setShowList] = useState(false);

  return (
    <WrapperDropDown>
      <div>{tittle}</div>
      <TitleDropDown onClick={() => setShowList(true)}>
        <p>{optionSelected.title}</p>
        <IconTriangleDown color="#737373" className="icon-down" />
      </TitleDropDown>
      {showList && (
        <>
          <Marker onClick={() => setShowList(false)} />
          <ListOption>
            {listOption?.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  onSelect(item);
                  setShowList(false);
                }}
              >
                <p>{item.title}</p>
                {item.id === optionSelected.id && <IconTicker />}
              </div>
            ))}
          </ListOption>
        </>
      )}
    </WrapperDropDown>
  );
};

export default DropDownComponent;
