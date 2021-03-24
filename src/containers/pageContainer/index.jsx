import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AcceptCookie from "../../components/accept-cookie";
import useFromJS from "../../hooks/useFromJS";
import { RenderHeader, RenderSections, RenderFooter } from "../../sections";
import { MainContainer, MainWrapper } from "../../styles";
import { useRouter } from "next/router";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import { SET_FIRST_LOAD, SET_PAGE_NAME } from "../../constants";
import NotificationProvider from "../../components/notification";
import { get } from "lodash";
import DynamicFooter from "../../sections/dynamic-footer";
const PageContainer = ({ modifiedConfig, pageName, shouldHideFooter, pageNameQueryRouter, ...rest }) => {
  pageName = pageNameQueryRouter ?? pageName;
  const header = get(modifiedConfig, ["header"]);
  const footer = get(modifiedConfig, ["footer"]);
  const sections = get(modifiedConfig, ["pages", pageName, "sections"]);
  const firstLoad = useSelector((s) => s.get("firstLoad"));
  const dispatch = useDispatch();
  const router = useRouter();
  const [sizeWidth, ref] = useIframeResize();
  // let data = router.pathname.include("/edit");
  useEffect(() => {
    if (sizeWidth.width <= 768 && firstLoad && router.pathname.split("/")[1] !== "edit") {
      dispatch({ type: SET_FIRST_LOAD, value: false });
      dispatch({ type: SET_PAGE_NAME, value: pageName });
      router.push("/?tabBanner=menu");
    }
  }, [sizeWidth]);
  return (
    <MainContainer>
      <RenderHeader pageName={pageName} config={header} menus={modifiedConfig?.menus} />
      <MainWrapper className="main-content">
        <RenderSections {...rest} sections={sections} />
      </MainWrapper>
      {!shouldHideFooter && <DynamicFooter config={footer} />}
      <AcceptCookie />
      <NotificationProvider />
    </MainContainer>
  );
};

export default PageContainer;
