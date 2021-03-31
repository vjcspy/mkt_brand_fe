import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import slug from "slug";
import { UPDATE_CONFIG } from "../../../constants";
import { PopupWrapperEditer, ContentEditer, GroupButton, WrapperButtonSave } from "./styled";
import { Editor } from "@tinymce/tinymce-react";
import Button from "../../../components/button";
import ImageComponent from "./imageComponent";
import TextIgnoreLocaleComponent from "./textIgnoreLocaleComponent";
import RadioComponent from "./radioComponent";
import useApi from "../../../hooks/useApi";
import { showNotification } from "../../../components/notification";
import PulseLoader from "../../../components/loading";
import { SectionHeader } from "../sectionConfig/styled";
import { DevSecondaryButton } from "../../../styles/developmentStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BlogComponent = ({ path, blog, ...rest }) => {
  const { popStage } = rest;
  const { id } = blog;
  /* const titleBlogDefault = useSelector((s) => s.getIn(path.slice(0, path.length - 2)))?.toJS();*/
  const token = useSelector((s) => s.get("token"));
  const dispatch = useDispatch();
  const host = process.env.NEXT_PUBLIC_API_HOST;
  const [openEdit, setOpenEdit] = useState(false);
  const [blogApi, setBlogApi] = useState(blog);
  // update data blog
  const [{ data: dataPutBlog, loading: loadingPutBlog, error: errorPutBlog }, actionPutBlog] = useApi(
    `${host}/blogs/${id}`,
    blogApi,
    {
      Authorization: `Bearer ${token}`,
    },
    "PUT"
  );
  // Create blog
  const [{ data: dataCreateBlog, loading: loadingCreateBlog, error: errorCreateBlog }, actionCreateBlog] = useApi(
    `${host}/blogs`,
    blogApi,
    {
      Authorization: `Bearer ${token}`,
    },
    "POST"
  );

  //action after create or update success blog
  useEffect(() => {
    if (dataCreateBlog || dataPutBlog) {
      showNotification(dispatch, { content: "Success", status: "success" });
    } else if (errorCreateBlog || errorPutBlog) {
      showNotification(dispatch, { content: "Fail", status: "error" });
    }
  }, [dataCreateBlog, dataPutBlog]);

  const onClosePopup = () => {
    setOpenEdit(false);
  };

  const onSave = () => {
    if (id) {
      actionPutBlog();
    } else {
      actionCreateBlog();
    }
  };

  const onChangeShowBlog = useCallback((value) => {
    setBlogApi((preState) => ({ ...preState, isShow: value === "Show" ? true : false }));
  }, []);

  const onChangeImageBlog = useCallback((value) => {
    setBlogApi((preState) => ({ ...preState, avatar: value }));
  }, []);

  const onChangeData = (value, name) => {
    if (name === "slug") {
      setBlogApi((preState) => ({ ...preState, [name]: slug(value) }));
    } else {
      setBlogApi((preState) => ({ ...preState, [name]: value }));
    }
  }

  return (
    <>
      <SectionHeader>
        <DevSecondaryButton icon onClick={popStage}>
          <FontAwesomeIcon icon="arrow-left" />
        </DevSecondaryButton>
        <h4>Blog</h4>
      </SectionHeader>
      <TextIgnoreLocaleComponent
        ignoreLocale={true}
        config={{ title: "Title Blog", value: blogApi.title }}
        onChangeTextBlog={value => onChangeData(value, "title")}
      />
      <TextIgnoreLocaleComponent
        ignoreLocale={true}
        config={{ title: "Slug Blog", value: blogApi.slug }}
        onChangeTextBlog={(value) => onChangeData(value, "slug")}
      />
      <TextIgnoreLocaleComponent
        type="number"
        config={{ title: "Total view", value: blogApi.view }}
        onChangeTextBlog={value => onChangeData(value, "view")}
      />
      <TextIgnoreLocaleComponent
        type="number"
        config={{ title: "Total like", value: blogApi.like }}
        onChangeTextBlog={value => onChangeData(value, "like")}
      />
      <TextIgnoreLocaleComponent
        type="number"
        config={{ title: "Total Share", value: blogApi.share }}
        onChangeTextBlog={value => onChangeData(value, "share")}
      />
      <ImageComponent
        notRemove={true}
        config={{ title: "Avatar" }}
        imageBlog={blogApi.avatar}
        onChangeImageBlog={onChangeImageBlog}
      />
      <TextIgnoreLocaleComponent
        ignoreLocale={true}
        config={{ title: "Author", value: blogApi.author }}
        onChangeTextBlog={value => onChangeData(value, "author")}
      />
      <RadioComponent
        onChangeShowBlog={onChangeShowBlog}
        config={{
          title: "Show blog",
          value: { active: blogApi.isShow ? "Show" : "Hidden", titles: ["Show", "Hidden"] },
        }}
      />
      <GroupButton>
        <Button className="btn-edit-content" onClick={() => setOpenEdit(true)}>
          Edit Content
        </Button>
        <Button onClick={onSave}>{loadingCreateBlog || loadingPutBlog ? <PulseLoader loading fill /> : "Save"}</Button>
      </GroupButton>

      {openEdit && (
        <PopupWrapperEditer>
          <ContentEditer>
            <Editor
              initialValue={`<p>${blogApi.content}</p>`}
              init={{
                selector: "textarea",
                height: 500,
                menubar: false,
                content_style: "body {font-size: 14pt;}",
                fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
                image_uploadtab: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect |sizes  elect|forecolor|  bold italic underline backcolor |fontselect |fontsizeselect| link image|\
                  alignleft aligncenter alignright alignjustify |",
              }}
              onEditorChange={value => onChangeData(value, "content")}
            />
            <WrapperButtonSave>
              <Button className="btn-save-content" onClick={onClosePopup}>
                Save
              </Button>
            </WrapperButtonSave>
          </ContentEditer>
        </PopupWrapperEditer>
      )}
    </>
  );
};

export default BlogComponent;
