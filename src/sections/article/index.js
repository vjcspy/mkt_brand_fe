import Link from "next/link";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Blog from "../../components/blog";
import IconFacebookCircle from "../../components/icons/iconFacebookCircle";
import IconInstagramCircle from "../../components/icons/iconInstagramCircle";
import IconLike from "../../components/icons/iconLike";
import IconShare from "../../components/icons/iconShare";
import IconView from "../../components/icons/iconView";
import RatioImage from "../../components/ratioImage";
import RenderListFlex from "../../components/render-list-flex";
import { blogs } from "../../dummyData/blogs";
import {
  WrapperBlog,
  Banner,
  Title,
  Content,
  HeaderBlog,
  ItemSocial,
  Info,
  FooterBlog,
  DatePost,
  ContentBlog,
  LeftInfo,
  RelativeBlog,
} from "./style";

const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "blog-detail",
  title: "",
  components: {},
};

const Article = ({ blog }) => {
  let count = 0;
  const blogRelative = useMemo(() => {
    return blogs.filter((item) => {
      if (item.id !== 1 && count < 2) {
        count++;
        return item;
      }
    }, []);
  }, []);
  return (
    <WrapperBlog>
      {blog && (
        <Content>
          <HeaderBlog>
            <Title>{blog.title}</Title>
            <Info>
              <LeftInfo>
                <DatePost>{blog.datePost}</DatePost>
                <ItemSocial>
                  <IconView />
                  <span>{blog.view}</span>
                </ItemSocial>
                <ItemSocial>
                  <IconLike />
                  <span>{blog.like}</span>
                </ItemSocial>
                <ItemSocial>
                  <IconShare />
                  <span>{blog.share}</span>
                </ItemSocial>
              </LeftInfo>
            </Info>
          </HeaderBlog>
          <ContentBlog>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </ContentBlog>
          <FooterBlog>
            <a>Share</a>
            <a>
              <IconFacebookCircle />
            </a>
            <a>
              <IconInstagramCircle />
            </a>
          </FooterBlog>
          {/* <Artical limited={2} /> */}
          <RelativeBlog>
            <RenderListFlex>
              {blogRelative.map((item, index) => (
                <React.Fragment key={index}>
                  {item.id !== 1 && (
                    <Link href={`/news/${item.id}`}>
                      <a>{/* <Blog blog={item} /> */}</a>
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </RenderListFlex>
          </RelativeBlog>
        </Content>
      )}
    </WrapperBlog>
  );
};

Article.defaultConfig = defaultConfig;

// const mapState = (state) => ({
//   modifiedConfig: state.get("modifiedConfig").toJS(),
// });

// export default connect(mapState, null)(Artical);
export default Article;
