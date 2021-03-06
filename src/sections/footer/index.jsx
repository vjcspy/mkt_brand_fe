import React from "react";
import { Container } from "../../styles";
import ListBrand from "../list-brand";
import {
  ContentTop,
  ContentFooter,
  FooterWrapper,
  WrapperFeature,
  FlexWrapper,
  SocialNetwork,
  GroupDownload,
  WrapperInfo,
  WrapperListIcon,
  ContentBottom,
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
        text: { type: "text", title: "Text", value: { vi: "Social Network", en: "Social Network" }, name: "text" },
        icon: { type: "image", value: null },
        link: {
          type: "link",
          name: "link",
          title: "Link",
          value: {
            label: { vi: "Social Network", en: "Social Network" },
            url: "/",
          },
        },
      },
      value: [
        {
          text: { type: "text", title: "Text", value: { vi: "Facebook", en: "Facebook" }, name: "text" },
          icon: { type: "image", name: "Facebook", value: null },
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
          icon: { type: "image", name: "Youtube", value: null },
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
          icon: { type: "image", name: "Instagram", value: null },
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
    dynamicContent: {},
  },
};

const Footer = ({ config = defaultConfig }) => {
  const { components } = config;
  const { socialNetwork } = components;
  return (
    <FooterWrapper>
      <Container>
        <WrapperFeature>
          <h3>T???i App The Golden Spoon</h3>
          <GroupDownload>
            <a>
              <img width={190} height={60} src="/images/appstore.jpg" />
            </a>
            <a>
              <img width={190} height={60} src="/images/googleplay.jpg" />
            </a>
          </GroupDownload>
          <h5>Si??u ???ng d???ng cho t??n ????? ???m th???c. </h5>
        </WrapperFeature>
      </Container>
      <ListBrand />

      <ContentFooter>
        <Container>
          <ContentTop>
            <WrapperInfo>
              <img className="logo-golden" src="/images/logo_goldengate.svg" />
              <h6 className="main-layout">
                C??ng ty C??? ph???n Th????ng m???i D???ch v??? C???ng V??ng
                <br /> S??? 60 Giang V??n Minh, Qu???n Ba ????nh, H?? N???i
              </h6>
              <FlexWrapper>
                <h6>
                  <img src="/images/ic/ic_phone_footer.svg" />
                  043 222 3000
                </h6>
                <h6>
                  <img src="/images/ic/ic_mail_footer.svg" />
                  Email: support.hn@ggg.com.vn
                </h6>
              </FlexWrapper>
            </WrapperInfo>
            <WrapperListIcon>
              <h6>K???t n???i v???i ch??ng t??i</h6>
              <SocialNetwork>
                {socialNetwork.value.map((item, key) => (
                  <a target="_blank" href={item.link?.value?.url} key={key}>
                    <img src={item.icon.value?.url} />
                  </a>
                ))}
              </SocialNetwork>
            </WrapperListIcon>
            <hr />
          </ContentTop>
          <hr />
          <ContentBottom>
            <h6 className="info-desktop">
              ?? 2011 B???n quy???n c???a C??ng ty C??? ph???n Th????ng m???i D???ch v??? C???ng V??ng <br /> Gi???y ch???ng nh???n ????ng k?? Kinh
              doanh s??? 0102721191 c???p ng??y 09/04/2008
            </h6>
            <h5 className="info-mobile">?? 2011 Golden Gate Restaurant Group</h5>
            <img width={126} height={48} src="/images/icon_bct.png" />
          </ContentBottom>
        </Container>
      </ContentFooter>
    </FooterWrapper>
  );
};

Footer.defaultConfig = defaultConfig;

export default Footer;
