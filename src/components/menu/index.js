import React, { useState, useEffect } from "react";
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
} from "./style";
import IconClose from "../icons/iconsClose";
import IconTriangleRight from "../icons/iconTriangleLineRight";
import ChildMenu from "./childMenu";
import Button from "../button";
import useDebounce from "../../hooks/useDebounce";
import IconTriangleDown from "../icons/iconTriangleDown";
import IconMapMarker from "../icons/iconMapMarker";
import { connect } from "react-redux";
import { SHOW_LANGUAGE_LOCATION } from "../../constants";

const mapDispatchToProp = (dispatch) => ({
  setShowLanguageLocation: (value) => dispatch({ type: SHOW_LANGUAGE_LOCATION, value }),
});

const featureMobile = [
  { title: "Help Center", url: "" },
  { title: "Log in", url: "" },
  { title: "Facebook", url: "" },
  { title: "Instagram", url: "" },
  { title: "Youtube", url: "" },
];

const Menu = ({ show, listMenu, setShowMenu, socialFeature, setShowLanguageLocation }) => {
  const [itemSubMenu, setItemSubMenu] = useState();
  const [classNameMenu, setClassNameMenu] = useState();
  const [classNameMarker, setClassNameMarker] = useState();

  const classMarker = useDebounce("show", 300);
  const classMenu = useDebounce("show", 200);

  useEffect(() => {
    setClassNameMarker(classMarker);
  }, [classMarker]);

  useEffect(() => {
    setClassNameMenu(classMenu);
  }, [classMenu]);

  const onCloseMenu = () => {
    // setClassNameMenu(null);
    // setClassNameMarker(null);
    // setTimeout(() => {
    // }, 400);
    setShowMenu(false);
  };

  return (
    <WrapperMenu className={`${show ? "show" : "close"}`}>
      <ContentPosition>
        <MarkerLayout className={`${show ? "show" : ""}`} onClick={onCloseMenu} />
        <WrapperContentMenu className={`${show ? "show" : ""}`}>
          <HeaderMenu>
            <div>
              <IconClose onClick={onCloseMenu} width={15} height={15} />
            </div>
          </HeaderMenu>
          <hr />
          <ContentMenu>
            <MainMenu className={`${itemSubMenu ? "hide" : ""}`}>
              {listMenu?.map((item, index) => (
                <>
                  {item.subMenu?.length > 0 ? (
                    <>
                      <ItemMenu key={index} onClick={() => setItemSubMenu(item)}>
                        <h3>
                          {item.label}
                          {item.notifi && <span>{item.notifi.label}</span>}
                        </h3>
                        <IconTriangleRight width={15} height={15} />
                      </ItemMenu>
                    </>
                  ) : (
                    <ItemMenu>
                      <h3>
                        <a href={item.url}>{item.label}</a>
                        {item.notifi && <span>{item.notifi.label}</span>}
                      </h3>
                    </ItemMenu>
                  )}
                </>
              ))}

              <FeatureMobile>
                <ListFeature>
                  {featureMobile?.map((item, index) => (
                    <h5>
                      <a href={item.url}>{item.title}</a>
                    </h5>
                  ))}
                </ListFeature>
                <LanguageLocation>
                  <div onClick={() => setShowLanguageLocation(true)}>
                    <img src="/images/ic/ic_usa_flag.svg" />
                    <h5>English</h5>
                    <IconTriangleDown />
                  </div>
                  <div onClick={() => setShowLanguageLocation(true)}>
                    <IconMapMarker />
                    <h5>Ha Noi</h5>
                    <IconTriangleDown />
                  </div>
                </LanguageLocation>
              </FeatureMobile>
            </MainMenu>
            {itemSubMenu && itemSubMenu.subMenu?.length > 0 && <ChildMenu parent={itemSubMenu} setItemSubMenu={setItemSubMenu} />}
          </ContentMenu>

          <FooterMenu>
            <Button status="primary">Download App</Button>
            <Button status="primary">Reservations</Button>
          </FooterMenu>
        </WrapperContentMenu>
      </ContentPosition>
    </WrapperMenu>
  );
};

export default connect(null, mapDispatchToProp)(Menu);
