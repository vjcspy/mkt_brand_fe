import React, { useEffect } from "react";
import Blog from "../../components/blog";
import { WrapperListBlog } from "./style";
import { useSelector } from "react-redux";
import { blogs } from "../../dummyData/blogs";
import RenderListFlex from "../../components/render-list-flex";
import { GET_BLOGS_BY_IS_SHOW } from "../../constants";
const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "blog",
  title: "List blog",
  titleTranslate: "breadcrumbs.blog",
  components: {
    listBlog: {
      type: "groupBlog",
      title: "Blog",
      name: "listBlog",
      defaultConfig: {
        blog: { type: "blog", id: null, name: "Blog", title: "blog", value: { title: "blog 1", id: "" } },
      },
      value: [],
    },
  },
};

const BlogSection = ({ config = defaultConfig, limited = 4 }) => {
  const listBlogActive = useSelector((s) => s.get("listBlogActive"));
  return (
    <WrapperListBlog>
      <RenderListFlex numItemOnDesktop={2}>
        {/* {blogs
          ?.filter((_e, i) => i < limited)
          .map((item, index) => (
            <a key={index} href={`/blog/${item.id}`}>
              <Blog blog={item} />
            </a>
          ))} */}
        {listBlogActive?.map((item, index) => (
          <a key={index} href={`/blog/${item.slug}`}>
            <Blog blog={item} />
          </a>
        ))}
      </RenderListFlex>
    </WrapperListBlog>
  );
};

BlogSection.defaultConfig = defaultConfig;

export default BlogSection;
