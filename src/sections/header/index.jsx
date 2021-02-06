import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeaderContent, HeaderLinks, HeaderWrapper, FlexGrow, GroupFlexBox, LogoWrapper, MenuIconButton } from "./header.styled";
import { SET_HEADER_HEIGHT, SHOW_LANGUAGE_LOCATION } from "../../constants";
import { Container } from "../../styles";
import Image from "../../components/image";
import IconMenu from "../../components/icons/iconMenu";
import Button from "../../components/button";
import MenuRight from "../../components/menu";
import PopupLanguageLocation from "./popup-language-location";
import IconUserNoBorder from "../../components/icons/iconUserNoBorder";
import useWindowResize from "../../hooks/useWindowResize";
import HeaderTop from "./headerTop";
import Link from "next/link";
import useFromJS from "../../hooks/useFromJS";
import LinkRouter from "../../components/link-router";

const defaultConfig = {
  id: "header",
  type: "header",
  name: "header",
  title: "Default Header",
  components: {
    logo: {
      type: "image",
      name: "logo",
      title: "Header Logo",
      value: null,
    },
    // topColor: {
    //   type: "color",
    //   name: "topColor",
    //   title: "Top color",
    //   value: "white",
    // },
    // topBackground: {
    //   type: "color",
    //   name: "topBackground",
    //   title: "Top background",
    //   value: "#8A2629",
    // },
    // topTitle: {
    //   type: "text",
    //   name: "topTitle",
    //   title: "Top title",
    //   value: "Ăn GoGi trúng 1 tỷ. Nhận mã ngay",
    // },
    headerLink: {
      type: "link",
      name: "headerLink",
      title: "Header Link",
      multiple: true,
      value: [
        {
          label: "Restaurants",
          url: "/",
        },
        {
          label: "Our Menu",
          url: "/",
        },
        {
          label: "Reservations",
          url: "/",
        },
      ],
    },
    slides: {
      type: "group",
      title: "Slides",
      name: "slides",
      defaultConfig: {
        text: { type: "text", title: "Text", value: "Ăn GoGi trúng 1 tỷ", name: "text" },
        link: {
          type: "link",
          name: "link",
          title: "Link",
          value: {
            label: "Nhận mã ngay",
            url: "/",
          },
        },
      },
      value: [
        {
          text: { type: "text", title: "Text", value: "Ăn GoGi trúng 1 tỷ", name: "text" },
          link: {
            type: "link",
            name: "link",
            title: "Link",
            value: {
              label: "Nhận mã ngay",
              url: "/",
            },
          },
        },
        {
          text: { type: "text", title: "Text", value: "Ăn GoGi trúng 1 tỷ", name: "text" },
          link: {
            type: "link",
            name: "link",
            title: "Link",
            value: {
              label: "Nhận mã ngay",
              url: "/",
            },
          },
        },
      ],
    },

    menu: {
      title: "menu",
      name: "menu",
      type: "menu",
      multiple: true,
      value: [
        {
          label: "Menu",
          url: "/",
          subMenu: [
            { label: "Buffet Premium", url: "/" },
            { label: "Bibimbap", url: "/" },
            { label: "Combo", key: "3", parentKey: "1", url: "/" },
            {
              label: "Special",
              key: "4",
              parentKey: "1",
              url: "/",
              subMenu: [
                { label: "Combo", url: "/" },
                { label: "Special", url: "/" },
              ],
            },
          ],
        },
        { label: "Reservations", url: "/" },
        { label: "Restaurants", url: "/" },
        {
          label: "Promo",
          url: "/",
          notifi: {
            label: "2",
          },
          subMenu: [
            { label: "Combo", url: "/" },
            { label: "Special", url: "/" },
          ],
        },
        { label: "Delivery", url: "/" },
        { label: "About Us", url: "/" },
        { label: "New", url: "/" },
        { label: "Contact", url: "/" },
      ],
    },
  },
};

// const mapStateToProps = (state) => ({
//   locate: state.get("locate") ?? "en",
//   languages: ["en", "vi"],
//   showLanguageLocation: state.get("showLanguageLocation") ?? false,
//   showMenuHeader: state.get("showMenuHeader"),
// });

// const mapDispatchToProps = (dispatch) => ({
//   setPopupLanguageLocation: (value) => dispatch({ type: SHOW_LANGUAGE_LOCATION, value }),
// });

function requestLocation() {
  if (!process.browser) {
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      alert(`latitude: ${position.coords.latitude}\nlongitude: ${position.coords.longitude}`);
    },
    (error) => {
      let title = "Đã có lỗi xảy ra";
      let body = "Vui lòng thử lại";

      switch (error.code) {
        case error.PERMISSION_DENIED:
          title = "Dịch vụ định vị bị tắt";
          break;
        case error.POSITION_UNAVAILABLE:
          title = "Vị trí không khả dụng";
          break;
        case error.TIMEOUT:
          title = "Đã hết thời gian yêu cầu dịch vụ định vị.";
          break;
        default:
          break;
      }
    },
    {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    }
  );
}

const Header = ({ config = defaultConfig }) => {
  const locate = useFromJS(["locate"]) ?? "en";
  const showLanguageLocation = useSelector((state) => state.getIn(["showLanguageLocation"]));
  const showMenuHeader = useSelector((state) => state.getIn(["showMenuHeader"]));

  const dispatch = useDispatch();
  const setPopupLanguageLocation = useCallback((value) => dispatch({ type: SHOW_LANGUAGE_LOCATION, value }), []);
  const components = config.components;
  const [isShowMenu, setShowMenu] = useState(false);
  const ref = useRef();
  const size = useWindowResize();

  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    dispatch({ type: SET_HEADER_HEIGHT, value: ref.current.offsetHeight });
  }, [dispatch, size]);

  return (
    <>
      <MenuRight show={isShowMenu} listMenu={defaultConfig.components.menu.value} setShowMenu={setShowMenu} />
      <PopupLanguageLocation show={showLanguageLocation} onClosePopup={() => setPopupLanguageLocation(false)} />

      <HeaderWrapper ref={ref}>
        <HeaderTop setPopupLanguageLocation={setPopupLanguageLocation} slides={components.slides} />
        <Container>
          <HeaderContent>
            <FlexGrow>
              <LogoWrapper href="/">
                <Image src={components.logo.value?.url ?? "/images/default-image.svg"} alt="Logo" title="Logo" />
              </LogoWrapper>
            </FlexGrow>
            <HeaderLinks showMobile={showMenuHeader}>
              {components.headerLink?.value?.map((e, index) => (
                <LinkRouter key={index} href={e.url}>
                  <a>
                    <h4>{e.label}</h4>
                  </a>
                </LinkRouter>
              ))}
            </HeaderLinks>
            <FlexGrow style={{ textAlign: "right" }}>
              <GroupFlexBox>
                <MenuIconButton hideDesktop={true}>
                  <IconUserNoBorder />
                </MenuIconButton>
                <MenuIconButton onClick={() => setShowMenu(true)}>
                  <IconMenu />
                </MenuIconButton>
              </GroupFlexBox>
            </FlexGrow>
          </HeaderContent>
        </Container>
      </HeaderWrapper>
    </>
  );
};

Header.defaultConfig = defaultConfig;

// export default connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;
