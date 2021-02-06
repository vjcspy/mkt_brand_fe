import React from "react";
import { useSelector } from "react-redux";
import useFromJS from "../../hooks/useFromJS";
import { RenderHeader, RenderSections, RenderFooter } from "../../sections";
import { MainContainer, MainWrapper } from "../../styles";

const PageContainer = ({ shouldHideFooter }) => {
  const pageName = useSelector((s) => s.get("pageName"));
  const header = useFromJS(["modifiedConfig", "header"]);
  const footer = useFromJS(["modifiedConfig", "footer"]);
  const sections = useFromJS(["modifiedConfig", "pages", pageName, "sections"]);
  return (
    <MainContainer>
      <RenderHeader config={header} />
      <MainWrapper className="main-content">
        <RenderSections sections={sections} />
      </MainWrapper>
      {!shouldHideFooter && <RenderFooter config={footer} />}
    </MainContainer>
  );
};

export default PageContainer;
