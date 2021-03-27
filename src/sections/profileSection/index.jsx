import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Tabs from "../../components/tabs";
import useSiteRouter from "../../hooks/useSiteRouter";
import { ProfileSectionWrapper } from "./styled";
import { Container, OnePageHorizontalWrapper } from "../../styles";
import OnePageScrollHorizontal from "../../components/one-page-scroll-horizontal";

import ProfileGift from "./profileGift";
import ProfileHistory from "./profileHistory";
import ProfileTab from "./profileTab";
import PromoTab from "./promoTab";
import useRefCallback from "../../hooks/useRefCallback";

const defaultConfig = {
  name: "profileSection",
  title: "Profile Section",
  code: "profileSection",
  id: "profileSection",
  components: {},
};

const items = [
  { icon: "tab-profile", code: "my-profile", label: "profile.title_info_account", Component: ProfileTab },
  { icon: "tab-promo", code: "my-promo", label: "profile.title_my_promo", Component: PromoTab },
  { icon: "tab-history", code: "my-history", label: "profile.title_history_deal", Component: ProfileHistory },
  { icon: "tab-gift", code: "register-promo", label: "profile.title_register_to_get_promo", Component: ProfileGift },
];

const ProfileSection = ({ }) => {
  const router = useSiteRouter();
  const {
    query: { profileTab },
  } = router;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let index = items.findIndex((i) => i.code == profileTab);
    if (index != current) {
      setCurrent(index);
    }
  }, [profileTab]);

  const handlePageChange = useRefCallback((index) => {
    if (index != current) {
      router.pushQuery("/profile?profileTab=" + items[index].code, undefined, { shallow: true });
    }
  }, []);

  return (
    <ProfileSectionWrapper>
      <Tabs items={items} onChange={handlePageChange} current={current} />
      <Container>
        <OnePageScrollHorizontal pageIndex={current} pageOnChange={handlePageChange}>
          {items.map(({ Component }, index) => (
            <OnePageHorizontalWrapper key={index}>
              {current == index && <Component isActive={current == index} />}
            </OnePageHorizontalWrapper>
          ))}
        </OnePageScrollHorizontal>
      </Container>
    </ProfileSectionWrapper>
  );
};

ProfileSection.defaultConfig = defaultConfig;

export default ProfileSection;
