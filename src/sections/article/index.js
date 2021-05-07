import React, { useEffect, useRef, useState } from "react";
import IconFacebookCircle from "../../components/icons/iconFacebookCircle";
import IconInstagramCircle from "../../components/icons/iconInstagramCircle";
import IconLike from "../../components/icons/iconLike";
import IconShare from "../../components/icons/iconShare";
import IconView from "../../components/icons/iconView";
import StyledFrame from "react-styled-frame";

import {
  WrapperBlog,
  Title,
  Content,
  HeaderBlog,
  ItemSocial,
  Info,
  FooterBlog,
  DatePost,
  ContentBlog,
  LeftInfo,
} from "./style";

const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "blog-detail",
  title: "",
  components: {},
};

const Article = ({ blog }) => {
  const refIframe = useRef();
  const [height, setHeight] = useState();
  // const blogRelative = useMemo(() => {
  //   return blogs.filter((item) => {
  //     if (item.id !== 1 && count < 2) {
  //       count++;
  //       return item;
  //     }
  //   }, []);
  // }, []);
  useEffect(() => {
    setTimeout(() => {
      if (refIframe.current) {
        const height = refIframe.current?.scrollHeight;
        setHeight(height);
        console.log(height);
      }
    }, 100);
  }, [blog]);
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
            <div ref={refIframe} dangerouslySetInnerHTML={{ __html: blog.content }} />
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
          {/* <RelativeBlog>
            <RenderListFlex>
              
            </RenderListFlex>
          </RelativeBlog> */}
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
