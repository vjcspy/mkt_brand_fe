import React, { useState, useEffect } from "react";
import AcceptCookie from "../../components/accept-cookie";
import { RenderHeader, RenderSections } from "../../sections";
import { MainContainer, MainWrapper } from "../../styles";
import NotificationProvider from "../../components/notification";
import { get } from "lodash";
import DynamicFooter from "../../sections/dynamic-footer";
import { useSelector } from "react-redux"
const PageContainer = ({ modifiedConfig, pageName, shouldHideFooter, pageNameQueryRouter, ...rest }) => {
  pageName = pageNameQueryRouter ?? pageName;
  const header = get(modifiedConfig, ["header"]);
  const footer = get(modifiedConfig, ["footer"]);
  const sections = get(modifiedConfig, ["pages", pageName, "sections"]);
  const [show, setShow] = useState(true)
  const acceptCookie = useSelector((state) => state.get("acceptCookie"));
  useEffect(() => {
    if (acceptCookie) {
      setShow(false)
    }
  }, [acceptCookie])
  console.log()
  return (
    <MainContainer>
      <RenderHeader pageName={pageName} config={header} menus={modifiedConfig?.menus} />
      <MainWrapper className="main-content">
        <RenderSections {...rest} sections={sections} />
      </MainWrapper>
      {pageName !== "login" && (<DynamicFooter config={footer} />)}
      {show && <AcceptCookie />}
      <NotificationProvider />
    </MainContainer>
  );
};

export default PageContainer;
