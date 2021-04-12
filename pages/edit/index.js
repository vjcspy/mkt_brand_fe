import { chain } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../src/components/notification";
import {
  DEVELOPMENT_MODE,
  GET_SITE,
  SET_LIST_BLOG_EDIT_PAGE,
  SET_LIST_PROMO_EDIT_PAGE,
  SET_MODE,
  SET_OUR_MENUS,
  SET_SITE_CODE,
} from "../../src/constants";
import PageContainer from "../../src/containers/pageContainer";
import DevelopmentLayout from "../../src/development/containers/developmentLayout";
import useFromJS from "../../src/hooks/useFromJS";
import useSiteRouter from "../../src/hooks/useSiteRouter";
import { Pages } from "../../src/sections";
import {
  fetchMenuCategories,
  filterListPromoApi,
  getInitialData,
  getListBlog,
  getListPromo,
} from "../../src/services/backend";

export async function getServerSideProps(ctx) {
  const { siteCode } = await getInitialData(ctx);
  var menus = [];
  try {
    menus = await fetchMenuCategories();
  } catch (e) {
    console.error(e);
  }
  return {
    props: {
      site_code: siteCode ?? null,
      menus: menus ?? null,
    },
  };
}

const Home = ({ site_code, menus }) => {
  /// Selector
  const token = useSelector((s) => s.get("token"));
  const modifiedConfig = useFromJS(["modifiedConfig"]);
  const router = useSiteRouter();
  const dispatch = useDispatch();
  const routerAA = useRouter();

  useEffect(() => {
    dispatch({ type: SET_MODE, value: DEVELOPMENT_MODE });
  }, []);
  useEffect(() => {
    if (!token) {
      routerAA.push("/edit/signin");
    } else {
      dispatch({ type: SET_OUR_MENUS, value: menus });
      dispatch({ type: GET_SITE, site_code });
      dispatch({ type: SET_SITE_CODE, value: site_code });
    }
  }, [token, site_code]);

  useEffect(async () => {
    switch (router.query.page) {
      case Pages.blog.name:
        try {
          const { data } = await getListBlog();
          dispatch({ type: SET_LIST_BLOG_EDIT_PAGE, value: data?.data?.blogs });
        } catch (e) {
          showNotification(dispatch, "Fail load data");
        }
        break;
      case Pages.promo.name:
        try {
          const { data } = await getListPromo();
          let promoListResult = filterListPromoApi(data.result);
          dispatch({ type: SET_LIST_PROMO_EDIT_PAGE, value: promoListResult });
        } catch (e) {
          showNotification(dispatch, "Fail load data");
        }
        break;
      default:
        return;
    }
  }, [router.query.page]);

  const Page = useMemo(() => Pages[router.query.page ?? "home"], [router.query.page]);

  return (
    <DevelopmentLayout>
      <Head>
        <script
          src={`https://cdn.tiny.cloud/1/${process.env.NEXT_PUBLIC_KEY_TINY_EDITOR}/tinymce/5/tinymce.min.js`}
          referrerpolicy="origin"
        ></script>
      </Head>
      <PageContainer
        modifiedConfig={modifiedConfig}
        pageNameQueryRouter={Page.name}
        shouldHideFooter={Page.shouldHideFooter}
      />
    </DevelopmentLayout>
  );
};

// Home.getInitialProps = async (ctx) => {
//   return {
//     site_code: ctx.query.site,
//   };
// };

export default Home;
