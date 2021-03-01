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
  name: "blog",
  title: "",
  components: {},
};

const Article = ({ article }) => {
  const idBlog = useSelector((state) => state.get("idBlog"));
  const data = article ?? blogs.find((item) => item.id === idBlog);
  let count = 0;
  const blogRelative = useMemo(() => {
    return blogs.filter((item) => {
      if (item.id !== idBlog && count < 2) {
        count++;
        return item;
      }
    }, []);
  }, [idBlog]);
  return (
    <WrapperBlog>
      {data && (
        <Content>
          <HeaderBlog>
            <Title>{data.title}</Title>
            <Info>
              <LeftInfo>
                <DatePost>{data.datePost}</DatePost>
                <ItemSocial>
                  <IconView />
                  <span>{data.view}</span>
                </ItemSocial>
                <ItemSocial>
                  <IconLike />
                  <span>{data.like}</span>
                </ItemSocial>
                <ItemSocial>
                  <IconShare />
                  <span>{data.share}</span>
                </ItemSocial>
              </LeftInfo>
            </Info>
          </HeaderBlog>
          <ContentBlog>
            <Banner>
              <RatioImage ratio="16:9">
                <img width={1024} height={500} src={data.banner} />
              </RatioImage>
            </Banner>
            <div dangerouslySetInnerHTML={{ __html: data.content.join("") }} />
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
                  {item.id !== idBlog && (
                    <Link href={`/news/${item.id}`}>
                      <a>
                        <Blog blog={item} />
                      </a>
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
