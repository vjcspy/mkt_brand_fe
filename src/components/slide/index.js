import React, { useState, useEffect } from "react";
import { ContentSlide, ItemSlide, ListSlides, WrapperIcon, WrapperSlide } from "./style";
import IconTriangleLineLeft from "../icons/iconTriangleLineLeft";
import IconTriangleLineRight from "../icons/iconTriangleLineRight";
import Button from "../button";
const Slide = ({ slides, current = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(current);
  const [transition, setTransition] = useState("0.3s");
  const [key, setKey] = useState();
  const size = slides?.length ?? 0;

  const onNext = () => {
    if (currentIndex >= size - 1) {
      setTransition("0.3s");
      setCurrentIndex(size);
      setTimeout(() => {
        setTransition("0s");
        setCurrentIndex(0);
      }, 300);
    } else {
      setTransition("0.3s");
      setCurrentIndex(currentIndex + 1);
    }
  };

  const onPrev = () => {
    if (currentIndex <= 0) {
      setTransition("0s");
      setCurrentIndex(size);
      setTimeout(() => {
        setTransition("0.3s");
        setCurrentIndex(size - 1);
      }, 300);
    } else {
      setTransition("0.3s");
      setCurrentIndex(currentIndex - 1);
    }
  };

  return size > 0 ? (
    <WrapperSlide className={`${size === 1 ? "center" : ""}`}>
      {size > 1 && (
        <WrapperIcon onClick={onPrev}>
          <IconTriangleLineLeft width={15} height={15} />
        </WrapperIcon>
      )}
      <ContentSlide>
        <ListSlides style={{ transform: `translateX(${-Math.abs(currentIndex * 100)}%)`, transition: `${transition}` }}>
          <>
            {slides?.map((item, index) => (
              <ItemSlide key={index}>
                {item.text.value}&nbsp;
                <Button varian="link" href={item.link.value?.url}>
                  {item.link.value?.label}
                </Button>
              </ItemSlide>
            ))}
            <ItemSlide>
              {slides[0]?.text.value}&nbsp;
              <Button varian="link" href={slides[0]?.link.value?.url}>
                {slides[0]?.link.value?.label}
              </Button>
            </ItemSlide>
          </>
        </ListSlides>
      </ContentSlide>
      {size > 1 && (
        <WrapperIcon onClick={onNext}>
          <IconTriangleLineRight width={15} height={15} />
        </WrapperIcon>
      )}
    </WrapperSlide>
  ) : null;
};

export default Slide;
