import { get } from "lodash";
import { useRouter } from "next/dist/client/router";
import { stringifyUrl } from "query-string";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useSiteRouter from "../../hooks/useSiteRouter";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import BannerItem from "./banner-item";
import { TabContainerWrapper, TabScrollWrapper } from "./style";
const defaultConfig = {
  type: "section",
  code: "tab-banner-dawdaw",
  name: "tabBanner",
  title: "Tab Group",
  components: {
    tabBanner: {
      type: "group",
      title: "Tab Banners",
      name: "tabBanner",
      defaultConfig: {
        tabCode: {
          type: "textIgnoreLocale",
          title: "Tab Code",
          value: "tabCode",
          name: "tabCode",
        },
        firstLoad: {
          type: "radio",
          title: "First load",
          value: {
            active: "No",
            titles: ["Yes", "No"],
          },
        },
        tab: {
          type: "group",
          title: "Tab Banner detail",
          name: "tab",
          value: [],
          defaultConfig: {
            imageDesktop: { order: 1, type: "image", title: "Banner Desktop", value: null },
            imageMobile: { order: 2, type: "image", title: "Banner Mobile", value: null },
            statusTab: {
              order: 3,
              type: "radio",
              title: "Status",
              value: { active: "Show", titles: ["Show", "Hidden"] },
            },
            typeTab: {
              order: 4,
              type: "radio",
              title: "Type",
              value: { active: "Normal", titles: ["Normal", "Flash"] },
            },
            headText: { order: 5, type: "text", title: "Head", value: { vi: "Head", en: "Head" } },
            showHead: {
              order: 6,
              type: "radio",
              title: "Show Head",
              value: { active: "Show", titles: ["Show", "Hidden"] },
            },
            contentText: {
              order: 7,
              type: "text",
              title: "Content",
              value: { vi: "Content Text", en: "Content Text" },
            },
            showContent: {
              order: 8,
              type: "radio",
              title: "Show Content",
              value: { active: "Show", titles: ["Show", "Hidden"] },
            },
            promoCode: { order: 9, type: "textIgnoreLocale", title: "Promo Code", name: "promoCode", value: "" },
            menuCode: { order: 10, type: "textIgnoreLocale", title: "Menu Code", name: "menuCode", value: "" },
            restaurantCode: {
              order: 11,
              type: "textIgnoreLocale",
              title: "Restaurant Code",
              name: "restaurantCode",
              value: "",
            },
            link: {
              order: 12,
              type: "link",
              name: "link",
              title: "Link",
              value: {
                label: { vi: "Xem ưu đãi", en: "Xem ưu đãi" },
                url: "/",
              },
            },
          },
        },
      },
      value: [],
    },
  },
};

