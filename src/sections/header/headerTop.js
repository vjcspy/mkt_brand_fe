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
  const provinceSelected = useSelector((state) => state.get("provinceSelected"))?.toJS()
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
                  <p>
                    <FormattedMessage id="header.helper" />
                  </p>
                </HoverWrapper>
              </ItemTopMenuRight>
              <ItemTopMenuRight>
                <HoverWrapper className={showProfile ? "active" : ""}>
                  {fullName ? (
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
                      {fullName}
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
                    <ProfileDropdown setShowProfile={setShowProfile} avatar={avatar} userName={fullName} />
                  </>
                )}
              </ItemTopMenuRight>
              <ItemTopMenuRight onClick={() => setPopupLanguageLocation(true)}>
                <HoverWrapper>
                  <IconMapMarker color="#7B7979" />
                  <h6>{provinceSelected?.name}</h6>
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
