import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import slug from "slug";
import { UPDATE_CONFIG, UPDATE_TITLE_BLOCK } from "../../../constants";
import { PopupWrapperEditer, ContentEditer, GroupButton, WrapperButtonSave, WrapperListCheckBox } from "./styled";
import { Editor } from "@tinymce/tinymce-react";
import Button from "../../../components/button";
import ImageComponent from "./imageComponent";
import TextComponent from "./textComponent";
import RadioComponent from "./radioComponent";
import useApi from "../../../hooks/useApi";
import { showNotification } from "../../../components/notification";
import PulseLoader from "../../../components/loading";
import { SectionHeader } from "../sectionConfig/styled";
import { DevSecondaryButton } from "../../../styles/developmentStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropDownComponent from "./drop-down-component";
import GroupCheckBoxComponent from "./group-check-box-component";
import { map } from "lodash";

const positions = [
  { id: 0, title: "After Header" },
  { id: 1, title: "Before Footer" },
];

const listSiteDefault = [
  { id: 1, title: "Gogi", checked: false },
  { id: 2, title: "Kichi", checked: false },
  { id: 3, title: "Kpup", checked: false },
];

const listPageDefault = [
  { id: 1, title: "Home", checked: false },
  { id: 2, title: "Promo", checked: false },
  { id: 3, title: "Menu", checked: false },
];

const DynamicBlock = ({ path, block, ...rest }) => {
  const pages = useSelector((state) => state.getIn(["modifiedConfig", "pages"]));
  const [titleBlock, setTitleBlock] = useState(block.title ?? "");
  const { popStage } = rest;
  const [position, setPosition] = useState(positions[0]);
  const [listSite, setListSite] = useState(listSiteDefault);
  const [listPage, setListPage] = useState(listPageDefault);

  const dispatch = useDispatch();

  useEffect(() => {
    let listPage = [];
    listPage = map(pages.toJS(), (item, index) => {
      return {
        id: index,
        title: item.title,
        checked: false,
      };
    });
    setListPage(listPage);
  }, [pages]);

  const onSave = () => {
    dispatch({ type: UPDATE_TITLE_BLOCK, path: [...path, "title"], value: titleBlock });
  };

  const onSelectItemSite = (value) => {
    let newListSite = listSite.map((item) => {
      if (item.id === value.id) {
        item.checked = !item.checked;
      }
      return item;
    });
    setListSite(newListSite);
  };

  const onSelectItemPage = (value) => {
    let newListPage = listPage.map((item) => {
      if (item.id === value.id) {
        item.checked = !item.checked;
      }
      return item;
    });
    setListPage(newListPage);
  };

  return (
    <>
      <SectionHeader>
        <DevSecondaryButton icon onClick={popStage}>
          <FontAwesomeIcon icon="arrow-left" />
        </DevSecondaryButton>
        <h4>Dynamic Block</h4>
      </SectionHeader>
      <TextComponent
        ignoreLocale={true}
        config={{ title: "Title Block", value: titleBlock }}
        onChangeTextBlog={(value) => setTitleBlock(value)}
      />
      <TextComponent
        ignoreLocale={true}
        config={{ title: "Content HTML", value: "" }}
        onChangeTextBlog={(value) => setTitleBlock(value)}
      />
      <DropDownComponent
        listOption={positions}
        onSelect={setPosition}
        optionSelected={position}
        tittle="Position Block"
      />
      <GroupCheckBoxComponent title="Apply for site" listOption={listSite} onSelect={onSelectItemSite} />
      <GroupCheckBoxComponent title="Apply for page" listOption={listPage} onSelect={onSelectItemPage} />
      <GroupButton>
        <Button onClick={onSave}>Save</Button>
      </GroupButton>
    </>
  );
};

export default DynamicBlock;
