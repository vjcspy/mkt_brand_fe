import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { CommentWrapper, WrapperEndpointComment, GroupActor, Actor, Avatar } from "./style";
import PointNavigation from "../../components/point-navigation";
import { useSelector } from "react-redux";

const CommentMobile = ({ comments }) => {
  const [currentSlideMobile, setCurrentSlideMobile] = useState(0);
  const locale = useSelector((s) => s.get("locale"));

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
              <p> {item.content.value[locale]}</p>
              <GroupActor>
                <Avatar>
                  <img width={90} height={90} src={item.avatar.value?.url} />
                </Avatar>
                <Actor>
                  <h5>{item.author.value[locale]}</h5>
                  <h6>{item.job.value[locale]}</h6>
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
