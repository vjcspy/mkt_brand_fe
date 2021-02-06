import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useState } from "react";
import Tabs from "../../components/tabs";
import useHistory from "../../hooks/useHistory";
import useSiteRouter from "../../hooks/useSiteRouter";
import { getBrowserLink } from "../../services/frontend";
import { Container } from "../../styles";
import ProfileGift from "./profileGift";
import ProfileHistory from "./profileHistory";
import ProfileTab from "./profileTab";
import PromoTab from "./promoTab";
import { ProfileSectionWrapper } from "./styled";

const defaultConfig = {
  name: "profileSection",
  title: "Profile Section",
  code: "profileSection",
  id: "profileSection",
  components: {},
};

const items = [
  { icon: "tab-profile", code: "my-profile", label: "Thông tin tài khoản", Component: ProfileTab },
  { icon: "tab-promo", code: "my-promo", label: "Ưu đãi của tôi", Component: PromoTab },
  { icon: "tab-history", code: "my-history", label: "Lịch sử giao dịch", Component: ProfileHistory },
  { icon: "tab-gift", code: "register-promo", label: "Đăng ký nhận tin ưu đãi", Component: ProfileGift },
];

const ProfileSection = ({}) => {
  const router = useSiteRouter();
  const {
    query: { tab },
  } = router;
  const [state, history] = useHistory();
  const [current, setCurrent] = useState(0);
  const Component = items[current]?.Component;

  useEffect(() => {
    let index = items.findIndex((i) => i.code == tab);
    if (index > -1) {
      setCurrent(index);
    }
  }, [tab]);

  return (
    <ProfileSectionWrapper>
      <Tabs
        items={items}
        onChange={(index) => {
          if (index === current) {
            return;
          }
          router.push("/profile/" + items[index].code, undefined, { shallow: true });
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
