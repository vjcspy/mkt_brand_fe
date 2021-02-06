import React, { useState, useCallback } from "react";
import {
  HeaderPopup,
  ContentPopup,
  TitleGroup,
  GroupLocation,
  GroupLanguage,
  GroupButton,
  Background,
  MarkerWrapper,
  PopupContent,
} from "./style";
import IconClose from "../../../components/icons/iconsClose";
import IconTriangleDown from "../../../components/icons/iconTriangleDown";
import IconMapMarker from "../../../components/icons/iconMapMarker";
import Button from "../../../components/button";
import { useSelector, useDispatch } from "react-redux";
import useFromJS from "../../../hooks/useFromJS";
import { RadioButton } from "../../../styles";

const PopupLanguageLocation = () => {
  const [check, setCheck] = useState("en");
  // const profile = useFromJS(["profile"]);
  const showLanguageLocation = useSelector((state) => state.getIn(["showLanguageLocation"]));
  const dispatch = useDispatch();
  const setPopupLanguageLocation = useCallback((value) => dispatch({ type: "SHOW_LANGUAGE_LOCATION", value }), []);
  return showLanguageLocation ? (
    <Background>
      <MarkerWrapper className="showMarker" onClick={() => setPopupLanguageLocation(false)} />
      <PopupContent className="showContent">
        <HeaderPopup>
          <h3>Location & Language</h3>
          <IconClose onClick={() => setPopupLanguageLocation(false)} />
        </HeaderPopup>
        <ContentPopup>
          <TitleGroup>Choose your location:</TitleGroup>
          <GroupLocation>
            <div>
              <IconMapMarker width={16} height={16} />
              <h5>Ha Noi</h5>
              <IconTriangleDown />
            </div>
          </GroupLocation>
          <TitleGroup>Choose your language:</TitleGroup>
          <GroupLanguage>
            <RadioButton checked={check === "en"} onClick={() => setCheck("en")}>
              English
            </RadioButton>
            <RadioButton checked={check === "vn"} onClick={() => setCheck("vn")}>
              Vietnamese
            </RadioButton>
          </GroupLanguage>
        </ContentPopup>
        <GroupButton>
          <Button status="primary">Done</Button>
        </GroupButton>
      </PopupContent>
    </Background>
  ) : null;
};

export default PopupLanguageLocation;
