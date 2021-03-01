import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { CommentWrapper, WrapperEndpointComment, GroupActor, Actor, Avatar } from "./style";
import PointNavigation from "../../components/point-navigation";

const CommentMobile = ({ comments }) => {
  const [currentSlideMobile, setCurrentSlideMobile] = useState(0);

  return (
    <>
      <Swiper
        slidesPerView={1}
        onSlideChange={(index) => setCurrentSlideMobile(index?.activeIndex)}
        // onSwiper={(swiper) => console.log("oko")}
      >
        {comments.map((item, index) => (
          <SwiperSlide key={index}>
            <CommentWrapper key={index}>
              <p> {item.content}</p>
              <GroupActor>
                <Avatar>
                  <img width={90} height={90} src={item.avatar} />
                </Avatar>
                <Actor>
                  <h5>{item.actor}</h5>
                  <h6>{item.job}</h6>
                </Actor>
              </GroupActor>
            </CommentWrapper>
          </SwiperSlide>
        ))}
      </Swiper>
      <WrapperEndpointComment>
        <PointNavigation
          className="point-pagination-promo"
          sizeAfter={7}
          display="inline-block"
          size={comments.length}
          currentIndex={currentSlideMobile}
          borderColor="#7B7979"
          backgroundActive="#7B7979"
        />
      </WrapperEndpointComment>
    </>
  );
};

export default CommentMobile;
