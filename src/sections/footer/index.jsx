import React from "react";
import { Container } from "../../styles";
import {
  Content,
  ContentFooter,
  FooterWrapper,
  LeftContent,
  RightContent,
  WrapperFeature,
  SocialNetwork,
  GroupDownload,
} from "./style";
const defaultConfig = {
  type: "footer",
  name: "footer",
  title: "Default Footer",
  components: {
    socialNetwork: {
      type: "group",
      title: "Social Network",
      name: "socialNetwork",
      defaultConfig: {
        text: { type: "text", title: "Text", value: { vi: "Instagram", en: "Instagram" }, name: "text" },
        icon: { type: "image" },
        link: {
          type: "link",
          name: "link",
          title: "Link",
          value: {
            url: "/",
          },
        },
      },
      value: [
        {
          text: { type: "text", title: "Text", value: { vi: "Facebook", en: "Facebook" }, name: "text" },
          icon: { type: "image", name: "Facebook" },
          link: {
            type: "link",
            name: "link",
            title: "Link",
            value: {
              label: { vi: "Facebook", en: "Facebook" },
              url: "https://www.facebook.com/GoGiHouse.QuanThitNuongHanQuoc",
            },
          },
        },
        {
          text: { type: "text", title: "Text", value: { vi: "Youtube", en: "Youtube" }, name: "text" },
          icon: { type: "image", name: "Youtube" },
          link: {
            type: "link",
            name: "link",
            title: "Link",
            value: {
              label: { vi: "Youtube", en: "Youtube" },
              url: "https://www.youtube.com/channel/UCd3-QS4vCFnPvAEEpKwgNIw",
            },
          },
        },
        {
          text: { type: "text", title: "Text", value: { vi: "Instagram", en: "Instagram" }, name: "text" },
          icon: { type: "image", name: "Instagram" },
          link: {
            type: "link",
            name: "link",
            title: "Link",
            value: {
              label: { vi: "Instagram", en: "Instagram" },
              url: "https://www.instagram.com/gogihouse.official",
            },
          },
        },
      ],
    },
  },
};

const Footer = ({ config = defaultConfig }) => {
  const { components } = config;
  const { socialNetwork } = components;
  return (
    <FooterWrapper>
      <Container>
        <WrapperFeature>
          <h3>Tải App The Golden Spoon</h3>
          <GroupDownload>
            <a>
              <img width={190} height={60} src="/images/appstore.jpg" />
            </a>
            <a>
              <img width={190} height={60} src="/images/googleplay.jpg" />
            </a>
          </GroupDownload>
          <h6>
            The Golden Spoon – Siêu ứng dụng cho tín đồ ẩm thực.
            <br /> Tải App Hôm Nay Chạm Ngay Ưu Đãi.
          </h6>
          <SocialNetwork>
            {socialNetwork.value.map((item, key) => (
              <a target="_blank" href={item.link.value.url} key={key}>
                <img src={item.icon.value.url} />
              </a>
            ))}
          </SocialNetwork>
        </WrapperFeature>
      </Container>
      <ContentFooter>
        <Container>
          <Content>
            <LeftContent>
              <h6>
                Công ty Cổ phần Thương mại Dịch vụ Cổng Vàng
                <br />
                Trụ sở chính: Số 60 Phố Giang Văn Minh, Phường Đội Cấn,
                <br /> Quận Ba Đình, Thành phố Hà Nội, Việt Nam
                <br /> GPĐK: 0102721191 cấp ngày 09/04/2008
                <br /> ĐT: 043 222 3000 Email: support.hn@ggg.com.vi
              </h6>
            </LeftContent>
            <RightContent>
              <img width={126} height={48} src="/images/icon_bct.png" />
              <h6> © 2011 Golden Gate ., JSC. All rights reserved</h6>
            </RightContent>
          </Content>
        </Container>
      </ContentFooter>
    </FooterWrapper>
  );
};

Footer.defaultConfig = defaultConfig;

export default Footer;
