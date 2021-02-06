import React, { useState } from "react";
import IconMapMarker from "../../components/icons/iconMapMarker";
import IconTriangleDown from "../../components/icons/iconTriangleDown";
import Slide from "../../components/slide";
import useFromJS from "../../hooks/useFromJS";
import { Container } from "../../styles";
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
import ProfileDropdown from "./profileDropdown";

const HeaderTop = ({ setPopupLanguageLocation, slides }) => {
  const [showProfile, setShowProfile] = useState(false);
  const profile = useFromJS(["profile"]) ?? { name: "User name" };
  return (
    <HeaderTopWrapper>
      <Container>
        <WrapperContent>
          <FlexGrow />
          <SlideCode>
            <Slide slides={slides?.value} />
          </SlideCode>
          <WrapperMenuRight>
            <TopMenuRight>
              <ItemTopMenuRight onClick={() => setPopupLanguageLocation(true)}>
                <img src="/images/ic/ic_usa_flag.svg" />
                <IconTriangleDown />
              </ItemTopMenuRight>
              <ItemTopMenuRight>
                <HoverWrapper>
                  <h6>Help Center</h6>
                </HoverWrapper>
              </ItemTopMenuRight>
              <ItemTopMenuRight>
                <HoverWrapper
                  className={showProfile ? "active" : ""}
                  onClick={() => {
                    setShowProfile(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      // setShowProfile(false);
                    }, 100);
                  }}
                >
                  <h6>{profile?.name ?? "Login"}</h6>
                </HoverWrapper>
                {showProfile && <ProfileDropdown />}
              </ItemTopMenuRight>
              <ItemTopMenuRight onClick={() => setPopupLanguageLocation(true)}>
                <HoverWrapper>
                  <IconMapMarker />
                  <h6>Ha Noi</h6>
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
