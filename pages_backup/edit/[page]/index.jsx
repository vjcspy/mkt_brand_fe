import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEVELOPMENT_MODE, GET_SITE, SET_MODE, SET_OUR_MENUS, SET_PAGE_NAME } from "../../../src/constants";
import PageContainer from "../../../src/containers/pageContainer";
import DevelopmentLayout from "../../../src/development/containers/developmentLayout";
import { get } from "lodash";
import useSiteRouter from "../../../src/hooks/useSiteRouter";
import {  getSiteServer } from "../../../src/services/backend";

// export async function getStaticPaths() {
//   const pagePaths = map(Pages, (page) => ({
//     params: { page: page.name },
//   }));
//   return {
//     paths: pagePaths,
//     fallback: false,
//   };
// }

export async function getServerSideProps({ params }) {
  const { data: site } = await getSiteServer(process.env.SITE_CODE);
  const menus = get(site, ["menu", "children"], []);
  const { page } = params;
  const site_code = process.env.SITE_CODE;
  return {
    props: {
      site_code: site_code ?? null,
      page: page ?? null,
      menus: menus ?? null,
    },
  };
}

const PageEdit = ({ site_code, menus }) => {
  /// Selector
  const token = useSelector((s) => s.get("token"));
  const site = useSelector((s) => s.get("site"));
  const router = useSiteRouter();
  const { page } = router.query;

  const dispatch = useDispatch();

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
    dispatch({ type: SET_PAGE_NAME, value: page });
  }, [page]);

  return (
    <DevelopmentLayout>
      <PageContainer />
    </DevelopmentLayout>
  );
};

export default PageEdit;
