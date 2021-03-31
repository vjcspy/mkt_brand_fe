import React, { useCallback, useEffect, useState } from "react";
import SectionThumbnail from "../../components/sectionsConfig/sectionThumbnail";
import { SectionItem, SectionThumbnailWrapper } from "../../components/sectionsConfig/styled";
import { ComponentWrapper, MultipleWrapper, SectionTitleWrapper } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { DevSecondaryButton } from "../../../styles/developmentStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { REMOVE_CONFIG, SET_LIST_BLOG_EDIT_PAGE, UPDATE_CONFIG } from "../../../constants";
import useApi from "../../../hooks/useApi";
import PulseLoader from "../../../components/loading";
import BlogComponent from "./blogComponent";
import slug from "slug";

const GroupBlogComponent = ({ config, path, putStage }) => {
  const token = useSelector((s) => s.get("token"));
  const siteCode = useSelector((s) => s.getIn(["site", "site_code"]));
  const host = process.env.NEXT_PUBLIC_API_HOST;
  const listBlog = useSelector((state) => state.get("listBlogEditPage"));
  const { data, loading, error } = useSelector((s) => s.get("listBlog")) ?? {};
  const dispatch = useDispatch();
  const updateConfig = useCallback((path, value) => dispatch({ type: UPDATE_CONFIG, value, path }), [dispatch]);
  const removeConfig = useCallback((path, value) => dispatch({ type: REMOVE_CONFIG, value, path }), [dispatch]);

  const [{ data: dataListBlog, error: errorListBlog, loading: loadingGetBlog }, actionGetListBlog] = useApi(
    `${host}/blogs/?siteCode=${siteCode}`,
    null,
    {
      Authorization: `Bearer ${token}`,
    }
  );
  const [{ data: dataDeleteBlog, error: errorDeleteBlog, loading: loadingDeleteBlog }, actionDeleteBlog] = useApi(
    `${host}/blogs/`,
    null,
    {
      Authorization: `Bearer ${token}`,
    },
    "DELETE"
  );

  const [newData, setNewData] = useState([]);

  useEffect(() => {
    actionGetListBlog();
  }, []);

  useEffect(() => {
    if (!dataListBlog) {
      return;
    }
    const newData = dataListBlog.map((d) => {
      d["type"] = "Blog";
      return d;
    });
    dispatch({ type: SET_LIST_BLOG_EDIT_PAGE, value: newData });
  }, [dataListBlog]);

  const addNewBlog = () => {
    putStage({
      props: {
        path: [...path, listBlog.length],
        blog: {
          content: "",
          author: "",
          avatar: "",
          isShow: true,
          title: "Title Blog",
          siteCode,
          slug: slug("Title Blog"),
          date: Date(),
          like: 0,
          share: 0,
          view: 0,
        },
      },
      Component: BlogComponent,
    });
  };

  const onDeleteBlog = (blog, index) => {
    if (blog.id) {
      const result = confirm("Delete this blog ?");
      if (result) {
        actionDeleteBlog(`${host}/blogs/${blog.id}`);
        listBlog.splice(index, 1);
        dispatch({ type: SET_LIST_BLOG_EDIT_PAGE, value: [...listBlog] });
      }
    }
  };

  return (
    <ComponentWrapper>
      <label>{config.title}</label>
      {loadingGetBlog ? (
        <PulseLoader loading fill />
      ) : (
        <MultipleWrapper>
          {loadingDeleteBlog && <PulseLoader loading fill />}
          {listBlog?.map((blog, subIndex) => (
            <SectionItem
              key={subIndex}
              onClick={() => {
                putStage({
                  props: { path: [...path, subIndex], blog },
                  Component: BlogComponent,
                });
              }}
            >
              <SectionThumbnail blog={blog} />
              {/* <SectionTitle blog={blog} /> */}
              <SectionTitleWrapper>{blog?.title}</SectionTitleWrapper>
              <DevSecondaryButton
                icon
                // onClick={(e) => {
                //   e.stopPropagation();
                //   removeConfig(path, subIndex);
                // }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteBlog(blog, subIndex);
                }}
              >
                <FontAwesomeIcon icon="trash-alt" />
              </DevSecondaryButton>
            </SectionItem>
          ))}

          <SectionItem add onClick={addNewBlog}>
            <SectionThumbnailWrapper>
              <FontAwesomeIcon icon={["far", "plus-square"]} />
            </SectionThumbnailWrapper>
            Add {config.title}
          </SectionItem>
        </MultipleWrapper>
      )}
    </ComponentWrapper>
  );
};

export default GroupBlogComponent;
