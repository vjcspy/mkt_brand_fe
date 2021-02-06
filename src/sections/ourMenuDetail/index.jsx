import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFromJS from "../../hooks/useFromJS";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import { Container } from "../../styles";
import MenuMain from "./menuMain";
import MenuMainMobile from "./menuMainMobile";
import MenuTree from "./menuTree";
import MenuTreeMobile from "./menuTreeMobile";
import { MenuMobileWrapper, MenusLeftContent, MenusRightContent, OurMenusContent, OurMenusWrapper } from "./styled";

const defaultConfig = {
  id: "our-menu-detail",
  code: "our-menu-detail",
  title: "Our Menu Detail",
  name: "ourMenuDetail",
  components: [],
};

const OurMenus = () => {
  const [path, setPath] = useState([]);
  const menus = useFromJS(["ourMenus"]);
  const [size, ref] = useIframeResize();
  const [indexParent, setIndexParent] = useState();
  const [indexChild, setIndexChild] = useState();
  const [indexGrandChild, setIndexGrandChild] = useState();
  const props = { indexParent, indexChild, indexGrandChild, setIndexParent, setIndexChild, setIndexGrandChild, path, menus, setPath };

  return (
    <OurMenusWrapper ref={ref}>
      {size.width > 768 ? (
        <Container>
          <OurMenusContent>
            <MenusLeftContent>
              <MenuTree {...props} />
            </MenusLeftContent>
            <MenusRightContent>
              <MenuMain {...props} />
            </MenusRightContent>
          </OurMenusContent>
        </Container>
      ) : (
        <MenuMobileWrapper>
          <MenuMainMobile {...props} />
          <MenuTreeMobile {...props} />
        </MenuMobileWrapper>
      )}
    </OurMenusWrapper>
  );
};

OurMenus.defaultConfig = defaultConfig;

export default OurMenus;
