import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { PUT_CONFIG, PUT_PUBLIC_CONFIG } from "../../../constants";
import { DevPrimaryButton, DevSecondaryA } from "../../../styles/developmentStyle";
import DropDown from "./dropdown";
import ImageMedia from "../../components/imageMedia";
import Profile from "./profile";
import { HeaderWrapper, LeftWrapper, LogoWrapper, RightWrapper } from "./styled";
import useFromJS from "../../../hooks/useFromJS";

const DevelopmentHeader = () => {
  const dispatch = useDispatch();
  const modifiedConfig = useFromJS(["modifiedConfig"]);
  const site = useFromJS(["site"]);
  const putConfig = useCallback((config) => dispatch({ type: PUT_CONFIG, value: config }), []);
  const putPublicConfig = useCallback(() => dispatch({ type: PUT_PUBLIC_CONFIG }), []);

  return (
    <HeaderWrapper>
      <LeftWrapper>
        <LogoWrapper>
          <ImageMedia media={site?.logo} formats="thumbnail" />
        </LogoWrapper>
        <DropDown />
      </LeftWrapper>
      <RightWrapper>
        <DevPrimaryButton onClick={putPublicConfig} style={{ background: "#27d427" }}>
          Public
        </DevPrimaryButton>
        <DevSecondaryA href={"/preview"} target="_blank" rel="noopener noreferrer">
          Preview
        </DevSecondaryA>
        <DevPrimaryButton
          onClick={() => {
            putConfig(modifiedConfig);
          }}
        >
          Save
        </DevPrimaryButton>
        <Profile site={site} />
      </RightWrapper>
    </HeaderWrapper>
  );
};

export default DevelopmentHeader;
