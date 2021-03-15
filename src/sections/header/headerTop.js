import React, { useState } from "react";
import loadable from "@loadable/component";
import IconMapMarker from "../../components/icons/iconMapMarker";
import IconTriangleDown from "../../components/icons/iconTriangleDown";
import Slide from "../../components/slide";
import useFromJS from "../../hooks/useFromJS";
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
  WrapperMenuRight,
} from "./header.styled";
import { Marker } from "./profileDropdown/styled";
import { dummyLocation } from "../../components/drop-down/SelectLocation";
import Link from "next/link";
const ProfileDropdown = loadable(() => import("./profileDropdown"));

const HeaderTop = ({ setPopupLanguageLocation, slides }) => {
  const locale = useSelector((state) => state.getIn(["locale"]));
  const location = useSelector((state) => state.getIn(["location"]));
  const listPromoActive = useSelector((s) => s.get("listPromoActive"));
  const { fullName, avatar } = useSelector((state) => state.get("userInfo"))?.toJS() ?? "";
  const [showProfile, setShowProfile] = useState(false);
  const itemLocation = dummyLocation.find((item) => item.id === location);
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
                {locale === "vi" ? (
                  <img width={32} height={17} src="/images/flag_vnam.jpg" />
                ) : (
                  <img width={32} height={17} src="/images/ic/ic_usa_flag.svg" />
                )}
                <IconTriangleDown color="#7B7979" />
              </ItemTopMenuRight>
              <ItemTopMenuRight>
                <HoverWrapper>
                  <h6>
                    <FormattedMessage id="header.helper" />
                  </h6>
                </HoverWrapper>
              </ItemTopMenuRight>
              <ItemTopMenuRight>
                <HoverWrapper className={showProfile ? "active" : ""}>
                  {fullName ? (
                    <h6
                      onClick={() => {
                        setShowProfile(true);
                      }}
                      onBlur={() => {
                        setTimeout(() => {
                          // setShowProfile(false);
                        }, 100);
                      }}
                    >
                      {fullName}
                    </h6>
                  ) : (
                    <Link href="/login">
                      <a>
                        <h6>
                          <FormattedMessage id="header.login" />
                        </h6>
                      </a>
                    </Link>
                  )}
                </HoverWrapper>
                {showProfile && (
                  <>
                    <Marker onClick={() => setShowProfile(false)} />{" "}
                    <ProfileDropdown setShowProfile={setShowProfile} avatar={avatar} userName={fullName} />
                  </>
                )}
              </ItemTopMenuRight>
              <ItemTopMenuRight onClick={() => setPopupLanguageLocation(true)}>
                <HoverWrapper>
                  <IconMapMarker color="#7B7979" />
                  <h6>{locale === "en" ? itemLocation.title : itemLocation.titleVN}</h6>
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
