import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, } from "react-redux";
import { ADD_SECTION, REMOVE_DYNAMIC_BLOCK, UPDATE_CONFIG } from "../../../constants";
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
import { Sections } from "../../../sections";
import { getListDynamicBlock } from "../../../services/backend";
import DynamicContentLayer from "../dynamicContentLayer";

let indexSelect;
import { List, fromJS } from "immutable";
import BrandStory from "../brandStory";
const defaultBlock = {
  title: "Dynamic Block",
  contentEN: "",
  contentVN: "",
  siteCode: []
};
const SectionsConfig = ({ putStage }) => {
  /// dispatch
  const dispatch = useDispatch();
  const dynamicContentHTML = Sections.dynamicContentHTML.defaultConfig;
  // console.log(dynamicContentHTML)
  const router = useSiteRouter();
  const pageQueryRouter = router.query.page ?? "home";
  const header = useFromJS(["modifiedConfig", "header"]);
  const footer = useFromJS(["modifiedConfig", "footer"]);
  const sections = useFromJS(["modifiedConfig", "pages", pageQueryRouter, "sections"]);
  const addSection = (value) => dispatch({ type: ADD_SECTION, value });
  const [dynamicBlocks, setDynamicBlocks] = useState([])
  const [dynamicBlockSelected, setDynamicBlockSelected] = useState()
  const [showPopupDynamicBlock, setShowPopupDynamicBlock] = useState(false);
  useEffect(async () => {
    try {
      const { data } = await getListDynamicBlock()
      setDynamicBlocks(data)
    } catch (e) {
    }
  }, [])

  useEffect(() => {
    switch (pageQueryRouter) {
      case "blog": {
        break;
      }
    }
  }, [pageQueryRouter]);

  const onUpdateDynamicBlock = (value, isDelete = false) => {
    if (value.id) {
      const index = dynamicBlocks.findIndex(item => item.id === value.id)
      if (index >= 0) {
        if (isDelete) {
          dynamicBlocks.splice(index, 1)
        } else {
          dynamicBlocks[index] = value
        }
      } else {
        dynamicBlocks.push(value)
      }
      setDynamicBlocks([...dynamicBlocks])
    }
    setShowPopupDynamicBlock(false)
  }

  const onDragStart = (e, index) => {
    indexSelect = index;
  };
  const onOrderSection = (indexChange, indexByChange) => {
    let tamp = sections[indexChange];
    sections[indexChange] = sections[indexByChange];
    sections[indexByChange] = tamp;
    return [...sections];
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
          section.name === "dynamicBlock" ? (
            <SectionItem
              draggable="true"
              onDragStart={(e) => onDragStart(e, index)}
              key={section.id}>
              <SectionThumbnail components={section.components} />
              <SectionTitleWrapper data-index={index}>
                {section.title}
              </SectionTitleWrapper>
            </SectionItem>
          ) : (
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
                {section.name === "dynamicContentHTML" ? section.components.title.value : section.title}
              </SectionTitleWrapper>
            </SectionItem>
          )))}

        <SectionItem add onClick={() => addSection({ ...dynamicContentHTML, code: generate() })}>
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

      {/* Dynamic Block */}
      <>
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
      </>

      {/* Brand Story */}
      <SettingItemWrapper>
        <SettingItem
          onClick={() => {
            putStage({
              Component: BrandStory,
            });
          }}
        >
          <FontAwesomeIcon icon="project-diagram" />
          <ThemeItemTitle>Brand Story</ThemeItemTitle>
          <FontAwesomeIcon icon="chevron-right" />
        </SettingItem>
      </SettingItemWrapper>


      {/* Add dynamicBlock */}
      <SectionsBlock>
        {dynamicBlocks?.map((item, key) => (
          <SectionItem
            key={key}
            onClick={() => { setDynamicBlockSelected(item); setShowPopupDynamicBlock(true) }}
          >
            <SectionThumbnail components={footer?.components} />
            {item.title}
          </SectionItem>
        ))}
        <SectionItem
          onClick={() => { setShowPopupDynamicBlock(true); setDynamicBlockSelected(defaultBlock) }}
        >
          <SectionThumbnailWrapper>
            <FontAwesomeIcon icon={["far", "plus-square"]} />
          </SectionThumbnailWrapper>
          Add Dynamic Block
        </SectionItem>
      </SectionsBlock>
      {showPopupDynamicBlock && <DynamicContentLayer dynamicBlockSelected={dynamicBlockSelected} onUpdateDynamicBlock={onUpdateDynamicBlock} />}


    </SectionsWrapper >
  );
};

export default SectionsConfig;
