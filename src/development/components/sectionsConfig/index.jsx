import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_DYNAMIC_BLOCK, ADD_SECTION } from "../../../constants";
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
import useSiteRouter from "../../../hooks/useSiteRouter";
import useApi from "../../../hooks/useApi";
import DynamicBlock from "../developmentComponentType/dynamicBlock";

const defaultBlock = {
  title: "Dynamic Block",
  position: "",
  contendHTML: "",
};

const SectionsConfig = ({ putStage }) => {
  /// selector

  const router = useSiteRouter();
  const pageQueryRouter = router.query.page ?? "home";
  const pageName = useSelector((s) => s.get("pageName"));
  const header = useFromJS(["modifiedConfig", "header"]);
  const footer = useFromJS(["modifiedConfig", "footer"]);
  const sections = useFromJS(["modifiedConfig", "pages", pageQueryRouter, "sections"]);
  const listDynamicBlock = useFromJS(["dynamicBlocks"]);
  console.log(listDynamicBlock);
  /// dispatch
  const dispatch = useDispatch();
  const addSection = (value) => dispatch({ type: ADD_SECTION, value });
  /// State
  const [addSectionDialog, setAddSection] = useState({});

  useEffect(() => {
    switch (pageQueryRouter) {
      case "blog": {
        break;
      }
    }
  }, [pageQueryRouter]);

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
                props: { path: ["modifiedConfig", "pages", pageQueryRouter, "sections", index] },
                Component: SectionConfig,
              });
            }}
          >
            <SectionThumbnail components={section.components} />
            <SectionTitleWrapper>{section.title}</SectionTitleWrapper>
          </SectionItem>
        ))}
        {/* <SectionItem add onClick={() => setAddSection({ show: true })}>
          <SectionThumbnailWrapper>
            <FontAwesomeIcon icon={["far", "plus-square"]} />
          </SectionThumbnailWrapper>
          Add Section
        </SectionItem> */}
      </SectionsBlock>

      <SectionsBlock>
        <SectionItem
          onClick={() =>
            putStage({
              props: { path: ["modifiedConfig", "footer"] },
              Component: SectionConfig,
            })
          }
        >
          <SectionThumbnail components={footer?.components} />
          {footer?.title}
        </SectionItem>
      </SectionsBlock>
      {listDynamicBlock?.map((item, key) => (
        <SectionsBlock key={key}>
          <SectionItem
            onClick={() =>
              putStage({
                props: { path: ["modifiedConfig", "dynamicBlocks"], block: item },
                Component: DynamicBlock,
              })
            }
          >
            <SectionThumbnail components={footer?.components} />
            {item.title}
          </SectionItem>
        </SectionsBlock>
      ))}
      <SectionsBlock>
        <SectionItem
          onClick={() =>
            dispatch({
              type: ADD_DYNAMIC_BLOCK,
              path: ["modifiedConfig", "dynamicBlocks"],
              value: [...listDynamicBlock, defaultBlock],
            })
          }
        >
          <SectionThumbnailWrapper>
            <FontAwesomeIcon icon={["far", "plus-square"]} />
          </SectionThumbnailWrapper>
          Add Dynamic Block
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
