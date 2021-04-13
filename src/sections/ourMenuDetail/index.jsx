import React, { useState } from "react";
import useFromJS from "../../hooks/useFromJS";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import { Container } from "../../styles";
import DynamicFooter from "../dynamic-footer";
import MenuMobile from "./menu-mobile";
import MenuMain from "./menu-main";
import MenuTree from "./menu-tree";
import { MenusLeftContent, MenusRightContent, OurMenusContent, OurMenusWrapper } from "./styled";
import useAppHeight from "../../hooks/useAppHeight";
import { useSelector } from "react-redux";

const defaultConfig = {
  id: "our-menu-detail",
  code: "our-menu-detail",
  title: "Our Menu Detail",
  name: "ourMenuDetail",
  components: [],
};

const OurMenus = ({ menus, footer }) => {
  const [path, setPath] = useState([]);
  menus = useFromJS(["ourMenus"]) ?? menus;
  const [size, ref] = useIframeResize();
  const [indexParent, setIndexParent] = useState();
  const [indexChild, setIndexChild] = useState();
  const [indexGrandChild, setIndexGrandChild] = useState();

  const props = {
    indexParent,
    indexChild,
    indexGrandChild,
    setIndexParent,
    setIndexChild,
    setIndexGrandChild,
    path,
    menus,
    setPath,
  };
  return (
    <OurMenusWrapper ref={ref}>
      {size.width > 768 ? (
        <Container>
          <OurMenusContent>
            <MenusLeftContent >
              <MenuTree {...props} />
            </MenusLeftContent>
            <MenusRightContent className="right">
              <MenuMain {...props} />
            </MenusRightContent>
          </OurMenusContent>
        </Container>
      ) : (
        <MenuMobile menus={menus} footer={footer} />
      )}
      <DynamicFooter config={footer} />
    </OurMenusWrapper>
  );
};

OurMenus.defaultConfig = defaultConfig;

export default OurMenus;
