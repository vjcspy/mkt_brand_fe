import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEVELOPMENT_MODE, GET_SITE, SET_MODE, SET_OUR_MENUS } from "../../src/constants";
import PageContainer from "../../src/containers/pageContainer";
import DevelopmentLayout from "../../src/development/containers/developmentLayout";
import { Pages } from "../../src/sections";
import { map } from "lodash";
import { menus } from "../../src/dummyData/menus";
import useSiteRouter from "../../src/hooks/useSiteRouter";

export async function getStaticPaths() {
  const pagePaths = map(Pages, (page) => ({
    params: { page: page.name },
  }));
  console.log("pagePaths", pagePaths);
  return {
    paths: pagePaths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { page } = params;
  const site_code = process.env.SITE_CODE;
  return {
    props: {
      site_code: site_code ?? null,
      page: page ?? null,
    },
  };
}

const PageEdit = ({ site_code }) => {
  /// Selector
  const token = useSelector((s) => s.get("token"));
  const router = useSiteRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_MODE, value: DEVELOPMENT_MODE });
  }, []);

  useEffect(() => {
    if (!token) {
      router.push("/edit/signin");
    } else {
      const { page: pageName } = router.query;
      dispatch({ type: SET_OUR_MENUS, value: menus });
      dispatch({ type: GET_SITE, site_code, pageName });
    }
  }, [token, site_code]);

  return (
    <DevelopmentLayout>
      <PageContainer />
    </DevelopmentLayout>
  );
};

// Home.getInitialProps = async (ctx) => {
//   return {
//     site_code: ctx.query.site,
//   };
// };

export default PageEdit;
