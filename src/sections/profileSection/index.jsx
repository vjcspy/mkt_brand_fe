import React, { useEffect, useState } from "react";
import loadable from "@loadable/component";
import Tabs from "../../components/tabs";
import useSiteRouter from "../../hooks/useSiteRouter";
import { ProfileSectionWrapper } from "./styled";
import { Container } from "../../styles";
const ProfileGift = loadable(() => import("./profileGift"));
const ProfileHistory = loadable(() => import("./profileHistory"));
const ProfileTab = loadable(() => import("./profileTab"));
const PromoTab = loadable(() => import("./promoTab"));

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

const ProfileSection = ({}) => {
  const router = useSiteRouter();
  const {
    query: { tab, subPage },
  } = router;
  const [current, setCurrent] = useState(0);
  const Component = items[current]?.Component;

  useEffect(() => {
    let index = items.findIndex((i) => i.code == (tab || subPage));
    if (index > -1) {
      setCurrent(index);
    }
  }, [tab, subPage]);

  return (
    <ProfileSectionWrapper>
      <Tabs
        items={items}
        onChange={(index) => {
          if (index === current) {
            return;
          }
          router.pushQuery("/profile/" + items[index].code, undefined, { shallow: true });
          // const link = getBrowserLink(site, "/profile/" + items[index].code);
          // history.push({ tab: items[index].code }, items[index].label, link);
        }}
        current={current}
      />
      <Container>{Component ? <Component /> : null}</Container>
    </ProfileSectionWrapper>
  );
};

ProfileSection.defaultConfig = defaultConfig;

export default ProfileSection;
