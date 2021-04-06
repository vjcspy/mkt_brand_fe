import React, { useState, useRef, useEffect } from "react";
import {
  MarkerList,
  GroupButton,
  List,
  WrapperFlex,
  PromoProfile,
  WrapperIcon,
  Title,
  ImageWrapper,
  WrapperSlideList,
} from "./style";

import RatioImage from "../../../components/ratioImage";
import Button from "../../../components/button";
import IconRightCicle from "../../../components/icons/iconRightCicle";
import IconTriangleLineRight from "../../../components/icons/iconTriangleLineRight";
import useIframeResize from "../../../hooks/useWindowResize/useIframeResize";
import { FormattedMessage } from "react-intl";
import PopupPromo from "../../../components/popup-promo";
import Link from "next/link";

const PromoTabDesktop = ({ profilePromo }) => {
  const [sizeWidth, ref] = useIframeResize();
  const [currentPromo, setCurrentPromo] = useState();
  const length = profilePromo?.length ?? 0;
  const refScroll = useRef();
  const refItem = useRef();
  const [translate, setTranslate] = useState(0);
  const [listScroll, setListScroll] = useState({});
  useEffect(() => {
    if (refScroll.current) {
      const totalWidth = refScroll.current.scrollWidth;
      const clientWidth = refScroll.current.clientWidth;
      setListScroll({
        totalWidth,
        clientWidth,
      });
    }
  }, [sizeWidth]);

  const onNext = () => {
    if (listScroll.totalWidth === listScroll.clientWidth) return;
    if (translate >= listScroll.totalWidth - (refItem.current.clientWidth + 40) + 40) {
      setTranslate(translate);
    } else {
      setTranslate(translate + refItem.current.clientWidth + 40);
    }
  };

  const onPre = () => {
    if (translate > listScroll.clientWidth) {
      setTranslate(translate - refItem.current.clientWidth - 40);
    } else {
      setTranslate(0);
    }
  };

  return (
    <MarkerList ref={ref}>
      {length > 2 && (
        <WrapperIcon className="left" onClick={onPre}>
          <IconTriangleLineRight color="#7B7979" width={15} height={15} />
        </WrapperIcon>
      )}
      <WrapperSlideList>
        <List numItem={length} ref={refScroll} style={{ transform: `translateX(-${translate}px)` }}>
          {profilePromo?.map((item, index) => (
            <PromoProfile key={index} ref={refItem}>
              <ImageWrapper>
                <RatioImage>
                  <img width={364} height={364} src={item?.promotionThumbnail} />
                </RatioImage>
              </ImageWrapper>
              <Title>{item?.promotionTitle}</Title>
              <WrapperFlex>
                <h5>
                  <FormattedMessage id="profile.promo_location" />
                </h5>
                <p>{item?.location}</p>
              </WrapperFlex>
              <WrapperFlex>
                <h5>
                  <FormattedMessage id="profile.promo_date_of_promo" />
                </h5>
                <p>{item?.startDate}</p>
              </WrapperFlex>
              <GroupButton>
                <Button varian="outline" onClick={() => setCurrentPromo(item)}>
                  <FormattedMessage id="profile.promo_view_detail" />
                </Button>
                <Link href="https://booking.ggg.com.vn" passHref>
                  <a class="booking-profile" target="_blank" href="https://booking.ggg.com.vn">
                    <Button>
                      <FormattedMessage id="profile.promo_reservation" />
                    </Button>
                  </a>
                </Link>
              </GroupButton>
            </PromoProfile>
          ))}
        </List>
      </WrapperSlideList>
      {length > 2 && (
        <WrapperIcon className="right" onClick={onNext}>
          <IconTriangleLineRight color="#7B7979" width={15} height={15} />
        </WrapperIcon>
      )}

      {currentPromo && (
        // <Popup show={currentPromo} onClose={() => setCurrentPromo(null)}>
        //   <DetailPromo promo={currentPromo} />
        // </Popup>
        <PopupPromo promo={currentPromo} onClose={setCurrentPromo} />
      )}
    </MarkerList>
  );
};

export default PromoTabDesktop;
