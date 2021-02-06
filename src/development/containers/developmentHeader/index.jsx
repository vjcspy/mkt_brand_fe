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

  const link = (() => {
    let link = "/preview";
    if (process.browser) {
      let regex = new RegExp(`^/${site?.site_code}`);
      return regex.test(location.pathname) ? `/${site?.site_code}/preview` : "/preview";
    }
    return link;
  })();

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
        <DevSecondaryA href={link} target="_blank" rel="noopener noreferrer">
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

// const mapStateToProps = (s) => ({ site: s.get("site")?.toJS(), modifiedConfig: s.get("modifiedConfig")?.toJS() });

// const mapDispatchToProps = (dispatch) => ({
//   putConfig: (config) => dispatch({ type: PUT_CONFIG, value: config }),
//   putPublicConfig: () => dispatch({ type: PUT_PUBLIC_CONFIG }),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(DevelopmentHeader);
export default DevelopmentHeader;
