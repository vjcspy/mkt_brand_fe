import React, { useState, useEffect, useMemo } from "react";
import { RenderHeader, Sections } from "../../sections";
import { MainContainer, MainWrapper } from "../../styles";
import { get } from "lodash";
import DynamicFooter from "../../sections/dynamic-footer";
import { useSelector } from "react-redux";
import OnePageScroll from "../../components/one-page-scroll/one-page-scroll";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import useRefCallback from "../../hooks/useRefCallback";
import NotificationProvider from "../../components/notification";
import AcceptCookie from "../../components/accept-cookie";
const HomePageContainer = ({ siteCode, pageName, modifiedConfig, pageNameQueryRouter, ...rest }) => {
  pageName = pageNameQueryRouter ?? pageName;
  const header = get(modifiedConfig, ["header"]);
  const footer = get(modifiedConfig, ["footer"]);
  const sections = get(modifiedConfig, ["pages", pageName, "sections"]);
  const [show, setShow] = useState(true);
  const acceptCookie = useSelector((state) => state.get("acceptCookie"));
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const [{ width, height }, ref] = useIframeResize();
  const [currentPage, setCurrentPage] = useState(0);
  const [isDisableTop, setIsDisableTop] = useState(true);
  useEffect(() => {
    if (acceptCookie) {
      setShow(false);
    }
  }, [acceptCookie]);

  const handlePageChange = useRefCallback((index) => {
    setCurrentPage(index);
  }, []);
  const renderSection = useMemo(() => {
    let result =
      sections?.map((config) => {
        const Section = Sections[config?.name];
        if (Section) {
          return (
            <Section
              isDisableTop={isDisableTop} // for scroll banner (#parent)
              onDisableTop={(value) => setIsDisableTop(value)}
              {...rest}
              key={config.code}
              config={config}
            />
          );
        }
      }) ?? [];
    result.push(<DynamicFooter config={footer} />);
    return result;
  }, [modifiedConfig, sections, isDisableTop]);
  return (
    <MainContainer>
      <RenderHeader pageName={pageName} config={header} menus={modifiedConfig?.menus} />
      <MainWrapper className="main-content">
        <OnePageScroll
          from="page home"
          key={"HomePageContainer"}
          isDisableTop={!isDisableTop}
          pageOnChange={handlePageChange}
          customPageNumber={currentPage}
          containerHeight={height - headerHeight}
        >
          {/* {sections?.map((config) => {
            const Section = Sections[config?.name];
            if (!Section) {
              return null;
            }
            return (
              <Section
                isDisableTop={isDisableTop} // for scroll banner (#parent)
                onDisableTop={(value) => setIsDisableTop(value)}
                {...rest}
                key={config.code}
                config={config}
              />
            );
          })}
          <DynamicFooter config={footer} /> */}
          {renderSection}
        </OnePageScroll>
      </MainWrapper>
      {show && <AcceptCookie />}
      <NotificationProvider />
    </MainContainer>
  );
};

export default HomePageContainer;
