import React from "react";
import "swiper/swiper-bundle.css";
import { WrapperComment } from "./style";
import { comments } from "../../dummyData/comments";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import loadable from "@loadable/component";
import { get } from "lodash";
const CommentDesktop = loadable(() => import("./desktop"));
const CommentMobile = loadable(() => import("./mobile"));
const defaultConfig = {
  type: "section",
  code: "comment",
  name: "comment",
  title: "Feedback",
  components: {
    feedback: {
      type: "group",
      title: "Feed Back",
      name: "feedBack",
      defaultConfig: {
        title: {
          type: "textIgnoreLocale",
          title: "Title feedback",
          value: "Title feedback",
          name: "titleFeedback",
        },
        avatar: { type: "image" },
        content: { type: "text", title: "Content", value: { vi: "", en: "" }, name: "titleFeedback" },
        author: { type: "text", title: "Author", value: { vi: "", en: "" }, name: "author" },
        job: { type: "text", title: "Jobs", value: { vi: "", en: "" }, name: "jobs" },
      },
      value: [],
    },
  },
};

const Comment = ({ config = defaultConfig }) => {
  const commentList = get(config, ["components", "feedback", "value"]);
  const [sizeWidth] = useIframeResize();

  return (
    <WrapperComment>
      {sizeWidth.width > 768 ? <CommentDesktop comments={commentList} /> : <CommentMobile comments={commentList} />}
    </WrapperComment>
  );
};
Comment.defaultConfig = defaultConfig;

export default Comment;
