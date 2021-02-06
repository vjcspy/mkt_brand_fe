import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { DevSecondaryButton } from "../../../styles/developmentStyle";
import { SectionHeader, SectionWrapper } from "../sectionConfig/styled";
import ThemeConfig from "../themeConfig";
import { SettingItem, SettingItemWrapper, ThemeItemTitle } from "./styled";

const ThemesConfig = ({ popStage, putStage }) => {
  return (
    <SectionWrapper>
      <SectionHeader>
        <DevSecondaryButton icon onClick={popStage}>
          <FontAwesomeIcon icon="arrow-left" />
        </DevSecondaryButton>
        <h4>Theme Settings</h4>
      </SectionHeader>
      <SettingItemWrapper>
        <SettingItem
          onClick={() => {
            putStage({
              props: {
                type: "color",
                title: "Colors",
                path: ["modifiedConfig", "theme", "color"],
              },
              Component: ThemeConfig,
            });
          }}
        >
          <FontAwesomeIcon icon="palette" />
          <ThemeItemTitle>Colors</ThemeItemTitle>
          <FontAwesomeIcon icon="chevron-right" />
        </SettingItem>
      </SettingItemWrapper>
    </SectionWrapper>
  );
};

export default ThemesConfig;