const TabBanner = ({ config = defaultConfig, footer }) => {
  const router = useSiteRouter();
  const { tabBanner, bannerItem } = router.query;
  const length = config.components.tabBanner.value.length;
  const miniDelta = 20;
  const [{ width }, ref] = useIframeResize();
  const containerRef = useRef();
  const [transition, setTransition] = useState(true);
  const [translateX, setTranslateX] = useState();
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [movePos, setMovePos] = useState({ x: 0, y: 0 });
  const [disableTouchInFooter, setDisableTouchFooter] = useState(false)
  const [delta, setDelta] = useState({
    current: { x: 0, y: 0 },
    positive: false,
  });


  const [indexBannerCurrentTab, setIndexBannerCurrentTab] = useState({
    [tabBanner]: (bannerItem?.replace(tabBanner + '-') ?? 1) - 1
  });

  const handleChangeCurrentTab = useCallback((tab, index) => {
    setIndexBannerCurrentTab(pre => ({
      ...pre,
      [tab]: index + 1
    }))
  }, [])


  useEffect(() => {
    const currentTab = config.components.tabBanner.value.find(item => item.tabCode?.value === tabBanner)
    if (currentTab) {
      const sizeofTab = currentTab.tab.value.length
      if (sizeofTab === indexBannerCurrentTab[tabBanner] - 1) {
        setDisableTouchFooter(true)
      } else {
        setDisableTouchFooter(false)
      }
    }
  }, [indexBannerCurrentTab, tabBanner])

  useEffect(() => {
    if (tabBanner) {
      let index = config.components.tabBanner.value.findIndex((t) => t.tabCode?.value === tabBanner);
      if (index > -1) {
        setTranslateX(-index);
      }
    }
  }, [config, tabBanner]);

  useEffect(() => {
    let tab = get(config, ["components", "tabBanner", "value", Math.abs(translateX)]);
    if (tab) {
      router.pushQuery(
        stringifyUrl({
          url: router.pathname,
          query: {
            tabBanner: tab?.tabCode.value,
            bannerItem: tab?.tabCode.value + '-' + (indexBannerCurrentTab[tab?.tabCode.value] ?? 1)
          },
        }),
        undefined,
        { shallow: true }
      );
    } else {
      let active = config.components.tabBanner.value.find((t) => t.firstLoad?.value.active === "Yes");
      if (sessionStorage.getItem("redirect") != "true" && window.innerWidth <= 768 && active) {
        router.pushQuery(
          stringifyUrl({
            url: router.pathname,
            query: { tabBanner: active?.tabCode.value },
          }),
          undefined,
          { shallow: true }
        );
      }
      sessionStorage.setItem("redirect", "true");
    }
  }, [config, translateX]);

  useEffect(() => {
    if (!tabBanner) {
      let active = config.components.tabBanner.value[0];
      router.pushQuery(
        stringifyUrl({
          url: router.pathname,
          query: { tabBanner: active?.tabCode.value },
        }),
        undefined,
        { shallow: true }
      );
    }
  }, [])

  useEffect(() => {
    const e = new Event("tabbanner");
    e.percentage = ((startPos.x - movePos.x) / width) * 100;
    e.transition = transition;
    var index = Math.abs(translateX ?? 0);
    e.index = index;
    window.dispatchEvent(e);
  }, [transition, translateX, startPos, movePos, width, length]);

  const onTouchStart = useCallback(
    (event) => {
      const X = event.touches[0].pageX;
      const Y = event.touches[0].pageY;
      setStartPos({ x: X, y: Y });
      setMovePos({ x: X, y: Y });
      setTransition(false);
      setDelta({
        start: { x: X, y: Y },
        current: { x: X, y: Y },
        positive: undefined,
      });
    },
    [config]
  );

  const onTouchMove = useCallback(
    (event) => {
      if (disableTouchInFooter) return;
      const X = event.touches[0].pageX;
      const Y = event.touches[0].pageY;
      if (Math.abs(startPos.y - Y) > Math.abs(startPos.x - X)) {
        setMovePos(startPos);
        setTransition(true);
      } else {
        setTransition(false);
        setMovePos({ x: X, y: Y });
      }
      setDelta(({ current, start }) => ({
        start: start,
        current: { x: X, y: Y },
        next: X < start.x,
        positive: Math.abs(start.x - X) <= miniDelta ? undefined : current.x > X,
      }));
    },
    [config, startPos]
  );

  const onTouchEnd = useCallback(() => {
    setTransition(true);
    if (typeof delta.positive !== "undefined") {
      if (delta.positive && delta.next) {
        setTranslateX((pre = 0) => {
          return Math.max(pre - 1, -(length - 1));
        });
      } else if (!delta.positive && !delta.next) {
        setTranslateX((pre = 0) => {
          return Math.min(pre + 1, 0);
        });
      }
    }
    setMovePos({ x: 0, y: 0 });
    setStartPos({ x: 0, y: 0 });
  }, [delta]);
  return (
    <TabScrollWrapper onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onTouchStart={onTouchStart} ref={ref}>
      <TabContainerWrapper
        ref={containerRef}
        style={{
          width: `${length * 100}%`,
          transition: transition ? "transform 0.3s ease-out" : "none",
          transform: `translateX(${((translateX + (movePos.x - startPos.x) / width) * 100) / length}%)`,
        }}
      >
        {config.components.tabBanner.value.map((config, index) => (
          <BannerItem key={index} tabCode={config.tabCode.value} config={config.tab} footer={footer} onChangeBanner={handleChangeCurrentTab} />
        ))}
      </TabContainerWrapper>
    </TabScrollWrapper>
  );
};

TabBanner.defaultConfig = defaultConfig;

export default TabBanner;
