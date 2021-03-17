import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadable from "@loadable/component";
import {
  HeaderContent,
  HeaderLinks,
  HeaderWrapper,
  FlexGrow,
  GroupFlexBox,
  LogoWrapper,
  MenuIconButton,
} from "./header.styled";
import { DEVELOPMENT_MODE, SET_HEADER_HEIGHT, SHOW_LANGUAGE_LOCATION } from "../../constants";
import { Container } from "../../styles";
import IconMenu from "../../components/icons/iconMenu";
import IconUserNoBorder from "../../components/icons/iconUserNoBorder";
import useWindowResize from "../../hooks/useWindowResize";
import HeaderTop from "./headerTop";
import LinkRouter from "../../components/link-router";
import useSiteRouter from "../../hooks/useSiteRouter";
import useMenu from "../../hooks/useMenu";
import { Marker } from "./profileDropdown/styled";
import ProfileDropdown from "./profileDropdown";
import ImageMedia from "../../development/components/imageMedia";
import Link from "next/link";
const MenuRight = loadable(() => import("../../components/menu"));
const PopupLanguageLocation = loadable(() => import("./popup-language-location"));

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
    navMenu: {
      type: "menu",
      name: "navMenu",
      title: "Nav Menu",
      value: "navMenu",
    },
    hambergerMenu: {
      type: "menu",
      name: "hambergerMenu",
      title: "Hamberger Menu",
      value: "hambergerMenu",
    },
    slides: {
      type: "group",
      title: "Slides",
      name: "slides",
      defaultConfig: {
        text: {
          type: "text",
          title: "Text",
          value: { vi: "Ăn GoGi trúng 1 tỷ", en: "Ăn GoGi trúng 1 tỷ" },
          name: "text",
        },
        link: {
          type: "link",
          name: "link",
          title: "Link",
          value: {
            label: { vi: "Nhận mã ngay", en: "Nhận mã ngay" },
            url: "/",
          },
        },
      },
      value: [
        {
          text: {
            type: "text",
            title: "Text",
            value: { vi: "Ăn GoGi trúng 1 tỷ", en: "Ăn GoGi trúng 1 tỷ" },
            name: "text",
          },
          link: {
            type: "link",
            name: "link",
            title: "Link",
            value: {
              label: { vi: "Nhận mã ngay", en: "Nhận mã ngay" },
              url: "/",
            },
          },
        },
        {
          text: {
            type: "text",
            title: "Text",
            value: { vi: "Ăn GoGi trúng 1 tỷ", en: "Ăn GoGi trúng 1 tỷ" },
            name: "text",
          },
          link: {
            type: "link",
            name: "link",
            title: "Link",
            value: {
              label: { vi: "Nhận mã ngay", en: "Nhận mã ngay" },
              url: "/",
            },
          },
        },
      ],
    },

    // menu: {
    //   title: "menu",
    //   name: "menu",
    //   type: "menu",
    //   multiple: true,
    //   value: [
    //     {
    //       label: "Thực đơn",
    //       subMenu: [
    //         { label: "Buffet", url: "/our-menu/buffet" },
    //         { label: "Combo", url: "/our-menu/combo" },
    //         { label: "Món lẻ", url: "/our-menu/mon-le" },
    //       ],
    //     },
    //     { label: "Đặt bàn", url: "/" },
    //     {
    //       label: "Ưu đãi",
    //       url: "/promo",
    //       notifi: {
    //         label: "2",
    //       },
    //     },
    //     { label: "Giao hàng", url: "/" },
    //     { label: "Về chúng tôi", url: "/" },
    //     { label: "Tin tức", url: "/" },
    //     { label: "Liên lạc", url: "/" },
    //   ],
    // },
  },
};

