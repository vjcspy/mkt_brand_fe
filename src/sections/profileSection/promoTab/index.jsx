import React, { useState } from "react";
import {
  MarkerList,
  GroupButton,
  List,
  WrapperFlex,
  PromoMobile,
  WrapperProfilePromo,
  PromoProfile,
  WrapperIcon,
  Title,
  WrapperEndpoint,
  WrapperScroller,
  ImageWrapper,
  ContentMobile,
} from "./style";
import { useSelector } from "react-redux";

import { profilePromo } from "../../../dummyData/profilePromo";
import RatioImage from "../../../components/ratioImage";
import Button from "../../../components/button";
import IconRightCicle from "../../../components/icons/iconRightCicle";
import IconLeftCircle from "../../../components/icons/iconLeftCircle";
import useIframeResize from "../../../hooks/useWindowResize/useIframeResize";
import Popup from "../../../components/popup-wrapper";
import DetailPromo from "../../../components/detail-promo";
import ReactPageScroller from "../../../../plugins/react-page-scroller";
import PointNavigation from "../../../components/point-navigation";
import PopupMobile from "../../../components/popup-wrapper-mobile";

const PromoTab = ({}) => {
  const [sizeWidth, ref] = useIframeResize();
  const [currentPromo, setCurrentPromo] = useState();
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPromoMobile, setPromoMobile] = useState();
  return (
    <WrapperProfilePromo className="promo-tab">
      {sizeWidth.width > 768 ? (
        <MarkerList ref={ref}>
          <WrapperIcon className="left">
            <IconLeftCircle />
          </WrapperIcon>
          <List>
            {profilePromo?.map((item, index) => (
              <PromoProfile key={index}>
                <ImageWrapper>
                  <RatioImage>
                    <img src={item.image} />
                  </RatioImage>
                </ImageWrapper>
                <Title>{item.title}</Title>
                <WrapperFlex>
                  <h5>Khu vực</h5>
                  <p>{item.location}</p>
                </WrapperFlex>
                <WrapperFlex>
                  <h5>Thời gian áp dụng</h5>
                  <p>{item.date}</p>
                </WrapperFlex>
                <GroupButton>
                  <Button varian="outline" onClick={() => setCurrentPromo(item)}>
                    Xem chi tiết
                  </Button>
                  <Button>Đặt bàn ngay</Button>
                </GroupButton>
              </PromoProfile>
            ))}
          </List>
          <WrapperIcon className="right">
            <IconRightCicle />
          </WrapperIcon>
          {currentPromo && (
            <Popup show={currentPromo} onClose={() => setCurrentPromo(null)}>
              <DetailPromo promo={currentPromo} />
            </Popup>
          )}
        </MarkerList>
      ) : (
        <PromoMobile style={{ height: `calc(100vh - (${headerHeight + 96 ?? 0}px ` }}>
          <h3>Ưu đãi của tôi</h3>
          <WrapperScroller>
            <ReactPageScroller
              className="scroller"
              containerHeight={`calc(100vh - (${headerHeight + 301 ?? 0}px ))`}
              pageOnChange={setCurrentPage}
            >
              {profilePromo.map((item, index) => (
                <RatioImage key={index} ratio="1:1">
                  <img src={item.image} />
                </RatioImage>
              ))}
            </ReactPageScroller>
            <WrapperEndpoint>
              <PointNavigation display="block" size={profilePromo.length} currentIndex={currentPage} />
            </WrapperEndpoint>
          </WrapperScroller>
          <ContentMobile>
            <h4>{profilePromo[currentPage].title}</h4>
            <WrapperFlex>
              <h5>Khu vực</h5>
              <span>{profilePromo[currentPage]?.location}</span>
            </WrapperFlex>
            <WrapperFlex>
              <h5>Thời gian áp dụng</h5>
              <span>{profilePromo[currentPage]?.date}</span>
            </WrapperFlex>
            <GroupButton>
              <Button varian="outline" onClick={() => setPromoMobile(profilePromo[currentPage])}>
                Xem chi tiết
              </Button>
              <Button>Đặt bàn ngay</Button>
            </GroupButton>
          </ContentMobile>
          {currentPromoMobile && (
            <PopupMobile step={0} onCLose={setPromoMobile}>
              <div>
                <DetailPromo promo={currentPromoMobile} />
              </div>
            </PopupMobile>
          )}
        </PromoMobile>
      )}
    </WrapperProfilePromo>
  );
};

export default PromoTab;
