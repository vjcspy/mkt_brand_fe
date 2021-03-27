import React from "react";
import AcceptCookie from "../../components/accept-cookie";
import { RenderHeader, RenderSections } from "../../sections";
import { MainContainer, MainWrapper } from "../../styles";
import NotificationProvider from "../../components/notification";
import { get } from "lodash";
import DynamicFooter from "../../sections/dynamic-footer";

const PageContainer = ({ modifiedConfig, pageName, shouldHideFooter, pageNameQueryRouter, ...rest }) => {
  pageName = pageNameQueryRouter ?? pageName;
  const header = get(modifiedConfig, ["header"]);
  const footer = get(modifiedConfig, ["footer"]);
  const sections = get(modifiedConfig, ["pages", pageName, "sections"]);

  return (
    <MainContainer>
      <RenderHeader pageName={pageName} config={header} menus={modifiedConfig?.menus} />
      <MainWrapper className="main-content">
        <RenderSections {...rest} sections={sections} footer={footer} />
      </MainWrapper>
      {!shouldHideFooter && <DynamicFooter config={footer} />}
      <AcceptCookie />
      <NotificationProvider />
    </MainContainer>
  );
};

export default PageContainer;
