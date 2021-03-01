import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEVELOPMENT_MODE, GET_SITE, SET_MODE, SET_OUR_MENUS, SET_PAGE_NAME, UPDATE_CONFIG } from "../../../src/constants";
import PageContainer from "../../../src/containers/pageContainer";
import DevelopmentLayout from "../../../src/development/containers/developmentLayout";
import { Pages } from "../../../src/sections";
import { concat, get, isNil, map } from "lodash";
import useSiteRouter from "../../../src/hooks/useSiteRouter";
import { getSite } from "../../../src/services/backend";
import { List } from "immutable";

export async function getStaticPaths() {
  const site = await getSite(process.env.SITE_CODE);
  const menus = get(site, ["menu", "children"], []);
  const menuPaths = map(menus, (menu) => ({
    params: { page: Pages["our-menu"].name, subPage: menu.url_key },
  }));

  const tabs = ["my-profile", "my-promo", "my-history", "register-promo"];
  const tabPaths = map(tabs, (tab) => ({
    params: { page: Pages.profile.name, subPage: tab },
  }));

  // missing blog pages

  const pagePaths = concat(menuPaths, tabPaths);

  return {
    paths: pagePaths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const site = await getSite(process.env.SITE_CODE);
  const menus = get(site, ["menu", "children"], []);
  const { page, subPage } = params;
  const site_code = process.env.SITE_CODE;
  return {
    props: {
      site_code: site_code ?? null,
      page: page ?? null,
      subPage: subPage,
      menus: menus ?? null,
    },
  };
}

const PageEdit = ({ site_code, menus }) => {
  /// Selector
  const token = useSelector((s) => s.get("token"));
  const site = useSelector((s) => s.get("site"));
  const router = useSiteRouter();
  const { page, subPage } = router.query;

  const dispatch = useDispatch();

  useEffect(() => {
    if (page === Pages.profile.name) {
      dispatch({ type: UPDATE_CONFIG, path: ["profile-tab"], value: subPage });
    } else if (page === Pages["our-menu-detail"].name) {
      dispatch({ type: UPDATE_CONFIG, path: ["menu-slug"], value: subPage });
      let menuName = menus?.find((m) => m.url_key === subPage)?.name ?? "";
      dispatch({
        type: UPDATE_CONFIG,
        path: ["breadcrumbs"],
        value: List([
          Pages.home,
          Pages["our-menu"],
          {
            ...Pages["our-menu-detail"],
            path: "/our-menu/" + subPage,
            title: menuName,
          },
        ]),
      });
    }
  }, [page, subPage, menus]);

  useEffect(() => {
    dispatch({ type: SET_MODE, value: DEVELOPMENT_MODE });
  }, []);

  useEffect(() => {
    if (!token) {
      router.push("/edit/signin");
    }
  }, [token]);

  useEffect(() => {
    if (!site) {
      dispatch({ type: GET_SITE, site_code, pageName: page });
      dispatch({ type: SET_OUR_MENUS, value: menus });
    }
  }, [site, site_code, page]);

  useEffect(() => {
    if (page === Pages["our-menu"].name && !isNil(subPage)) {
      dispatch({ type: SET_PAGE_NAME, value: Pages["our-menu-detail"].name });
      return;
    }
    dispatch({ type: SET_PAGE_NAME, value: page });
  }, [page, subPage]);

  return (
    <DevelopmentLayout>
      <PageContainer />
    </DevelopmentLayout>
  );
};

export default PageEdit;
