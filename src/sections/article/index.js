import React from "react";
import Blog from "../../components/blog";
import IconFacebookCircle from "../../components/icons/iconFacebookCircle";
import IconInstagramCircle from "../../components/icons/iconInstagramCircle";
import IconLike from "../../components/icons/iconLike";
import IconShare from "../../components/icons/iconShare";
import IconView from "../../components/icons/iconView";
import RatioImage from "../../components/ratioImage";
import RenderListFlex from "../../components/render-list-flex";
import { blogs } from "../../dummyData/blogs";
import { WrapperBlog, Content, HeaderBlog, ItemSocial, Info, FooterBlog, DatePost, ContentBlog, LeftInfo, RelativeBlog } from "./style";

const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "blog",
  title: "Blog",
  components: {},
};

const Article = ({}) => {
  return (
    <WrapperBlog>
      <Content>
        <HeaderBlog>
          <h3>Thể lệ chương trình: Ăn GoGi, Cơ Hội Trúng 1 Tỷ</h3>
          <Info>
            <LeftInfo>
              <DatePost>01/12/2020</DatePost>
              <ItemSocial>
                <IconView />
                <span>100</span>
              </ItemSocial>
              <ItemSocial>
                <IconLike />
                <span>100</span>
              </ItemSocial>
              <ItemSocial>
                <IconShare />
                <span>100</span>
              </ItemSocial>
            </LeftInfo>
          </Info>
        </HeaderBlog>
        <ContentBlog>
          <RatioImage ratio="16:9">
            <img src="https://toplistsaigon.com/wp-content/uploads/2019/09/nha-hang-do-nuong-o-sai-gon-9.jpg" />
          </RatioImage>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
          </p>
          <ul>
            <li>• Gogi House Mipec Tây Sơn</li>
            <li>• Gogi House Phạm Ngọc Thạch</li>
            <li>• Gogi House Royal City</li>
          </ul>
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
            <a>
              <Blog blog={blogs[1]} />
            </a>
            <a>
              <Blog blog={blogs[2]} />
            </a>
          </RenderListFlex>
        </RelativeBlog>
      </Content>
    </WrapperBlog>
  );
};

Article.defaultConfig = defaultConfig;

// const mapState = (state) => ({
//   modifiedConfig: state.get("modifiedConfig").toJS(),
// });

// export default connect(mapState, null)(Artical);
export default Article;
