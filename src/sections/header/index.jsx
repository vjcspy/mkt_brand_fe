import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
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
  HeaderLine,
  ContentHeaderLink,
} from "./header.styled";
import { DEVELOPMENT_MODE, SET_HEADER_HEIGHT, SET_LAT_LNG, SET_PROVINCE_SELECTED, SHOW_LANGUAGE_LOCATION } from "../../constants";
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
import { stringifyUrl } from "query-string";
import PopupLanguageLocation from "./popup-language-location";
import { getProvinceIdByLocation } from "../../services/backend";
import { showNotification } from "../../components/notification";

const MenuRight = loadable(() => import("../../components/menu"));

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
    buttonLeftFooterMenu: {
      type: "link",
      name: "link",
      title: "Button Left Menu",
      value: {
        label: { vi: "Tải app", en: "Tải app" },
        url: "/",
      },
    },
    buttonRightFooterMenu: {
      type: "link",
      name: "link",
      title: "Button Right Menu",
      value: {
        label: { vi: "Đặt bàn", en: "Đặt bàn" },
        url: "/",
      },
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
  let latLng;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      // call api
      latLng = { lat: position.coords.latitude, lng: position.coords.longitude }
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
  return latLng
}

const Header = ({ config = defaultConfig, menus, pageName }) => {
  const showMenuHeader = useSelector((state) => state.getIn(["showMenuHeader"]));
  const listProvince = useSelector((state) => state.get("listProvince")) ?? [];
  const mode = useSelector((state) => state.get("mode"));
  const router = useSiteRouter();
  const dispatch = useDispatch();
  const setPopupLanguageLocation = useCallback((value) => dispatch({ type: SHOW_LANGUAGE_LOCATION, value }), []);
  const components = config.components;
  const [isShowMenu, setShowMenu] = useState(false);
  const ref = useRef();
  const linkRef = useRef();
  const size = useWindowResize();
  const locale = useSelector((s) => s.get("locale"));
  const navMenu = menus?.find((m) => m.name == components.navMenu?.value);
  const hambergerMenu = menus?.find((m) => m.name == components.hambergerMenu?.value);
  const buttonLeftFooterMenu = components.buttonLeftFooterMenu;
  const buttonRightFooterMenu = components.buttonRightFooterMenu;
  const [showProfileDropdownMobile, setShowProfileDropdownMobile] = useState(false);
  const { fullName, avatar } = useSelector((state) => state.get("userInfo"))?.toJS() ?? "";
  const [percentage, setPercentage] = useState(0);
  const [transition, setTransition] = useState(true);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!process.browser) {
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        if (latitude && longitude) {
          try {
            const { data } = await getProvinceIdByLocation({ lat: latitude, lng: longitude })
            dispatch({ type: SET_PROVINCE_SELECTED, value: { id: data.provinceId, default: false } })
          } catch (e) {
          }
          dispatch({ type: SET_LAT_LNG, value: { lat: latitude, lng: longitude } })
        }
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            break;
          case error.POSITION_UNAVAILABLE:
            break;
          case error.TIMEOUT:
            showNotification(dispatch, { content: "Không thể truy cập location", status: "warning" })
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
  }, [])

  const isHomePage = useMemo(() => {
    if (mode === DEVELOPMENT_MODE) {
      let pageNameQuery = router.query.page ?? "home";
      return pageNameQuery === "home";
    }
    return pageName === "home";
  }, [pageName, router.query.page]);

  useEffect(() => {
    dispatch({ type: SET_HEADER_HEIGHT, value: ref.current.offsetHeight });
  }, [dispatch, size]);

  useEffect(() => {
    const listener = (e) => {
      if (linkRef.current) {
        let width = linkRef.current.children[e.index].offsetWidth;
        let left = linkRef.current.children[e.index].offsetLeft;
        let w = width + 60; // px
        let p = e.percentage / 100; // %
        let p2 = linkRef.current.offsetWidth / 100; // %
        let percentage = (left + w * p) / p2;
        setWidth(width);
        setPercentage(percentage);
        setTransition(e.transition);
        setIndex(e.index);
      }
    };
    window.addEventListener("tabbanner", listener);
    return () => window.removeEventListener("tabbanner", listener);
  }, []);

  return (
    <>
      <MenuRight show={isShowMenu} buttonRight={buttonRightFooterMenu} buttonLeft={buttonLeftFooterMenu} listMenu={hambergerMenu?.children} setShowMenu={setShowMenu} />
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
              <ContentHeaderLink ref={linkRef}>
                {navMenu?.children.map((e, i) => (
                  <LinkRouter key={i} passHref={true} href={e.url} shallow>
                    <a href={e.url} className={`${index === i && isHomePage ? "active" : ""}`}>
                      <h4>{e.label?.[locale]}</h4>
                    </a>
                  </LinkRouter>
                ))}
                {isHomePage && (
                  <HeaderLine
                    style={{
                      left: percentage + "%",
                      transition: transition ? "left 0.3s ease-out, width 0.3s ease-out" : "none",
                      width: width,
                    }}
                  />
                )}
              </ContentHeaderLink>
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
