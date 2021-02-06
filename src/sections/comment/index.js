import React from "react";
import { WrapperComment, CommentWrapper, WrapperEndpointComment, GroupActor, Actor, WrapperListComment, Avatar } from "./style";
import PointNavigation from "../../components/point-navigation";

const dummyComment = [
  {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sedeiusmod tempor incididunt ut labore et dolore magna",
    actor: "Mimi Ngo",
    job: "Student",
    avatar: "https://s3-media0.fl.yelpcdn.com/buphoto/8raV_jUw44-yVWd7PmM4ww/o.jpg",
  },
  {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sedeiusmod tempor incididunt ut labore et dolore magna",
    actor: "Mimi Ngo",
    job: "Student",
    avatar: "https://s3-media0.fl.yelpcdn.com/buphoto/8raV_jUw44-yVWd7PmM4ww/o.jpg",
  },
];
const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "comment",
  title: "Comment",
  components: {},
};

const Comment = () => {
  return (
    <WrapperComment>
      <WrapperListComment>
        {dummyComment.map((item, index) => (
          <CommentWrapper key={index}>
            <p> {item.content}</p>
            <GroupActor>
              <Avatar>
                <img src={item.avatar} />
              </Avatar>
              <Actor>
                <h5>{item.actor}</h5>
                <h6>{item.job}</h6>
              </Actor>
            </GroupActor>
          </CommentWrapper>
        ))}
      </WrapperListComment>
      {/* <WrapperEndpointComment>
        <PointNavigation size={3} borderColor="#717171" backgroundActive="#717171" currentIndex={1} />
      </WrapperEndpointComment> */}
    </WrapperComment>
  );
};

Comment.defaultConfig = defaultConfig;

export default Comment;
