import React from "react";
import "swiper/swiper-bundle.css";
import { WrapperComment } from "./style";
import { comments } from "../../dummyData/comments";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import loadable from "@loadable/component";
const CommentDesktop = loadable(() => import("./desktop"));
const CommentMobile = loadable(() => import("./mobile"));
const defaultConfig = {
  type: "section",
  code: "comment",
  name: "comment",
  title: "Comment",
  components: {},
};

const Comment = () => {
  const [sizeWidth] = useIframeResize();

  return (
    <WrapperComment>
      {sizeWidth.width > 768 ? <CommentDesktop comments={comments} /> : <CommentMobile comments={comments} />}
    </WrapperComment>
  );
};
Comment.defaultConfig = defaultConfig;

export default Comment;
