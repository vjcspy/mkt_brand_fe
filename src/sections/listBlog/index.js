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
  title: "List Blog",
  components: {},
};

const ListBlog = ({ limited = 4 }) => {
  return (
    <WrapperListBlog>
      <RenderListFlex numItemOnDesktop={2}>
        {blogs
          ?.filter((_e, i) => i < limited)
          .map((item, index) => (
            <a href={`blog/${item.id}`}>
              <Blog key={index} blog={item} />
            </a>
          ))}
      </RenderListFlex>
    </WrapperListBlog>
  );
};

ListBlog.defaultConfig = defaultConfig;

export default ListBlog;
