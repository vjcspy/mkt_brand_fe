import React, { useState } from "react";
import IconTriangleDown from "../icons/iconTriangleDown";
import { WrapperSelectLocation, TitleLocation, ListLocation, Marker } from "./style";
import { useSelector, useDispatch } from "react-redux";
import IconTicker from "../icons/iconTicker";
import { SET_LOCALE } from "../../constants";

const languages = [
  {
    id: "vi",
    title: "Vietnamese",
    titleVN: "Tiếng việt",
    flag: "/images/ic/ic_vietnam_flag.svg",
  },
  {
    id: "en",
    title: "English",
    titleVN: "Tiếng anh",
    flag: "/images/ic/ic_usa_flag.svg",
  },
];

const SelectLanguage = ({ ...rest }) => {
  const locale = useSelector((state) => state.getIn(["locale"]));
  const itemLanguage = languages.find((item) => item.id === locale);
  const [showList, setShowList] = useState(false);
  const dispatch = useDispatch();
  const onSelect = (item) => {
    setShowList(false);
    dispatch({ type: SET_LOCALE, value: item.id });
  };
  return (
    <WrapperSelectLocation {...rest}>
      {showList && <Marker onClick={() => setShowList(false)} />}
      <TitleLocation onClick={() => setShowList(true)}>
        <img width={32} height={17} src={itemLanguage.flag} />
        <p>{locale === "en" ? itemLanguage.title : itemLanguage.titleVN}</p>
        <IconTriangleDown className="icon-down" />
      </TitleLocation>
      {showList && (
        <ListLocation>
          {languages.map((item, index) => (
            <div key={index} onClick={() => onSelect(item)}>
              <p>{locale === "en" ? item.title : item.titleVN}</p>
              {item.id === itemLanguage.id && <IconTicker />}
            </div>
          ))}
        </ListLocation>
      )}
    </WrapperSelectLocation>
  );
};

export default SelectLanguage;
