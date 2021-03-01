import Link from "next/link";
import React from "react";
import Blog from "../../components/blog";
import { WrapperListBlog } from "./style";
import { blogs } from "../../dummyData/blogs";
import RenderListFlex from "../../components/render-list-flex";
const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "blogs",
  title: "Blog",
  titleTranslate: "breadcrumbs.blog",
  components: {},
};

const ListBlog = ({ limited = 4 }) => {
  return (
    <WrapperListBlog>
      <RenderListFlex numItemOnDesktop={2}>
        {blogs
          ?.filter((_e, i) => i < limited)
          .map((item, index) => (
            <a key={index} href={`news/${item.id}`}>
              <Blog blog={item} />
            </a>
          ))}
      </RenderListFlex>
    </WrapperListBlog>
  );
};

ListBlog.defaultConfig = defaultConfig;

export default ListBlog;
