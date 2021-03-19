import React, { useState, useMemo } from "react";
import {
  FooterMenu,
  HeaderMenu,
  MarkerLayout,
  WrapperContentMenu,
  WrapperMenu,
  ContentMenu,
  ContentPosition,
  MainMenu,
  ItemMenu,
  FeatureMobile,
  ListFeature,
  LanguageLocation,
  ContentRelative,
} from "./style";
import IconClose from "../icons/iconsClose";
import IconTriangleRight from "../icons/iconTriangleLineRight";
import ChildMenu from "./childMenu";
import Button from "../button";
import { connect, useSelector } from "react-redux";
import { SHOW_LANGUAGE_LOCATION } from "../../constants";
import { FormattedMessage } from "react-intl";
import LinkRouter from "../link-router";
import SelectLocation from "../drop-down/SelectLocation";
import SelectLanguage from "../drop-down/SelectLanguage";
import useGraphql from "../../hooks/useApi/useGraphql";
import useSiteRouter from "../../hooks/useSiteRouter";
import useAppHeight from "../../hooks/useAppHeight";
const mapDispatchToProp = (dispatch) => ({
  setShowLanguageLocation: (value) => dispatch({ type: SHOW_LANGUAGE_LOCATION, value }),
});
const Menu = ({ show, listMenu, setShowMenu, setShowLanguageLocation }) => {
  const [itemSubMenu, setItemSubMenu] = useState();
  const locale = useSelector((state) => state.getIn(["locale"]));
  const menu = useGraphql("menu");
  const menus = useMemo(() => listMenu?.map((m) => (m.apiKey === "menu" ? { ...m, children: menu } : m)), [
    listMenu,
    menu,
  ]);
  const appHeight = useAppHeight();
  const router = useSiteRouter();
  const onCloseMenu = () => {
    // setClassNameMenu(null);
    // setClassNameMarker(null);
    // setTimeout(() => {
    // }, 400);
    setShowMenu(false);
  };

  return (
    <WrapperMenu style={{ height: appHeight }} className={`${show ? "show" : "close"}`}>
      <ContentPosition>
        <MarkerLayout show={show} onClick={onCloseMenu} />
        <WrapperContentMenu show={show}>
          <ContentRelative>
            <HeaderMenu>
              <div>
                <IconClose onClick={onCloseMenu} width={20} height={20} />
              </div>
            </HeaderMenu>
            <hr />
            <ContentMenu>
              <MainMenu className={`${itemSubMenu ? "hide" : ""}`}>
                {menus?.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.children?.length > 0 ? (
                      <ItemMenu
                        className={`${router.pathname === "/our-menu/[menu]" ? "active" : ""}`}
                        onClick={() => setItemSubMenu(item)}
                      >
                        <h4>
                          {item.label?.[locale]}
                          {item.apiKey == "promo" && <span>{2}</span>}
                        </h4>
                        <IconTriangleRight width={15} height={15} />
                      </ItemMenu>
                    ) : (
                      <ItemMenu className={`${router.pathname === item.url ? "active" : ""}`}>
                        <h4 onClick={onCloseMenu}>
                          <LinkRouter href={item.url} passHref>
                            <a>{item.label?.[locale]}</a>
                          </LinkRouter>
                          {item.apiKey == "promo" && <span>{2}</span>}
                        </h4>
                      </ItemMenu>
                    )}
                  </React.Fragment>
                ))}

                <FeatureMobile>
                  <ListFeature>
                    <h5>
                      <a href="">
                        <FormattedMessage id="menu.helper" />
                      </a>
                    </h5>
                    <h5>
                      <a href="">
                        <FormattedMessage id="menu.login" />
                      </a>
                    </h5>
                  </ListFeature>
                  <LanguageLocation>
                    <SelectLanguage />
                    <SelectLocation />
                  </LanguageLocation>
                </FeatureMobile>
              </MainMenu>
              {itemSubMenu?.children?.length > 0 && (
                <ChildMenu
                  onCloseMenu={onCloseMenu}
                  locale={locale}
                  parent={itemSubMenu}
                  setItemSubMenu={setItemSubMenu}
                />
              )}
            </ContentMenu>

            <FooterMenu>
              <Button status="primary">
                <FormattedMessage id="menu.download_app" />
              </Button>
              <Button status="primary">
                <FormattedMessage id="menu.reservation" />
              </Button>
            </FooterMenu>
          </ContentRelative>
        </WrapperContentMenu>
      </ContentPosition>
    </WrapperMenu>
  );
};

export default connect(null, mapDispatchToProp)(Menu);
