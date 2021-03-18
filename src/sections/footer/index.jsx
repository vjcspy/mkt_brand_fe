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
        icon: { type: "image" },
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
          <h5>Siêu ứng dụng cho tín đồ ẩm thực. </h5>
        </WrapperFeature>
      </Container>
      <ListBrand />

      <ContentFooter>
        <Container>
          <ContentTop>
            <WrapperInfo>
              <img class="logo-golden" src="/images/logo_goldengate.svg" />
              <h6 class="main-layout">
                Công ty Cổ phần Thương mại Dịch vụ Cổng Vàng
                <br /> Số 60 Giang Văn Minh, Quận Ba Đình, Hà Nội
              </h6>
              <FlexWrapper>
                <h6>
                  <img src="/images/ic/ic_phone_footer.svg" />
                  043 222 3000
                </h6>
                <h6>
                  <img src="/images/ic/ic_mail_footer.svg" />
                  Email:support.hn@ggg.com.vn
                </h6>
              </FlexWrapper>
            </WrapperInfo>
            <WrapperListIcon>
              <h6>Kết nối với chúng tôi</h6>
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
              © 2011 Bản quyền của Công ty Cổ phần Thương mại Dịch vụ Cổng Vàng <br /> Giấy chứng nhận Đăng ký Kinh
              doanh số 0102721191 cấp ngày 09/04/2008
            </h6>
            <h5 className="info-mobile">© 2011 Golden Gate Restaurant Group</h5>
            <img width={126} height={48} src="/images/icon_bct.png" />
          </ContentBottom>
        </Container>
      </ContentFooter>
    </FooterWrapper>
  );
};

Footer.defaultConfig = defaultConfig;

export default Footer;
