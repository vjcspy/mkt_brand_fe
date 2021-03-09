import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AcceptCookie from "../../components/accept-cookie";
import useFromJS from "../../hooks/useFromJS";
import { RenderHeader, RenderSections, RenderFooter } from "../../sections";
import { MainContainer, MainWrapper } from "../../styles";
import { useRouter } from "next/router";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import { SET_FIRST_LOAD } from "../../constants";
import NotificationProvider from "../../components/notification";
import ListBrand from "../../sections/list-brand";
const PageContainer = ({ shouldHideFooter }) => {
  const pageName = useSelector((s) => s.get("pageName"));
  const header = useFromJS(["modifiedConfig", "header"]);
  const footer = useFromJS(["modifiedConfig", "footer"]);
  const sections = useFromJS(["modifiedConfig", "pages", pageName, "sections"]);
  const firstLoad = useSelector((s) => s.get("firstLoad"));
  const dispatch = useDispatch();
  const router = useRouter();
  const [sizeWidth, ref] = useIframeResize();
  // let data = router.pathname.include("/edit");
  useEffect(() => {
    if (sizeWidth.width <= 768 && firstLoad && router.pathname.split("/")[1] !== "edit") {
      dispatch({ type: SET_FIRST_LOAD, value: false });
      router.push("/our-menu");
    }
  }, [sizeWidth]);

  return (
    <MainContainer>
      <RenderHeader config={header} />
      <MainWrapper className="main-content">
        <RenderSections sections={sections} />
      </MainWrapper>
      <ListBrand />
      {!shouldHideFooter && <RenderFooter config={footer} />}
      <AcceptCookie />
      <NotificationProvider />
    </MainContainer>
  );
};

export default PageContainer;