// const mapStateToProps = (state) => ({
//   locale: state.get("locale") ?? "en",
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
      // call api
      // alert(`latitude: ${position.coords.latitude}\nlongitude: ${position.coords.longitude}`);
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          break;
        case error.POSITION_UNAVAILABLE:
          break;
        case error.TIMEOUT:
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
  // const locale = useFromJS(["locale"]) ?? "en";
  const showMenuHeader = useSelector((state) => state.getIn(["showMenuHeader"]));
  const pageName = useSelector((state) => state.getIn(["pageName"]));
  const mode = useSelector((state) => state.get("mode"));
  const router = useSiteRouter();
  const dispatch = useDispatch();
  const setPopupLanguageLocation = useCallback((value) => dispatch({ type: SHOW_LANGUAGE_LOCATION, value }), []);
  const components = config.components;
  const [isShowMenu, setShowMenu] = useState(false);
  const ref = useRef();
  const size = useWindowResize();
  const [isEqualPageName, setIsEqualPageName] = useState(pageName);
  const locale = useSelector((s) => s.get("locale"));
  const navMenu = useMenu(components.navMenu?.value);
  const hambergerMenu = useMenu(components.hambergerMenu?.value);
  const [showProfileDropdownMobile, setShowProfileDropdownMobile] = useState(false);
  const { fullName, avatar } = useSelector((state) => state.get("userInfo"))?.toJS() ?? "";
  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    if (mode === DEVELOPMENT_MODE) {
      let pageNameQuery = router.query.page ?? "home";
      pageNameQuery = pageNameQuery === "home" ? "" : pageNameQuery;
      setIsEqualPageName(pageNameQuery);
    } else {
      setIsEqualPageName(pageName === "home" ? "" : pageName);
    }
  }, [pageName, router.query.page]);

  useEffect(() => {
    dispatch({ type: SET_HEADER_HEIGHT, value: ref.current.offsetHeight });
  }, [dispatch, size]);

  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (sessionStorage.getItem("redirect") != "true" && size <= 768) {
      router.push("/our-menu");
    }
    sessionStorage.setItem("redirect", "true");
  }, []);

  return (
    <>
      <MenuRight show={isShowMenu} listMenu={hambergerMenu?.children} setShowMenu={setShowMenu} />
      <PopupLanguageLocation />

      <HeaderWrapper ref={ref}>
        <HeaderTop setPopupLanguageLocation={setPopupLanguageLocation} slides={components.slides} />
        <Container>
          <HeaderContent>
            <FlexGrow>
              <LinkRouter href="/" passHref>
                <LogoWrapper>
                  <ImageMedia
                    width={129}
                    className="logo"
                    alt="Logo"
                    title="Logo"
                    height={73}
                    media={components.logo.value}
                    formats="thumbnail"
                  />
                </LogoWrapper>
              </LinkRouter>
            </FlexGrow>
            <HeaderLinks showMobile={showMenuHeader}>
              {navMenu?.children.map((e, index) => (
                <LinkRouter key={index} href={e.url} passHref={true}>
                  <a className={`${"/" + isEqualPageName === e.url ? "active" : ""}`}>
                    <h4>{e.label?.[locale]}</h4>
                  </a>
                </LinkRouter>
              ))}
            </HeaderLinks>
            <FlexGrow style={{ textAlign: "right" }}>
              <GroupFlexBox>
                <MenuIconButton hideDesktop={true}>
                  {fullName ? (
                    <IconUserNoBorder height={36} width={36} onClick={() => setShowProfileDropdownMobile(true)} />
                  ) : (
                    <Link href="/login">
                      <a>
                        <IconUserNoBorder height={36} width={36} />
                      </a>
                    </Link>
                  )}

                  {showProfileDropdownMobile && (
                    <>
                      <Marker
                        onClick={(e) => {
                          setShowProfileDropdownMobile(false);
                          e.stopPropagation();
                        }}
                      />
                      <ProfileDropdown
                        setShowProfile={setShowProfileDropdownMobile}
                        avatar={avatar}
                        userName={fullName}
                      />
                    </>
                  )}
                </MenuIconButton>
                <MenuIconButton onClick={() => setShowMenu(true)}>
                  <IconMenu height={36} width={36} />
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
