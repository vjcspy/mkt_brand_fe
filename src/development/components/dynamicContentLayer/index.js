import { map } from "lodash";
import React, { useState, useEffect, useMemo } from "react";
import Button from "../../../components/button";
import DropDown from "../../../components/input/drop-down";
import PulseLoader from "../../../components/loading";
import { UPDATE_CONFIG } from "../../../constants";
import useFromJS from "../../../hooks/useFromJS";
import { getSites, getSiteServer, pushDynamicBlock, deleteBlock } from "../../../services/backend";
import DropDownComponent from "../developmentComponentType/drop-down-component";
import GroupCheckBoxComponent from "../developmentComponentType/group-check-box-component";
import TextIgnoreLocaleComponent from "../developmentComponentType/textIgnoreLocaleComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  WrapperLayer,
  GroupButton,
  ContentLayer,
  WrapperEditContent,
  WrapperControl,
  WrapperListSection,
  ListItemSection,
} from "./style";
import { set } from "immutable";

const positionDefaultPage = [
  { id: 0, title: "After Header" },
  { id: 1, title: "Before Footer" },
];

const coverValueObjectToArray = (object) => (object ? Object.values(object) : null);
const formatListPage = (pages) => {
  pages?.forEach((item) => {
    item.checked = false;
    item.id = item.name;
  });
  pages?.unshift({ id: 0, title: "All", checked: true });
  return pages;
};
const loadSite = "loadSite";
const loadDelete = "loadDelete";
const loadSaveAndUpdate = "loadSaveAndUpdate";
const loadAdd = "loadAdd";
const stopLoad = "False";
const DynamicContentLayer = ({ dynamicBlockSelected, onUpdateDynamicBlock }) => {
  const dispatch = useDispatch();
  const listPageDefault = useFromJS(["modifiedConfig", "pages"]);
  const siteCodeCurrent = useFromJS(["siteCode"]);
  const token = useSelector((s) => s.get("token"));
  const listPageCustom = useMemo(() => {
    let listPageData = coverValueObjectToArray(listPageDefault);
    return formatListPage(listPageData);
  }, []);
  const [block, setBlock] = useState(dynamicBlockSelected);
  const [listSite, setListSite] = useState([{ id: 0, title: "All", checked: true }]);
  const [listPage, setListPage] = useState(listPageCustom);
  const [listPosition, setListPosition] = useState(positionDefaultPage); // for drag order
  const [positionDefault, setPositionSelectedDefault] = useState({ id: 0, title: "After Header" }); // for select all page
  const [siteSelected, setSiteSelected] = useState({ id: 0, title: "All", checked: true });
  const [pageSelected, setPageSelected] = useState({ id: 0, title: "All", checked: true });

  const [loading, setLoading] = useState(stopLoad);

  // get sites
  useEffect(async () => {
    const defaultSiteCodeOfBlock = [];
    try {
      setLoading(loadSite);
      const newSites = [siteSelected];
      const {
        data: { data },
      } = await getSites();
      console.log(data);
      data.sites.map((item) => {
        item.checked === false;
        item.title = item.site_code;
        defaultSiteCodeOfBlock.push(item.site_code);
        newSites.push(item);
      });
      block.siteCode = defaultSiteCodeOfBlock;
      setBlock({ ...block });
      setListSite(newSites);
      setLoading(stopLoad);
    } catch (e) {
      setLoading(stopLoad);
    }
  }, []);

  // update position block when select page(default after header, before footer)
  useEffect(() => {
    // not select all page
    if (pageSelected.title !== "All") {
      const sectionInPage = [...pageSelected.sections];
      const dynamicBlock = {
        type: "dynamicBlock",
        name: "dynamicBlock",
        id: block.id,
        title: block.title,
      };
      sectionInPage?.push(dynamicBlock);
      setListPosition(sectionInPage);
    } else {
      setListPosition(positionDefaultPage); // set default position when select all page
    }
  }, [pageSelected]);

  const onCanCancel = () => {
    onUpdateDynamicBlock(block, false);
  };

  // update state block
  const onChangeData = (value, name) => {
    block[name] = value;
    setBlock({ ...block });
  };

  const onSelectSite = (value) => {
    setSiteSelected(value);
    if (value.id === 0) {
      // all site
      let val = listSite[0].checked;
      listSite.map((item) => {
        item.checked = false;
      });
      listSite[0].checked = !val;
    } else {
      listSite.map((item) => {
        if (item.id === 0) {
          item.checked = false;
        }
        if (item.id === value.id) {
          item.checked = !item.checked;
        }
      });
    }
    setListSite([...listSite]);
  };

  // update list side code of block
  useEffect(() => {
    const arrSiteCodeOfBlock = [];
    if (siteSelected.id === 0) {
      listSite?.forEach((item) => {
        if (item.id !== 0) {
          arrSiteCodeOfBlock.push(item.site_code);
        }
      });
    } else {
      listSite?.forEach((item) => {
        if (item.id !== 0 && item.checked) {
          arrSiteCodeOfBlock.push(item.site_code);
        }
      });
    }
    block.siteCode = arrSiteCodeOfBlock;
    setBlock({ ...block });
  }, [listSite, siteSelected]);

  const onSelectPage = (value) => {
    setPageSelected(value);
    const data = listPage.map((item) => {
      if (item.id === value.id) {
        item.checked = true;
      } else {
        item.checked = false;
      }
      return item;
    });
    setListPage(data);
  };

  const onAddBlock = async () => {
    try {
      setLoading(loadAdd);
      const { data } = await pushDynamicBlock(block, token);
      const listSite = await getRawConfigOfSites();
      updatePageInRawConfigOfSite(listSite);
      setLoading(stopLoad);
    } catch (e) {
      setLoading(stopLoad);
    }
  };

  const getRawConfigOfSites = async () => {
    const listRequestPromise = [];
    if (siteSelected.title === "All") {
      listSite.forEach((item) => {
        if (item.id !== 0) {
          listRequestPromise.push(getSiteServer(item.site_code));
        }
      });
    } else {
      listSite.forEach((item) => {
        if (item.checked) {
          // update site selected
          listRequestPromise.push(getSiteServer(item.site_code));
        }
      });
    }
    const arrSite = await resolveListRequest(listRequestPromise);
    return arrSite;
  };

  const updatePageInRawConfigOfSite = (lisSite) => {
    lisSite.forEach((item) => {
      addSectionInPage(item.raw_config.pages);
      if (item.site_code === siteCodeCurrent) {
        dispatch({ type: UPDATE_CONFIG, path: ["modifiedConfig"], value: item.raw_config });
      }
    });
  };

  const resolveListRequest = async (promises) => {
    try {
      const data = await Promise.all(promises);
      return data.map((item) => item.data);
    } catch (e) {
      return null;
    }
  };

  const addSectionInPage = (pages) => {
    // All page => add block width default (after header, before footer)
    if (pageSelected.id === 0) {
      map(pages, (item) => {
        item.sections = addBlockWithPositionDefault(item.sections, positionDefault.id);
      });
    } else {
      pages[pageSelected.name].sections = listPosition;
    }
  };

  const addBlockWithPositionDefault = (sections, oder) => {
    // oder 1 => Before Footer || oder 0 => After Header
    const dynamicBlock = {
      type: "dynamicBlock",
      name: "dynamicBlock",
      id: block.id,
      title: block.title,
    };
    let cloneSection = [...sections];
    if (oder === 0) {
      cloneSection.unshift(dynamicBlock);
    } else {
      cloneSection.push(dynamicBlock);
    }
    return cloneSection;
  };

  const onCreatOrUpdateBlock = async () => {
    setLoading(loadSaveAndUpdate);
    const { data } = await pushDynamicBlock(block, token);
    updateStateSuccess(data);
    setLoading(stopLoad);
    return data;
  };
  const onDeleteBlock = async () => {
    setLoading(loadDelete);
    const { data } = await deleteBlock(block.id, token);
    if (data.siteCode) {
      const listSite = await getListSiteNeedRemoveBlock(data);
      updateSectionOfPage(listSite, block.id);
    }
    setLoading(stopLoad);
    onUpdateDynamicBlock(block, true);
  };

  const updateStateSuccess = (newData) => {
    const { contentEN, contentVN, id, title } = newData;
    setBlock((pre) => ({
      ...pre,
      contentEN,
      contentVN,
      title,
      id,
    }));
  };

  const getListSiteNeedRemoveBlock = async (block) => {
    const requestGetSite = [];
    block.siteCode.forEach((item) => {
      requestGetSite.push(getSiteServer(item));
    });
    const data = await resolveListRequest(requestGetSite);
    return data;
  };

  const updateSectionOfPage = (listSite, idBlock) => {
    listSite.forEach((item) => {
      map(item.raw_config.pages, (item) => {
        removeBlockInSection(item.sections, idBlock);
      });
      if (item.site_code === siteCodeCurrent) {
        dispatch({ type: UPDATE_CONFIG, path: ["modifiedConfig"], value: item.raw_config });
      }
    });

    console.log(listSite);
  };

  const removeBlockInSection = (sections, idBlock) => {
    const indexBlock = sections.findIndex((item) => item?.id === idBlock);
    if (indexBlock >= 0) {
      sections.splice(indexBlock, 1);
    }
  };
  return (
    <WrapperLayer>
      <ContentLayer>
        {loading === loadSite && (
          <div
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              height: "100%",
              width: "100%",
              zIndex: "3000",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <PulseLoader color="#DA841E" loading fill />
          </div>
        )}
        <WrapperEditContent>
          <TextIgnoreLocaleComponent
            config={{ title: "Title", value: block?.title }}
            onChangeTextBlog={(value) => onChangeData(value, "title")}
          />
          <TextIgnoreLocaleComponent
            config={{ title: "Content EN", value: block?.contentEN }}
            onChangeTextBlog={(value) => onChangeData(value, "contentEN")}
          />
          <TextIgnoreLocaleComponent
            config={{ title: "Content VN", value: block?.contentVN }}
            onChangeTextBlog={(value) => onChangeData(value, "contentVN")}
          />
          <GroupButton>
            {block?.id ? (
              <>
                <Button onClick={onDeleteBlock}>
                  {loading === loadDelete ? <PulseLoader color="#FFF" loading fill /> : "Delete"}
                </Button>
                <Button onClick={onCreatOrUpdateBlock}>
                  {loading === loadSaveAndUpdate ? <PulseLoader color="#FFF" loading fill /> : "Update"}
                </Button>
              </>
            ) : (
              <>
                <Button onClick={onCreatOrUpdateBlock}>
                  {loading === loadSaveAndUpdate ? <PulseLoader color="#FFF" loading fill /> : "Save"}
                </Button>
                <Button onClick={onCanCancel}>Cancel</Button>
              </>
            )}
          </GroupButton>
        </WrapperEditContent>
        {block?.id && (
          <>
            <WrapperControl>
              <GroupCheckBoxComponent listOption={listSite} onSelect={onSelectSite} title="Apply for site" />
              <GroupCheckBoxComponent listOption={listPage} onSelect={onSelectPage} title="Apply for page" />

              {pageSelected?.title === "All" ? (
                <DropDownComponent
                  listOption={listPosition}
                  onSelect={setPositionSelectedDefault}
                  optionSelected={positionDefault}
                  tittle="Position"
                />
              ) : (
                <WrapperListSection>
                  <div>Position</div>
                  <ListItemSection>
                    {listPosition.map((item, key) => (
                      <div key={key}>{item.title}</div>
                    ))}
                  </ListItemSection>
                </WrapperListSection>
              )}
            </WrapperControl>
            <GroupButton>
              <Button onClick={onCanCancel}>Cancel</Button>
              <Button onClick={onAddBlock}>
                {loading === loadAdd ? <PulseLoader color="#FFF" loading fill /> : "Add"}
              </Button>
            </GroupButton>
          </>
        )}
      </ContentLayer>
    </WrapperLayer>
  );
};

export default DynamicContentLayer;
