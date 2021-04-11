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
import { createOrUpdateBrandStory, getListBrandStory } from "../../../services/backend";
import { useSelector } from "react-redux";
const defaultStory = {
  title: "Title story",
  brandId: "",
  content: "",
};

const BrandStory = ({ path, popStage, putStage }) => {
  const [listStory, setListStory] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [storySelected, setStorySelected] = useState();
  const siteCode = useSelector((s) => s.get("siteCode"));
  const token = useSelector((s) => s.get("token"));
  useEffect(async () => {
    const { data } = await getListBrandStory();
    console.log(data);
  }, []);

  const onAddStory = () => {
    setOpenPopup(true);
    setStorySelected(defaultStory);
  };

  const onSaveBrandStory = async () => {
    const story = { ...storySelected };
    story.slug = slug(story.title);
    story.brandId = siteCode;
    console.log(story);
    const { data } = await createOrUpdateBrandStory(story, token);
  };

  const onChangTextField = (value, name) => {
    setStorySelected((pre) => ({
      ...pre,
      [name]: value,
    }));
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
            <SectionTitleWrapper>{item?.title}</SectionTitleWrapper>
            <DevSecondaryButton icon>
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
              config={{ title: "Content", value: storySelected?.content }}
              onChangeTextBlog={(value) => onChangTextField(value, "content")}
            />

            <GroupButton>
              {storySelected.id ? (
                <Button className="btn-edit-content" onClick={() => setOpenPopup(false)}>
                  Update
                </Button>
              ) : (
                <Button className="btn-edit-content" onClick={onSaveBrandStory}>
                  Save
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
