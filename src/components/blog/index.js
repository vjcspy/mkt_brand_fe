import React from "react";
import { WrapperBlog, WrapperImage, Title, DetailInfo, LeftInfo, Rating, DatePost, ItemSocial } from "./style";
import IconLike from "../icons/iconLike";
import IconView from "../icons/iconView";
import IconShare from "../icons/iconShare";
import RatioImage from "../ratioImage";
import IconStar from "../icons/iconStar";

const Blog = ({ blog }) => {
  return (
    <WrapperBlog>
      <WrapperImage>
        <RatioImage>
          <img src={blog?.avatar?.url} width={500} height={500} alt="" />
        </RatioImage>
      </WrapperImage>
      <Title>{blog.title}</Title>
      <DetailInfo>
        <LeftInfo>
          {/* <DatePost>{blog.datePost}</DatePost> */}
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
        {/* {blog.rating && (
          <Rating>
            <IconStar />
          </Rating>
        )} */}
      </DetailInfo>
    </WrapperBlog>
  );
};

export default Blog;
