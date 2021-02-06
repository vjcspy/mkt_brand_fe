import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DevSecondaryButton } from "../../../styles/developmentStyle";
import { SectionHeader, SectionWrapper } from "../sectionConfig/styled";
import ColorComponent from "../developmentComponentType/colorComponent";
import { map } from "lodash";
import { ColorBlockWrapper, ColorThemeWrapper } from "./styled";
import { useSelector } from "react-redux";

const ThemeConfig = ({ title, type, path, popStage }) => {
  const config = useSelector((s) => s.getIn(path))?.toJS();
  return (
    <SectionWrapper>
      <SectionHeader>
        <DevSecondaryButton icon onClick={popStage}>
          <FontAwesomeIcon icon="arrow-left" />
        </DevSecondaryButton>
        <h4>{title}</h4>
      </SectionHeader>
      {type === "color"
        ? map(config, (colors, title) => (
            <ColorThemeWrapper key={title}>
              <label style={{ textTransform: "capitalize" }}>{title}</label>
              <ColorBlockWrapper>
                {map(colors, (color, key) => (
                  <ColorComponent key={key} config={{ value: color, title: key }} path={[...path, title, key]} />
                ))}
              </ColorBlockWrapper>
            </ColorThemeWrapper>
          ))
        : null}
    </SectionWrapper>
  );
};

export default ThemeConfig;
