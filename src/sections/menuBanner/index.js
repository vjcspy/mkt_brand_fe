import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/button";
import PointNavigation from "../../components/point-navigation";
import ReactPageScroller from "../../../plugins/react-page-scroller";
import { DotsWrapper, MenuScrollWrapper, WrapperSection, GroupButton } from "./style";
import IconTriangleLineTop from "../../components/icons/iconTriangleLineTop";
import IconTriangleLineDown from "../../components/icons/iconTriangleLineDown";
import ImageMedia from "../../development/components/imageMedia";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import LinkRouter from "../../components/link-router";
import useAppHeight from "../../hooks/useAppHeight";

const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "menuBanner",
  title: "Menu Banner",
  components: {
    menuBanner: {
      type: "group",
      title: "Menu Banner",
      name: "menuBanner",
      defaultConfig: {
        title: {
          type: "text",
          title: "Menu 1",
          value: { vi: "Menu 1", en: "Menu 1" },
          name: "MenuName",
        },
        imageDesktop: { type: "image", title: "Banner Desktop" },
        imageMobile: { type: "image", title: "Banner Mobile" },
        headMenu: { type: "text", title: "Head", value: { vi: "Menu", en: "Menu" } },
        showHead: { type: "radio", title: "Show Head", value: { active: "Show", titles: ["Show", "Hidden"] } },
        contentMenu: { type: "text", title: "Content", value: { vi: "Content menu", en: "Content menu" } },
        showContent: { type: "radio", title: "Show Content", value: { active: "Show", titles: ["Show", "Hidden"] } },
        linkMenu: {
          type: "link",
          name: "link",
          title: "Link Menu",
          value: {
            label: { vi: "Xem menu chi tiết", en: "Xem menu chi tiết" },
            url: "/",
          },
        },
      },
      value: [
        {
          title: {
            type: "text",
            title: "Menu 1",
            value: { vi: "Menu 1", en: "Menu 1" },
            name: "MenuName",
          },
          imageDesktop: { type: "image", title: "Banner Desktop" },
          imageMobile: { type: "image", title: "Banner Mobile" },
          headMenu: { type: "text", title: "Head Menu", value: { vi: "Menu 1", en: "Menu 1" } },
          showHead: { type: "radio", title: "Show Head", value: { active: "Show", titles: ["Show", "Hidden"] } },
          contentMenu: { type: "text", title: "Content Menu", value: { vi: "Content menu 1", en: "Content menu 1" } },
          showContent: { type: "radio", title: "Show Content", value: { active: "Show", titles: ["Show", "Hidden"] } },
          linkMenu: {
            type: "link",
            name: "link",
            title: "Link",
            value: {
              label: { vi: "Xem menu chi tiết", en: "Xem menu chi tiết" },
              url: "/",
            },
          },
        },
      ],
    },
  },
};

const MenuBanner = ({ config = defaultConfig }) => {
  const locale = useSelector((s) => s.get("locale"));
  const { value: valueMenu } = config.components.menuBanner;
  const [currentPage, setCurrentPage] = useState(0);
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const [{ width }, ref] = useIframeResize();
  const appHeight = useAppHeight();

  const Images = useMemo(() => {
    return valueMenu?.map((item, index) => {
      const { imageDesktop, imageMobile, linkMenu, headMenu, showHead, showContent, contentMenu } = item;
      return (
        <WrapperSection key={index}>
          <ImageMedia
            preload={true}
            width="100%"
            height="100%"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            media={width > 768 ? imageDesktop.value : imageMobile.value}
          />

          <GroupButton>
            {showHead.value.active === "Show" && <h1>{headMenu.value[locale]}</h1>}
            {showContent.value.active === "Show" && <h3>{contentMenu.value[locale]}</h3>}
            <LinkRouter href={`${linkMenu.value?.url}`} passHref>
              <a className="link-banner">
                <Button className="button-banner">
                  {/* <FormattedMessage id="banner.view_promo" /> */}
                  <span>{linkMenu.value.label[locale]}</span>
                </Button>
              </a>
            </LinkRouter>
          </GroupButton>
        </WrapperSection>
      );
    });
  }, [valueMenu, width]);

  return (
    <MenuScrollWrapper>
      <ReactPageScroller
        customPageNumber={currentPage}
        containerHeight={appHeight - headerHeight}
        pageOnChange={setCurrentPage}
        totalElement={valueMenu.length}
      >
        {Images}
      </ReactPageScroller>
      <DotsWrapper>
        <IconTriangleLineTop className="top" color="#ffffff" />
        <PointNavigation
          className="point-our-menu"
          size={valueMenu.length ?? 0}
          currentIndex={currentPage}
          display="block"
        />
        <IconTriangleLineDown className="bottom" color="#ffffff" />
      </DotsWrapper>
      {/* <MenuInfoWrapper>
        {current < menus.length - 1 ? (
          <IconViewMore onClick={() => setCurrent(current + 1)} className="view-more" />
        ) : (
          <IconViewMore onClick={onScrollBottom} className="view-more " />
        )}
      </MenuInfoWrapper> */}
    </MenuScrollWrapper>
  );
};

MenuBanner.defaultConfig = defaultConfig;

export default MenuBanner;
