import React, { useState } from "react";
import IconMapMarker from "../icons/iconMapMarker";
import IconTriangleDown from "../icons/iconTriangleDown";
import { WrapperSelectLocation, TitleLocation, ListLocation, Marker } from "./style";
import { useSelector, useDispatch } from "react-redux";
import IconTicker from "../icons/iconTicker";
import { SET_LOCATION, SET_PROVINCE_SELECTED } from "../../constants";

export const dummyLocation = [
  { id: "hn", title: "Ha Noi", titleVN: "Hà Nội" },
  { id: "hcm", title: "Ho Chi Minh", titleVN: "Hồ Chí Minh" },
];

const SelectLocation = ({ ...rest }) => {
  const dispatch = useDispatch()
  const listProvince = useSelector((state) => state.get("listProvince")) ?? []
  const provinceSelected = useSelector((state) => state.get("provinceSelected"))?.toJS()
  const [showList, setShowList] = useState(false);
  const onSelect = (item) => {
    setShowList(false)
    dispatch({ type: SET_PROVINCE_SELECTED , value:item})
  }
  return (
    <WrapperSelectLocation {...rest}>
      {showList && <Marker onClick={() => setShowList(false)} />}
      <TitleLocation onClick={() => setShowList(true)}>
        <IconMapMarker />
        <p>{provinceSelected?.name}</p>
        <IconTriangleDown className="icon-down" />
      </TitleLocation>
      {showList && (
        <ListLocation>
          {listProvince?.map((item, index) => (
            <div key={index} onClick={() =>onSelect(item) }>
              <p>{item.name}</p>
              {item.id === provinceSelected?.id && <IconTicker />}
            </div>
          ))}
        </ListLocation>
      )}
    </WrapperSelectLocation>
  );
};

export default SelectLocation;
