import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { DevSecondaryButton } from "../../../styles/developmentStyle";
import { SectionHeader, SectionWrapper } from "../sectionConfig/styled";
import { SectionItem, SectionsBlock, SectionThumbnailWrapper, SectionTitleWrapper } from "../sectionsConfig/styled";
import slug from "slug";
import { ContentEditer, PopupWrapperEditer } from "../developmentComponentType/styled";
import TextIgnoreLocaleComponent from "../developmentComponentType/textIgnoreLocaleComponent";
import { GroupButton } from "../../../sections/header/popup-language-location/style";
import Button from "../../../components/button";
import SectionThumbnail from "../sectionsConfig/sectionThumbnail";
import { ButtonIcon } from "./style";
import SectionTitle from "../sectionsConfig/sectionTitle";
import { createOrUpdateBrandStory, deleteStory, getListBrandStory } from "../../../services/backend";
import { useSelector } from "react-redux";
import PulseLoader from "../../../components/loading";
import { set } from "immutable";
const defaultStory = {
  title: "Title story",
  brandId: "",
  content: "",
  slug: slug("Title story"),
};

const findIndexItem = (arr, itemCheck) => {
  return arr.findIndex((item) => item.id === itemCheck.id);
};

const BrandStory = ({ path, popStage, putStage }) => {
  const [listStory, setListStory] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [storySelected, setStorySelected] = useState();
  const siteCode = useSelector((s) => s.get("siteCode"));
  const token = useSelector((s) => s.get("token"));
  const [loading, setLoading] = useState();
  useEffect(async () => {
    try {
      const { data } = await getListBrandStory();
      setListStory(data);
    } catch (e) {}
  }, []);

  const onAddStory = () => {
    setOpenPopup(true);
    setStorySelected(defaultStory);
  };

  const onSaveBrandStory = async () => {
    try {
      setLoading("upload");
      const story = { ...storySelected };
      story.brandId = siteCode;
      const { data } = await createOrUpdateBrandStory(story, token);
      const index = findIndexItem(listStory, data);
      console.log(index);
      if (index >= 0) {
        listStory[index] = data;
      } else {
        listStory.push(data);
      }
      setListStory([...listStory]);
      setLoading();
      setOpenPopup();
    } catch (e) {
      setOpenPopup();
      setLoading();
    }
  };

  const onChangTextField = (value, name) => {
    console.log(value, name);
    setStorySelected((pre) => ({
      ...pre,
      [name]: value,
      slug: name === "title" ? slug(value) : pre.slug,
    }));
  };

  const onDeleteStory = async (id, index) => {
    try {
      setLoading("delete");
      const { data } = await deleteStory(id);
      listStory.splice(index, 1);
      setListStory([...listStory]);
      setLoading();
    } catch {
      deleteStory;
      setLoading();
    }
  };
  return (
    <SectionWrapper className="section-language">
      <SectionHeader>
        <DevSecondaryButton icon onClick={popStage}>
          <FontAwesomeIcon icon="arrow-left" />
        </DevSecondaryButton>
        <h4> List brand story </h4>
      </SectionHeader>

      <SectionsBlock>
        {listStory?.map((item, index) => (
          <SectionItem
            key={index}
            onClick={() => {
              setOpenPopup(true);
              setStorySelected(item);
            }}
          >
            <SectionThumbnail components={item} />
            <SectionTitleWrapper>
              {loading === "delete" ? <PulseLoader loading fill /> : item.title}{" "}
            </SectionTitleWrapper>
            <DevSecondaryButton
              icon
              onClick={(e) => {
                e.stopPropagation();
                onDeleteStory(item?.id, index);
              }}
            >
              <FontAwesomeIcon icon="trash-alt" />
            </DevSecondaryButton>
          </SectionItem>
        ))}
        <SectionItem onClick={onAddStory}>
          <SectionThumbnailWrapper>
            <FontAwesomeIcon icon={["far", "plus-square"]} />
          </SectionThumbnailWrapper>
          Add story
        </SectionItem>
      </SectionsBlock>
      {openPopup && (
        <PopupWrapperEditer>
          <ContentEditer>
            <TextIgnoreLocaleComponent
              config={{ title: "Title Story", value: storySelected?.title }}
              onChangeTextBlog={(value) => onChangTextField(value, "title")}
            />
            <TextIgnoreLocaleComponent
              className="read-only"
              readOnly
              config={{ title: "Slug", value: storySelected?.slug }}
              onChangeTextBlog={(value) => console.log(value)}
            />
            <TextIgnoreLocaleComponent
              config={{ title: "Content", value: storySelected?.content }}
              onChangeTextBlog={(value) => onChangTextField(value, "content")}
            />

            <GroupButton>
              {storySelected.id ? (
                <Button className="btn-edit-content" onClick={onSaveBrandStory}>
                  {loading === "upload" ? <PulseLoader loading fill /> : "Update"}
                </Button>
              ) : (
                <Button className="btn-edit-content" onClick={onSaveBrandStory}>
                  {loading === "upload" ? <PulseLoader loading fill /> : "Save"}
                </Button>
              )}

              <Button className="btn-edit-content" onClick={() => setOpenPopup(false)}>
                Cancel
              </Button>
            </GroupButton>
          </ContentEditer>
        </PopupWrapperEditer>
      )}
    </SectionWrapper>
  );
};

export default BrandStory;
