import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import slug from "slug";
import { UPDATE_CONFIG } from "../../../constants";
import { PopupWrapperEditer, ContentEditer, GroupButton, WrapperButtonSave } from "./styled";
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
const DynamicBlock = ({ path, ...rest }) => {
  const { popStage } = rest;
  /* const titleBlogDefault = useSelector((s) => s.getIn(path.slice(0, path.length - 2)))?.toJS();*/
  // const token = useSelector((s) => s.get("token"));
  // const siteCode = useSelector((s) => s.getIn(["site", "site_code"])); // id site brand
  // const dispatch = useDispatch();
  // const host = process.env.NEXT_PUBLIC_API_HOST;
  // const [openEdit, setOpenEdit] = useState(false);
  // const [blogApi, setBlogApi] = useState(blog);

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
        config={{ title: "Title Block", value: "Title Dynamic Block" }}
        onChangeTextBlog={() => console.log("okok")}
      />
    </>
  );
};

export default DynamicBlock;
