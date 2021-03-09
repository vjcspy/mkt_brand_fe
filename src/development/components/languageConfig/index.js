import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { DevSecondaryButton } from "../../../styles/developmentStyle";
import { SectionHeader, SectionWrapper } from "../sectionConfig/styled";
import { SectionItem, SectionsBlock, SectionThumbnailWrapper } from "../sectionsConfig/styled";
import English from "./english";
import { WrapperLanguageConfig } from "./style";
import Vietnamese from "./vietnamese";

const LanguageConfig = ({ path, popStage, putStage }) => {
  return (
    <SectionWrapper className="section-language">
      <WrapperLanguageConfig className="wrapper-language">
        <SectionHeader>
          <DevSecondaryButton icon onClick={popStage}>
            <FontAwesomeIcon icon="arrow-left" />
          </DevSecondaryButton>
          <h4> Language setting</h4>
        </SectionHeader>

        <SectionsBlock>
          <SectionItem
            onClick={() =>
              putStage({
                props: { path: ["modifiedConfig", "translation", "vi"] },
                Component: Vietnamese,
              })
            }
          >
            <SectionThumbnailWrapper>
              <FontAwesomeIcon icon={["far", "plus-square"]} />
            </SectionThumbnailWrapper>
            Vietnamese
          </SectionItem>
          <SectionItem
            onClick={() =>
              putStage({
                props: { path: ["modifiedConfig", "translation", "en"] },
                Component: English,
              })
            }
          >
            <SectionThumbnailWrapper>
              <FontAwesomeIcon icon={["far", "plus-square"]} />
            </SectionThumbnailWrapper>
            English
          </SectionItem>
        </SectionsBlock>
      </WrapperLanguageConfig>
    </SectionWrapper>
  );
};

export default LanguageConfig;
