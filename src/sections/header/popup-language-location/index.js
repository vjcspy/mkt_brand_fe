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
import Button from "../../../components/button";
import { useSelector, useDispatch } from "react-redux";
import { RadioButton } from "../../../styles";
import { FormattedMessage } from "react-intl";
import { SET_LOCALE, SHOW_LANGUAGE_LOCATION } from "../../../constants";
import SelectLocation from "../../../components/drop-down/SelectLocation";
const PopupLanguageLocation = () => {
  const locale = useSelector((state) => state.getIn(["locale"]));
  const [language, setCheck] = useState(locale);

  const showLanguageLocation = useSelector((state) => state.getIn(["showLanguageLocation"]));
  const dispatch = useDispatch();
  const setPopupLanguageLocation = useCallback((value) => dispatch({ type: SHOW_LANGUAGE_LOCATION, value }), []);
  const updateLanguage = useCallback((value) => dispatch({ type: SET_LOCALE, value }), []);

  const onDone = () => {
    setPopupLanguageLocation(false);
    updateLanguage(language);
  };

  const onClosePopup = () => {
    setPopupLanguageLocation(false);
  };

  return showLanguageLocation ? (
    <Background>
      <MarkerWrapper className="showMarker" onClick={onClosePopup} />
      <PopupContent className="showContent">
        <HeaderPopup>
          <h3>
            <FormattedMessage id="header.location_and_language" />
          </h3>
          <IconClose onClick={onClosePopup} />
        </HeaderPopup>
        <ContentPopup>
          <TitleGroup>
            <FormattedMessage id="header.select_location" />:
          </TitleGroup>
          <GroupLocation>
            <SelectLocation className="popup-language-location-in-home" />
          </GroupLocation>
          <TitleGroup>
            <FormattedMessage id="header.select_language" />:
          </TitleGroup>
          <GroupLanguage>
            <RadioButton checked={language === "en"} onClick={() => setCheck("en")}>
              <FormattedMessage id="header.english" />
            </RadioButton>
            <RadioButton checked={language === "vi"} onClick={() => setCheck("vi")}>
              <FormattedMessage id="header.vietnamese" />
            </RadioButton>
          </GroupLanguage>
        </ContentPopup>
        <GroupButton>
          <Button onClick={onDone} status="primary">
            <FormattedMessage id="header.done" />
          </Button>
        </GroupButton>
      </PopupContent>
    </Background>
  ) : null;
};

export default PopupLanguageLocation;
