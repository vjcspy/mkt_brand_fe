import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Tabs from "../../components/tabs";
import useSiteRouter from "../../hooks/useSiteRouter";
import { ProfileSectionWrapper, CustomContainer } from "./styled";
import { OnePageHorizontalWrapper } from "../../styles";
import OnePageScrollHorizontal from "../../components/one-page-scroll-horizontal";

import ProfileGift from "./profileGift";
import ProfileHistory from "./profileHistory";
import ProfileTab from "./profileTab";
import PromoTab from "./promoTab";
import useRefCallback from "../../hooks/useRefCallback";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import PopupMobile from "../../components/popup-wrapper-mobile";
import { WrapperContentPopup } from "../../components/popup-wrapper-mobile/style";
import ViewDetail from "./profileHistory/viewDetail";
import DetailPromo from "../../components/detail-promo";
import ListCondition from "../promoSection/Conditions";
import ListRestaurantBooking from "../../components/list-restaurant/list-restaurant-booking";
import ViewMapRestaurant from "../../components/view-map-restaurant";

const defaultConfig = {
  name: "profileSection",
  title: "Profile Section",
  code: "profileSection",
  id: "profileSection",
  components: {
    imageRegister: {
      type: "image", title: "Image Tab Register", value: null,
    }
  },
};

const items = [
  { icon: "tab-profile", code: "my-profile", label: "profile.title_info_account", Component: ProfileTab },
  { icon: "tab-promo", code: "my-promo", label: "profile.title_my_promo", Component: PromoTab },
  { icon: "tab-history", code: "my-history", label: "profile.title_history_deal", Component: ProfileHistory },
  { icon: "tab-gift", code: "register-promo", label: "profile.title_register_to_get_promo", Component: ProfileGift },
];

const ProfileSection = ({ config = defaultConfig }) => {
  const { imageRegister } = config.components
  const router = useSiteRouter();
  const [size] = useIframeResize();

  const [transactionMobile, setTransaction] = useState()

  const {
    query: { profileTab },
  } = router;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (profileTab) {
      let index = items.findIndex((i) => i.code == profileTab);
      if (index != current) {
        setCurrent(index);
      }
    }
  }, [profileTab]);

  const handlePageChange = useRefCallback((index) => {
    if (index != current) {
      router.pushQuery("/profile?profileTab=" + items[index].code, undefined, { shallow: true });
    }
  }, []);

  const [promoDetailMobile, setDetailPromoMobile] = useState()
  const [stepFlowPopupMobile, setStepFlowPopupMobile] = useState(0);
  const [showConditionOrRestaurant, setShowConditionOrRestaurant] = useState(true);
  const [viewRestaurant, setViewRestaurant] = useState();
  const onBackPopup = () => {
    if (stepFlowPopupMobile === 0) {
      setStepFlowPopupMobile(0);
      setDetailPromoMobile(null);
    } else {
      setStepFlowPopupMobile(stepFlowPopupMobile - 1);
    }
  };

  const onViewMap = (restaurant) => {
    setStepFlowPopupMobile(2);
    setViewRestaurant(restaurant);
  };

  const onShowListRestaurant = () => {
    setShowConditionOrRestaurant(true);
    setStepFlowPopupMobile(1);
  };
  const onShowListCondition = () => {
    setShowConditionOrRestaurant(false);
    setStepFlowPopupMobile(1);
  };




  return (
    <ProfileSectionWrapper>
      <Tabs items={items} onChange={handlePageChange} current={current} />
      <CustomContainer>
        {size?.width > 768 ? (
          <>
            {items.map(({ Component }, index) => (
              current == index && <Component imageRegister={imageRegister} key={index} isActive={current == index} />
            ))}
          </>
        ) : (
          <OnePageScrollHorizontal heightChildren={true} pageIndex={current} pageOnChange={handlePageChange}>
            {items.map(({ Component }, index) => (
              <OnePageHorizontalWrapper key={index}>
                {current == index && <Component setDetailPromoMobile={setDetailPromoMobile} setTransaction={setTransaction} imageRegister={imageRegister} isActive={current == index} />}
              </OnePageHorizontalWrapper>
            ))}
          </OnePageScrollHorizontal>
        )}


      </CustomContainer>
      {size?.width <= 768 && (
        <>
          <PopupMobile show={transactionMobile} step={0} onBack={() => setTransaction(false)}>
            <WrapperContentPopup>
              <ViewDetail transition={transactionMobile} />
            </WrapperContentPopup>
          </PopupMobile>

          <PopupMobile show={promoDetailMobile} step={stepFlowPopupMobile} onBack={onBackPopup}>
            <WrapperContentPopup>
              <DetailPromo
                promo={promoDetailMobile}
                onShowListRestaurant={onShowListRestaurant}
                onShowListCondition={onShowListCondition}
              />
            </WrapperContentPopup>

            <WrapperContentPopup style={{ height: "100%" }}>
              {showConditionOrRestaurant ? (
                <ListRestaurantBooking
                  onBook={onViewMap}
                  currentPage="profile-promo"
                  promoId={promoDetailMobile?.promotionId}
                  listRestaurant={promoDetailMobile?.restaurants}
                  onViewMap={onViewMap}
                />
              ) : (
                <ListCondition listCondition={promoDetailMobile?.condition} />
              )}
            </WrapperContentPopup>

            <WrapperContentPopup restaurant={promoDetailMobile?.restaurants} style={{ height: "100%" }}>
              <ViewMapRestaurant restaurant={viewRestaurant} />
            </WrapperContentPopup>
          </PopupMobile>
        </>
      )}
    </ProfileSectionWrapper>
  );
};

ProfileSection.defaultConfig = defaultConfig;

export default ProfileSection;
