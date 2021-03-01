import React, { useState, useRef, useEffect } from "react";
import { MarkerList, GroupButton, List, WrapperFlex, PromoProfile, WrapperIcon, Title, ImageWrapper, WrapperSlideList } from "./style";

import RatioImage from "../../../components/ratioImage";
import Button from "../../../components/button";
import IconRightCicle from "../../../components/icons/iconRightCicle";
import IconLeftCircle from "../../../components/icons/iconLeftCircle";
import useIframeResize from "../../../hooks/useWindowResize/useIframeResize";
import { FormattedMessage } from "react-intl";
import PopupPromo from "../../../components/popup-promo";

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
      <WrapperIcon className="left" onClick={onPre}>
        <IconLeftCircle />
      </WrapperIcon>
      <WrapperSlideList>
        <List numItem={length} ref={refScroll} style={{ transform: `translateX(-${translate}px)` }}>
          {profilePromo?.map((item, index) => (
            <PromoProfile key={index} ref={refItem}>
              <ImageWrapper>
                <RatioImage>
                  <img width={364} height={364} src={item.image} />
                </RatioImage>
              </ImageWrapper>
              <Title>{item.title}</Title>
              <WrapperFlex>
                <h5>
                  <FormattedMessage id="profile.promo_location" />
                </h5>
                <p>{item.location}</p>
              </WrapperFlex>
              <WrapperFlex>
                <h5>
                  <FormattedMessage id="profile.promo_date_of_promo" />
                </h5>
                <p>{item.date}</p>
              </WrapperFlex>
              <GroupButton>
                <Button varian="outline" onClick={() => setCurrentPromo(item)}>
                  <FormattedMessage id="profile.promo_view_detail" />
                </Button>
                <Button>
                  <FormattedMessage id="profile.promo_reservation" />
                </Button>
              </GroupButton>
            </PromoProfile>
          ))}
        </List>
      </WrapperSlideList>

      <WrapperIcon className="right" onClick={onNext}>
        <IconRightCicle />
      </WrapperIcon>
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
