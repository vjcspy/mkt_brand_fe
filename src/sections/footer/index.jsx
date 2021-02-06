import React from "react";
import { Container } from "../../styles";
import { Content, ContentFooter, FooterWrapper, LeftContent, RightContent, WrapperFeature, SocialNetwork, GroupDownload } from "./style";

import IconFacebookCircle from "../../components/icons/iconFacebookCircle";
import IconYoutubeCircle from "../../components/icons/iconYoutubeCircle";
import IconInstagramCircle from "../../components/icons/iconInstagramCircle";
const defaultConfig = {
  type: "footer",
  name: "footer",
  title: "Default Footer",
  components: {},
};

const Footer = ({ config }) => {
  return (
    <FooterWrapper>
      <Container>
        <WrapperFeature>
          <h5>Tải App The Golden Spoon</h5>
          <GroupDownload>
            <a>
              <img src="/images/app_store.png" />
            </a>
            <a>
              <img src="/images/google_play.png" />
            </a>
          </GroupDownload>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <SocialNetwork>
            <a>
              <IconFacebookCircle />
            </a>
            <a>
              <IconInstagramCircle />
            </a>
            <a>
              <IconYoutubeCircle />
            </a>
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
                <br /> ĐT: 043 222 3000 Email: support.hn@ggg.com.vn
              </h6>
            </LeftContent>
            <RightContent>
              <img src="/images/icon_bct.png" />
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
