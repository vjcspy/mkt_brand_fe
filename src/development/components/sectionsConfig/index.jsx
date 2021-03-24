import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_DYNAMIC_BLOCK, ADD_SECTION, REMOVE_DYNAMIC_BLOCK, UPDATE_CONFIG } from "../../../constants";
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
import { Sections } from "../../../sections";
import { List, fromJS } from "immutable";
const defaultBlock = {
  title: "Dynamic Block",
  id: "",
  name: "dynamicBlock",
};
let indexSelect;
const SectionsConfig = ({ putStage }) => {
  const defaultDynamicHTML = Sections.dynamicContentHTML.defaultConfig;
  const router = useSiteRouter();
  const pageQueryRouter = router.query.page ?? "home";
  const header = useFromJS(["modifiedConfig", "header"]);
  const footer = useFromJS(["modifiedConfig", "footer"]);
  const sections = useFromJS(["modifiedConfig", "pages", pageQueryRouter, "sections"]);
  const listDynamicBlock = useFromJS(["modifiedConfig", "dynamicBlocks"]);
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
  const onDragStart = (e, index) => {
    indexSelect = index;
  };

  const onOrderSection = (indexChange, indexByChange) => {
    let tamp = sections[indexChange];
    sections[indexChange] = sections[indexByChange];
    sections[indexByChange] = tamp;
    return List(sections.map((item) => fromJS(item)));
  };

  const handleDrop = (e) => {
    const indexChange = +e.target.dataset.index;
    if (indexChange >= 0 && indexSelect >= 0) {
      dispatch({
        type: UPDATE_CONFIG,
        path: ["modifiedConfig", "pages", pageQueryRouter, "sections"],
        value: onOrderSection(indexSelect, indexChange),
      });
    }
  };

  return (
    <SectionsWrapper>
      {/* Header Config*/}
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

      {/* List Section Config*/}
      <SectionsBlock
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => handleDrop(e)}
      >
        {map(sections, (section, index) => (
          <SectionItem
            draggable="true"
            onDragStart={(e) => onDragStart(e, index)}
            key={section.code}
            onClick={(e) => {
              e.stopPropagation();
              putStage({
                props: { path: ["modifiedConfig", "pages", pageQueryRouter, "sections", index] },
                Component: SectionConfig,
              });
            }}
          >
            <SectionThumbnail components={section.components} />
            <SectionTitleWrapper data-index={index}>
              {section.name === "dynamicContentHTML" ? section.components.title.value["vi"] : section.title}
            </SectionTitleWrapper>
          </SectionItem>
        ))}

        <SectionItem add onClick={() => addSection({ ...defaultDynamicHTML, code: generate() })}>
          <SectionThumbnailWrapper>
            <FontAwesomeIcon icon={["far", "plus-square"]} />
          </SectionThumbnailWrapper>
          Add Block HTML
        </SectionItem>
      </SectionsBlock>

      {/* Footer Config*/}
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

      {/* Theme Config*/}
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

      {/* Menus Config*/}
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

      {/* Language Config*/}
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

      {/* Cookie Config*/}
      {/* <SettingItemWrapper>
        <SettingItem
          onClick={() => {
            putStage({
              props: { path: ["modifiedConfig", "cookie"] },
              Component: LanguageConfig,
            });
          }}
        >
          <FontAwesomeIcon icon="project-diagram" />
          <ThemeItemTitle>Language Settings</ThemeItemTitle>
          <FontAwesomeIcon icon="chevron-right" />
        </SettingItem>
      </SettingItemWrapper> */}

      {/* Popup Add Section*/}
      <>
        {/* <AddSectionDialog
        dialog={addSectionDialog}
        onClose={() => setAddSection({})}
        addSection={({ defaultConfig }) => addSection({ ...defaultConfig, code: generate() })}
      /> */}
      </>

      {/* Add dynamicBlock */}
      <SectionsBlock>
        {listDynamicBlock?.map((item, key) => (
          <SectionsBlock key={key}>
            <SectionItem
              onClick={() =>
                putStage({
                  props: { path: ["modifiedConfig", "dynamicBlocks", key], block: item },
                  Component: DynamicBlock,
                })
              }
            >
              <SectionThumbnail components={footer?.components} />
              {item.title}
              <FontAwesomeIcon
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: REMOVE_DYNAMIC_BLOCK, path: ["modifiedConfig", "dynamicBlocks", key] });
                }}
                className="icon-delete"
                icon="trash-alt"
              />
            </SectionItem>
          </SectionsBlock>
        ))}
        <SectionItem
          add
          onClick={() =>
            dispatch({
              type: ADD_DYNAMIC_BLOCK,
              path: ["modifiedConfig", "dynamicBlocks"],
              value: { ...defaultBlock, id: generate() },
            })
          }
        >
          <SectionThumbnailWrapper>
            <FontAwesomeIcon icon={["far", "plus-square"]} />
          </SectionThumbnailWrapper>
          Add Dynamic Block
        </SectionItem>
      </SectionsBlock>
    </SectionsWrapper>
  );
};

export default SectionsConfig;
