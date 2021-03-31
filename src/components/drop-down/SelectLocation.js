import React, { useState } from "react";
import IconMapMarker from "../icons/iconMapMarker";
import IconTriangleDown from "../icons/iconTriangleDown";
import { WrapperSelectLocation, TitleLocation, ListLocation, Marker } from "./style";
import { useSelector, useDispatch } from "react-redux";
import IconTicker from "../icons/iconTicker";

const SelectLocation = ({ location, onChangeLocation, ...rest }) => {
  const listProvince = useSelector((state) => state.get("listProvince")) ?? [];
  const [showList, setShowList] = useState(false);
  const onSelect = (item) => {
    setShowList(false);
    onChangeLocation({ ...item, default: false });
  };
  return (
    <WrapperSelectLocation {...rest}>
      {showList && <Marker onClick={() => setShowList(false)} />}
      <TitleLocation onClick={() => setShowList(true)}>
        <IconMapMarker />
        <p>{location?.name}</p>
        <IconTriangleDown className="icon-down" />
      </TitleLocation>
      {showList && (
        <ListLocation>
          {listProvince?.map((item, index) => (
            <div key={index} onClick={() => onSelect(item)}>
              <p>{item.name}</p>
              {item.id === location?.id && <IconTicker />}
            </div>
          ))}
        </ListLocation>
      )}
    </WrapperSelectLocation>
  );
};

export default SelectLocation;
