import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../src/components/notification";
import { DEVELOPMENT_MODE, GET_SITE, SET_LIST_BLOG_EDIT_PAGE, SET_MODE, SET_OUR_MENUS } from "../../src/constants";
import PageContainer from "../../src/containers/pageContainer";
import DevelopmentLayout from "../../src/development/containers/developmentLayout";
import useFromJS from "../../src/hooks/useFromJS";
import useSiteRouter from "../../src/hooks/useSiteRouter";
import { Pages } from "../../src/sections";
import { fetchMenuCategories, getListBlog } from "../../src/services/backend";

export async function getStaticProps() {
  const site_code = process.env.SITE_CODE;
  var menus = [];
  try {
    menus = await fetchMenuCategories();
  } catch (e) {
    console.error(e);
  }
  return {
    props: {
      site_code: site_code ?? null,
      menus: menus,
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
