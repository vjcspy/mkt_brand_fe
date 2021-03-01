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
          <h3>Tải App The Golden Spoon</h3>
          <GroupDownload>
            <a>
              <img width={190} height={60} src="/images/googleplay.jpg" />
            </a>
            <a>
              <img width={190} height={60} src="/images/appstore.jpg" />
            </a>
          </GroupDownload>
          <h6>
            The Golden Spoon – Siêu ứng dụng cho tín đồ ẩm thực.
            <br /> Tải App Hôm Nay Chạm Ngay Ưu Đãi.
          </h6>
          <SocialNetwork>
            <a>
              <IconFacebookCircle width={36} height={36} />
            </a>
            <a>
              <IconInstagramCircle width={36} height={36} />
            </a>
            <a>
              <IconYoutubeCircle width={36} height={36} />
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
