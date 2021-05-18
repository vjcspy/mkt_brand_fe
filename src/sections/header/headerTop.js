import React, { useEffect, useState } from "react";
import loadable from "@loadable/component";
import IconMapMarker from "../../components/icons/iconMapMarker";
import IconTriangleDown from "../../components/icons/iconTriangleDown";
import Slide from "../../components/slide";
import { useSelector } from "react-redux";
import { Container } from "../../styles";
import { FormattedMessage } from "react-intl";
import {
  FlexGrow,
  HeaderTopWrapper,
  HoverWrapper,
  ItemTopMenuRight,
  SlideCode,
  TopMenuRight,
  WrapperContent,
  WrapperMenuRight
} from "./header.styled";
import { Marker } from "./profileDropdown/styled";
import Link from "next/link";
import { filterProvinceById } from "../../services/backend";

const ProfileDropdown = loadable(() => import("./profileDropdown"));

const HeaderTop = ({ setPopupLanguageLocation, slides }) => {
  const locale = useSelector((state) => state.getIn(["locale"]));
  const provinceSelected = useSelector((state) => state.get("provinceSelected"))?.toJS();
  const listProvince = useSelector((state) => state.get("listProvince")) ?? [];
  const provinceFilter = filterProvinceById(listProvince, provinceSelected?.id);
  const userInfo = useSelector((state) => state.get("userInfo"));

  const [showProfile, setShowProfile] = useState(false);
  const [state, setState] = useState({
    locale: null,
    provinceSelected: null,
    fullName: null,
    avatar: null
  });
  const showFBChat = () => {
    console.log("here");
    window.fbAsyncInit = (() => {
      FB.init({
        xfbml: true,
        version: "v10.0"
      });
      FB.CustomerChat.showDialog();
    })();
  };

  useEffect(() => {
    let { fullName, avatar } = userInfo?.toJS() ?? {};
    setState({
      locale: locale,
      provinceSelected: provinceFilter,
      fullName: fullName,
      avatar: avatar
    });
  }, [locale, provinceFilter, userInfo]);

  return (
    <HeaderTopWrapper>
      <Container>
        <WrapperContent>
          <FlexGrow />
          <SlideCode>
            {/* <Slide slides={listPromoActive} /> */}
            <Slide slides={slides.value} />
          </SlideCode>
          <WrapperMenuRight>
            <TopMenuRight>
              <ItemTopMenuRight onClick={() => setPopupLanguageLocation(true)}>
                {state.locale === "vi" ? (
                  <img width={32} height={17} src="/images/flag_vnam.jpg" />
                ) : (
                  <img width={32} height={17} src="/images/ic/ic_usa_flag.svg" />
                )}
                <IconTriangleDown color="#7B7979" />
              </ItemTopMenuRight>
              <ItemTopMenuRight>
                <HoverWrapper>
                  <p onClick={() => showFBChat()}>
                    <FormattedMessage id="header.helper" />
                  </p>
                </HoverWrapper>
              </ItemTopMenuRight>
              <ItemTopMenuRight>
                <HoverWrapper className={showProfile ? "active" : ""}>
                  {state.fullName ? (
                    <p
                      className="user-name"
                      onClick={() => {
                        setShowProfile(true);
                      }}
                      onBlur={() => {
                        setTimeout(() => {
                          // setShowProfile(false);
                        }, 100);
                      }}
                    >
                      {state.fullName}
                    </p>
                  ) : (
                    <Link href="/login">
                      <a>
                        <p>
                          <FormattedMessage id="header.login" />
                        </p>
                      </a>
                    </Link>
                  )}
                </HoverWrapper>
                {showProfile && (
                  <>
                    <Marker onClick={() => setShowProfile(false)} />{" "}
                    <ProfileDropdown setShowProfile={setShowProfile} avatar={state.avatar} userName={state.fullName} />
                  </>
                )}
              </ItemTopMenuRight>
              <ItemTopMenuRight onClick={() => setPopupLanguageLocation(true)}>
                <HoverWrapper>
                  <IconMapMarker color="#7B7979" />
                  <h6>{state.provinceSelected?.name ?? "Hà Nội"}</h6>
                </HoverWrapper>
              </ItemTopMenuRight>
            </TopMenuRight>
          </WrapperMenuRight>
        </WrapperContent>
      </Container>
    </HeaderTopWrapper>
  );
};

export default HeaderTop;
