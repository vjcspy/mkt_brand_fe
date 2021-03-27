import ImageText from "./imageText";
import Footer from "./footer";
import Header from "./header";
import OurMenuDetail from "./ourMenuDetail";
// import Breadcrumbs from "./breadcrumbs";
import ProfileSection from "./profileSection";
import MapAddress from "./mapAddress";
import SectionSignIn from "./signIn";
import Article from "./article";
import PromoSection from "./promoSection";
import Comment from "./comment";
import PromoBanner from "./PromoBanner";
// import BookingBanner from "./BookingBanner";
// import MenuBanner from "./menuBanner";
import BlogSection from "./BlogSection";
import DynamicContentHTML from "./dynamicContentHTML";
import PolicyCookie from "./policyCookie";
import TabBanner from "./tab-banner";
import DynamicFooter from "./dynamic-footer";

export const RenderHeader = ({ config, menus, pageName }) => {
  const H = Headers[config?.name];
  return H ? <H config={config} menus={menus} pageName={pageName} /> : null;
};

export const RenderFooter = ({ config }) => {
  // const F = DynamicFooter[config?.name];
  // console.log(F);
  return <DynamicFooter config={config} />;
};

export const RenderSections = ({ sections, ...rest }) => {
  return (
    sections?.map((config) => {
      const Section = Sections[config.name];
      if (!Section) {
        return null;
      }
      return <Section {...rest} key={config.code} config={config} />;
    }) ?? null
  );
};

const pageHome = {
  title: "Home",
  // titleTranslate: "breadcrumbs.home",
  path: "/",
  icon: "home",
  name: "home",
  sections: [TabBanner.defaultConfig],
  breadcrumbs: [],
  shouldHideFooter: true,
};

const pagePromo = {
  name: "promo",
  // titleTranslate: "breadcrumbs.promo",
  title: "Promo",
  path: "/promo",
  icon: "project-diagram",
  sections: [PromoSection.defaultConfig, Comment.defaultConfig],
  // breadcrumbs: [pageHome],
};

// const pageOurMenu = {
//   name: "our-menu",
//   title: "Our Menu",
//   titleTranslate: "breadcrumbs.our_menu",
//   path: "/our-menu",
//   icon: "utensils",
//   sections: [MenuBanner.defaultConfig],
//   breadcrumbs: [pageHome],
// };

const pageOurMenuDetail = {
  name: "our-menu-detail",
  title: "Our Menu Detail",
  path: "/our-menu/[menu]",
  icon: "utensils",
  sections: [OurMenuDetail.defaultConfig],
  shouldHideFooter: true,
  // breadcrumbs: [pageHome, pageOurMenu],
};

const pageMap = {
  name: "map",
  title: "Địa chỉ nhà hàng",
  // titleTranslate: "breadcrumbs.address_restaurant",
  path: "/map",
  icon: "map",
  sections: [MapAddress.defaultConfig],
  // breadcrumbs: [pageHome],
};

const pageProfile = {
  name: "profile",
  title: "Profile",
  titleTranslate: "breadcrumbs.info_account",
  path: "/profile",
  icon: "user",
  sections: [ProfileSection.defaultConfig],
  // breadcrumbs: [pageHome],
};

const pageLogin = {
  name: "login",
  title: "Login",
  path: "/login",
  icon: "user",
  sections: [SectionSignIn.defaultConfig],
  // breadcrumbs: [],
};

const pageBlog = {
  name: "blog",
  title: "Blog",
  titleTranslate: "breadcrumbs.blog",
  path: "/blog",
  icon: "blog",
  sections: [BlogSection.defaultConfig],
  // breadcrumbs: [],
};

const pageBlogDetail = {
  name: "blog-detail",
  title: "Blog Detail",
  titleTranslate: "breadcrumbs.blog",
  path: "/blog/[slug]",
  icon: "blog",
  sections: [Article.defaultConfig],
  // breadcrumbs: [],
};

// const pageBooking = {
//   name: "booking",
//   title: "Booking",
//   path: "/booking",
//   icon: "blog",
//   sections: [BookingBanner.defaultConfig],
// };

const pagePolicyCookie = {
  name: "policy-cookie",
  title: "Policy Cookie",
  path: "/policy-cookie",
  icon: "blog",
  sections: [PolicyCookie.defaultConfig],
};

export const Pages = {
  home: pageHome,
  promo: pagePromo,
  // "our-menu": pageOurMenu,
  "our-menu-detail": pageOurMenuDetail,
  map: pageMap,
  profile: pageProfile,
  login: pageLogin,
  blog: pageBlog,
  "blog-detail": pageBlogDetail,
  // booking: pageBooking,
  "policy-cookie": pagePolicyCookie,
};

export const Headers = { [Header.defaultConfig.name]: Header };
export const Footers = { [Footer.defaultConfig.name]: Footer };
export const DynamicFooters = { [DynamicFooter.defaultConfig.name]: DynamicFooter };

export const Sections = {
  [ImageText.defaultConfig.name]: ImageText,
  // [Breadcrumbs.defaultConfig.name]: Breadcrumbs,
  [OurMenuDetail.defaultConfig.name]: OurMenuDetail,
  [PromoSection.defaultConfig.name]: PromoSection,
  [ProfileSection.defaultConfig.name]: ProfileSection,
  [MapAddress.defaultConfig.name]: MapAddress,
  [SectionSignIn.defaultConfig.name]: SectionSignIn,
  [Article.defaultConfig.name]: Article,
  [PromoBanner.defaultConfig.name]: PromoBanner,
  // [BookingBanner.defaultConfig.name]: BookingBanner,
  // [MenuBanner.defaultConfig.name]: MenuBanner,
  [BlogSection.defaultConfig.name]: BlogSection,
  [Comment.defaultConfig.name]: Comment,
  [DynamicContentHTML.defaultConfig.name]: DynamicContentHTML,
  [PolicyCookie.defaultConfig.name]: PolicyCookie,
  [TabBanner.defaultConfig.name]: TabBanner,
};
