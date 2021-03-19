import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PUT_CONFIG, PUT_PUBLIC_CONFIG, SET_PREVIEW_MODE } from "../../../constants";
import { DevPrimaryButton, DevSecondaryA } from "../../../styles/developmentStyle";
import DropDown from "./dropdown";
import ImageMedia from "../../components/imageMedia";
import Profile from "./profile";
import { HeaderWrapper, LeftWrapper, LogoWrapper, RightWrapper, ButtonClose } from "./styled";
import useFromJS from "../../../hooks/useFromJS";
import Button from "../../../components/button";
import IconTriangleDown from "../../../components/icons/iconTriangleDown";

const DevelopmentHeader = ({ viewPreview }) => {
  const dispatch = useDispatch();
  const modifiedConfig = useFromJS(["modifiedConfig"]);
  const site = useFromJS(["site"]);
  const putConfig = useCallback((config) => dispatch({ type: PUT_CONFIG, value: config }), []);
  const putPublicConfig = useCallback(() => dispatch({ type: PUT_PUBLIC_CONFIG }), []);
  const onPreviewMode = (value) => dispatch({ type: SET_PREVIEW_MODE, value });

  return (
    <>
      {viewPreview && (
        <ButtonClose onClick={() => onPreviewMode(false)} className="btn-close">
          <IconTriangleDown />
        </ButtonClose>
      )}

      <HeaderWrapper className={viewPreview ? "viewPreview" : ""}>
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
          <DevSecondaryA
            // href={"/preview"}
            // target="_blank"
            // rel="noopener noreferrer"
            onClick={() => onPreviewMode(true)}
          >
            {viewPreview ? "Close Preview" : "Preview"}
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
    </>
  );
};

export default DevelopmentHeader;
