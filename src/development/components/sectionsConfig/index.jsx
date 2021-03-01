import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_SECTION } from "../../../constants";
import AddSectionDialog from "../../containers/developmentDialog/addSectionDialog";
import SectionThumbnail from "./sectionThumbnail";
import { SectionItem, SectionsBlock, SectionsWrapper, SectionThumbnailWrapper, SectionTitleWrapper } from "./styled";
import { generate } from "shortid-36";
import { SettingItem, SettingItemWrapper, ThemeItemTitle } from "../themesConfig/styled";
import { map } from "lodash";
import SectionConfig from "../sectionConfig";
import ThemesConfig from "../themesConfig";
import MenusConfig from "../menusConfig";
import useFromJS from "../../../hooks/useFromJS";
import LanguageConfig from "../languageConfig";

const SectionsConfig = ({ putStage }) => {
  /// selector
  const pageName = useSelector((s) => s.get("pageName"));
  const header = useFromJS(["modifiedConfig", "header"]);
  const sections = useFromJS(["modifiedConfig", "pages", pageName, "sections"]);
  /// dispatch
  const dispatch = useDispatch();
  const addSection = (value) => dispatch({ type: ADD_SECTION, value });
  /// State
  const [addSectionDialog, setAddSection] = useState({});

  return (
    <SectionsWrapper>
      <SectionsBlock>
        <SectionItem
          onClick={() =>
            putStage({
              props: { path: ["modifiedConfig", "header"] },
              Component: SectionConfig,
            })
          }
        >
          <SectionThumbnail components={header?.components} />
          {header?.title}
        </SectionItem>
      </SectionsBlock>

      <SectionsBlock>
        {map(sections, (section, index) => (
          <SectionItem
            key={section.code}
            onClick={() => {
              putStage({
                props: { path: ["modifiedConfig", "pages", pageName, "sections", index] },
                Component: SectionConfig,
              });
            }}
          >
            <SectionThumbnail components={section.components} />
            <SectionTitleWrapper>{section.title}</SectionTitleWrapper>
          </SectionItem>
        ))}
        <SectionItem add onClick={() => setAddSection({ show: true })}>
          <SectionThumbnailWrapper>
            <FontAwesomeIcon icon={["far", "plus-square"]} />
          </SectionThumbnailWrapper>
          Add Section
        </SectionItem>
      </SectionsBlock>

      <SettingItemWrapper>
        <SettingItem
          onClick={() => {
            putStage({
              props: { path: ["modifiedConfig", "theme"] },
              Component: ThemesConfig,
            });
          }}
        >
          <FontAwesomeIcon icon="cog" />
          <ThemeItemTitle>Theme Settings</ThemeItemTitle>
          <FontAwesomeIcon icon="chevron-right" />
        </SettingItem>
      </SettingItemWrapper>

      <SettingItemWrapper>
        <SettingItem
          onClick={() => {
            putStage({
              props: { path: ["modifiedConfig", "menus"] },
              Component: MenusConfig,
            });
          }}
        >
          <FontAwesomeIcon icon="project-diagram" />
          <ThemeItemTitle>Menu Settings</ThemeItemTitle>
          <FontAwesomeIcon icon="chevron-right" />
        </SettingItem>
      </SettingItemWrapper>

      <SettingItemWrapper>
        <SettingItem
          onClick={() => {
            putStage({
              props: { path: ["modifiedConfig", "translation"] },
              Component: LanguageConfig,
            });
          }}
        >
          <FontAwesomeIcon icon="project-diagram" />
          <ThemeItemTitle>Language Settings</ThemeItemTitle>
          <FontAwesomeIcon icon="chevron-right" />
        </SettingItem>
      </SettingItemWrapper>

      <AddSectionDialog
        dialog={addSectionDialog}
        onClose={() => setAddSection({})}
        addSection={({ defaultConfig }) => addSection({ ...defaultConfig, code: generate() })}
      />
    </SectionsWrapper>
  );
};

export default SectionsConfig;
