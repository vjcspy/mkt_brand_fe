import ImageText from "./imageText";
import Footer from "./footer";
import Header from "./header";
import OurMenuDetail from "./ourMenuDetail";
import Breadcrumbs from "./breadcrumbs";
import ProfileSection from "./profileSection";
import MapAddress from "./mapAddress";
import SectionSignIn from "./signIn";
import ListBlog from "./listBlog";
import Article from "./article";
import PromoSection from "./promoSection";
import Comment from "./comment";
import PromoBanner from "./PromoBanner";
import BookingBanner from "./BookingBanner";
import MeuBanner from "./MenuBanner";

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

const pageHome = {
  title: "Home",
  titleTranslate: "breadcrumbs.home",
  path: "/",
  icon: "home",
  name: "home",
  sections: [PromoBanner.defaultConfig],
  breadcrumbs: [],
};
const pagePromo = {
  name: "promo",
  titleTranslate: "breadcrumbs.promo",
  title: "Promo",
  path: "/promo",
  icon: "project-diagram",
  sections: [Breadcrumbs.defaultConfig, PromoSection.defaultConfig, Comment.defaultConfig],
  breadcrumbs: [pageHome],
};

const pageOurMenu = {
  name: "our-menu",
  title: "Our Menu",
  titleTranslate: "breadcrumbs.our_menu",
  path: "/our-menu",
  icon: "utensils",
  sections: [MeuBanner.defaultConfig],
  breadcrumbs: [pageHome],
};
const pageOurMenuDetail = {
  name: "our-menu-detail",
  title: "Our Menu Detail",
  path: "/our-menu/[menu]",
  icon: "utensils",
  sections: [Breadcrumbs.defaultConfig, OurMenuDetail.defaultConfig],
  breadcrumbs: [pageHome, pageOurMenu],
};
const pageMap = {
  name: "map",
  title: "Địa chỉ nhà hàng",
  titleTranslate: "breadcrumbs.address_restaurant",
  path: "/map",
  icon: "map",
  sections: [Breadcrumbs.defaultConfig, MapAddress.defaultConfig],
  breadcrumbs: [pageHome],
};
const pageProfile = {
  name: "profile",
  title: "Profile",
  titleTranslate: "breadcrumbs.info_account",
  path: "/profile",
  icon: "user",
  sections: [Breadcrumbs.defaultConfig, ProfileSection.defaultConfig],
  breadcrumbs: [pageHome],
};
const pageLogin = {
  name: "login",
  title: "Login",
  path: "/login",
  icon: "user",
  sections: [SectionSignIn.defaultConfig],
  breadcrumbs: [],
};
const pageBlog = {
  name: "blog",
  title: "Blog",
  titleTranslate: "breadcrumbs.blog",
  path: "/news",
  icon: "blog",
  sections: [Breadcrumbs.defaultConfig, ListBlog.defaultConfig],
  breadcrumbs: [pageHome],
};
const pageBlogDetail = {
  name: "blog-detail",
  title: "Blog Detail",
  titleTranslate: "breadcrumbs.blog",
  path: "/news/[article]",
  icon: "blog",
  sections: [Breadcrumbs.defaultConfig, Article.defaultConfig],
  breadcrumbs: [pageHome, pageBlog],
};

const pageBooking = {
  name: "booking",
  title: "Booking",
  path: "/booking",
  icon: "blog",
  sections: [BookingBanner.defaultConfig],
};

export const Pages = {
  home: pageHome,
  promo: pagePromo,
  "our-menu": pageOurMenu,
  "our-menu-detail": pageOurMenuDetail,
  map: pageMap,
  profile: pageProfile,
  login: pageLogin,
  blog: pageBlog,
  "blog-detail": pageBlogDetail,
  booking: pageBooking,
};

export const Headers = { [Header.defaultConfig.name]: Header };
export const Footers = { [Footer.defaultConfig.name]: Footer };

export const Sections = {
  [ImageText.defaultConfig.name]: ImageText,
  [Breadcrumbs.defaultConfig.name]: Breadcrumbs,
  [OurMenuDetail.defaultConfig.name]: OurMenuDetail,
  [PromoSection.defaultConfig.name]: PromoSection,
  [ProfileSection.defaultConfig.name]: ProfileSection,
  [MapAddress.defaultConfig.name]: MapAddress,
  [SectionSignIn.defaultConfig.name]: SectionSignIn,
  [ListBlog.defaultConfig.name]: ListBlog,
  [Article.defaultConfig.name]: Article,
  [PromoBanner.defaultConfig.name]: PromoBanner,
  [BookingBanner.defaultConfig.name]: BookingBanner,
  [MeuBanner.defaultConfig.name]: MeuBanner,
};
