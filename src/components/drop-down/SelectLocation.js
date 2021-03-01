import React, { useState } from "react";
import IconMapMarker from "../icons/iconMapMarker";
import IconTriangleDown from "../icons/iconTriangleDown";
import { WrapperSelectLocation, TitleLocation, ListLocation, Marker } from "./style";
import { useSelector, useDispatch } from "react-redux";
import IconTicker from "../icons/iconTicker";
import { SET_LOCATION } from "../../constants";

export const dummyLocation = [
  { id: "hn", title: "Ha Noi", titleVN: "Hà Nội" },
  { id: "hcm", title: "Ho Chi Minh", titleVN: "Hồ Chí Minh" },
];

const SelectLocation = ({ ...rest }) => {
  const locale = useSelector((state) => state.getIn(["locale"]));
  const location = useSelector((state) => state.getIn(["location"]));
  const itemLocation = dummyLocation.find((item) => item.id === location);
  const [showList, setShowList] = useState(false);
  const dispatch = useDispatch();

  const onSelect = (item) => {
    setShowList(false);
    dispatch({ type: SET_LOCATION, value: item.id });
  };

  return (
    <WrapperSelectLocation {...rest}>
      {showList && <Marker onClick={() => setShowList(false)} />}
      <TitleLocation onClick={() => setShowList(true)}>
        <IconMapMarker />
        <p>{locale === "en" ? itemLocation?.title : itemLocation?.titleVN}</p>
        <IconTriangleDown className="icon-down" />
      </TitleLocation>
      {showList && (
        <ListLocation>
          {dummyLocation.map((item, index) => (
            <div key={index} onClick={() => onSelect(item)}>
              <p>{locale === "en" ? item?.title : item?.titleVN}</p>
              {item.id === itemLocation.id && <IconTicker />}
            </div>
          ))}
        </ListLocation>
      )}
    </WrapperSelectLocation>
  );
};

export default SelectLocation;
