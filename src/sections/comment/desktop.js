import React, { useState, useEffect, useRef } from "react";
import "swiper/swiper-bundle.css";
import { useSelector } from "react-redux";
import {
  CommentWrapper,
  WrapperEndpointComment,
  GroupActor,
  Actor,
  WrapperListComment,
  Avatar,
  ListComment,
} from "./style";
import PointNavigation from "../../components/point-navigation";
import IconTriangleLineLeft from "../../components/icons/iconTriangleLineLeft";
import IconTriangleLineRight from "../../components/icons/iconTriangleLineRight";

const CommentDesktop = ({ comments }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transform, setTransform] = useState("translateX(0%)");
  const refWrapper = useRef();
  const locale = useSelector((s) => s.get("locale"));

  useEffect(() => {
    if (currentSlide > 0) {
      setTransform(`translateX(calc(-${currentSlide * 100}% - ${currentSlide * 40}px))`);
    } else {
      setTransform("translateX(0%)");
    }
  }, [currentSlide]);

  const onNext = () => {
    if (currentSlide < comments.length / 2 - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };
  const onPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(comments.length / 2 - 1);
    }
  };

  return (
    <>
      <WrapperListComment ref={refWrapper}>
        <ListComment style={{ transform: transform }}>
          {comments.map((item, index) => (
            <CommentWrapper key={index}>
              <p> {item.content.value[locale]}</p>
              <GroupActor>
                <Avatar>
                  <img width={90} height={90} src={item.avatar.value.url} />
                </Avatar>
                <Actor>
                  <h5>{item.author.value[locale]}</h5>
                  <h6>{item.job.value[locale]}</h6>
                </Actor>
              </GroupActor>
            </CommentWrapper>
          ))}
        </ListComment>
      </WrapperListComment>
      {comments.length / 2 > 2 && (
        <WrapperEndpointComment>
          <IconTriangleLineLeft className="left" width={14} height={14} onClick={onPrev} />
          <PointNavigation
            className="point-pagination-promo"
            sizeAfter={7}
            display="inline-block"
            size={comments.length / 2}
            currentIndex={currentSlide}
            borderColor="#7B7979"
            backgroundActive="#7B7979"
          />
          <IconTriangleLineRight className="right" width={14} height={14} onClick={onNext} />
        </WrapperEndpointComment>
      )}
    </>
  );
};

export default CommentDesktop;
