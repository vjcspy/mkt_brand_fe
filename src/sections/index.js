import ImageText from "./imageText";
import Footer from "./footer";
import Header from "./header";
import OnePageScroller from "./onePageScroller";
import OurMenuDetail from "./ourMenuDetail";
import Breadcrumbs from "./breadcrumbs";
import MenuOnePage from "./menusOnePage";

export const RenderHeader = ({ config }) => {
  const H = Headers[config?.name];
  return H ? <H config={config} /> : null;
};

export const RenderFooter = ({ config }) => {
  const F = Footers[config?.name];
  return F ? <F config={config} /> : null;
};

export const RenderSections = ({ sections }) => {
  return (
    sections?.map((config) => {
      const Section = Sections[config.name];
      if (!Section) {
        return null;
      }
      return <Section key={config.code} config={config} />;
    }) ?? null
  );
};

export const Pages = {
  home: {
    title: "Home",
    path: "/",
    icon: "home",
    name: "home",
    sections: [],
  },
  promo: {
    name: "promo",
    title: "Promo",
    path: "/promo",
    icon: "project-diagram",
    sections: [],
  },
  "our-menu": {
    name: "our-menu",
    title: "Our Menu",
    path: "/our-menu",
    icon: "utensils",
    sections: [],
  },
  "our-menu-detail": {
    name: "our-menu-detail",
    title: "Our Menu Detail",
    path: "/our-menu/[menu]",
    icon: "utensils",
    sections: [],
  },
  map: {
    name: "map",
    title: "Địa chỉ nhà hàng",
    path: "/map",
    icon: "map",
    sections: [],
  },
  profile: {
    name: "profile",
    title: "Profile",
    path: "/profile",
    icon: "user",
    sections: [],
  },
  login: {
    name: "login",
    title: "Login",
    path: "/login",
    icon: "user",
    sections: [],
  },
  blog: {
    name: "blog",
    title: "Blog",
    path: "/blog",
    icon: "blog",
    section: "",
  },
  "blog-detail": {
    name: "blog-detail",
    title: "Blog Detail",
    path: "/blog/[article]",
    icon: "User",
    section: [],
  },
};

export const Headers = { [Header.defaultConfig.name]: Header };
export const Footers = { [Footer.defaultConfig.name]: Footer };

export const Sections = {
  [ImageText.defaultConfig.name]: ImageText,
  [Breadcrumbs.defaultConfig.name]: Breadcrumbs,
  [OnePageScroller.defaultConfig.name]: OnePageScroller,
  [OurMenuDetail.defaultConfig.name]: OurMenuDetail,
  [MenuOnePage.defaultConfig.name]: MenuOnePage,
};
