import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../src/components/notification";
import {
  DEVELOPMENT_MODE,
  GET_SITE,
  SET_LIST_BLOG_EDIT_PAGE,
  SET_MODE,
  SET_OUR_MENUS,
  SET_PAGE_NAME,
} from "../../src/constants";
import PageContainer from "../../src/containers/pageContainer";
import DevelopmentLayout from "../../src/development/containers/developmentLayout";
import { menus } from "../../src/dummyData/menus";
import useFromJS from "../../src/hooks/useFromJS";
import useSiteRouter from "../../src/hooks/useSiteRouter";
import { fetchMenuCategories, getListBlog } from "../../src/services/backend";

export async function getStaticProps() {
  const site_code = process.env.SITE_CODE;
  const data = await fetchMenuCategories();
  return {
    props: {
      site_code: site_code ?? null,
      menus: data.children,
    },
  };
}

const Home = ({ site_code, menus }) => {
  /// Selector
  const token = useSelector((s) => s.get("token"));
  const modifiedConfig = useFromJS(["modifiedConfig"]);
  const router = useSiteRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_MODE, value: DEVELOPMENT_MODE });
  }, []);

  useEffect(() => {
    if (!token) {
      router.push("/edit/signin");
    } else {
      dispatch({ type: SET_OUR_MENUS, value: menus });
      dispatch({ type: GET_SITE, site_code });
    }
  }, [token, site_code]);
  useEffect(async () => {
    switch (router.query.page) {
      case "blog":
        try {
          const { data } = await getListBlog();
          dispatch({ type: SET_LIST_BLOG_EDIT_PAGE, value: data?.data?.blogs });
        } catch (e) {
          showNotification(dispatch, "Fail load data");
        }
        break;
    }
  }, [router.query.page]);
  return (
    <DevelopmentLayout>
      <Head>
        <script
          src={`https://cdn.tiny.cloud/1/${process.env.NEXT_PUBLIC_KEY_TINY_EDITOR}/tinymce/5/tinymce.min.js`}
          referrerpolicy="origin"
        ></script>
      </Head>
      <PageContainer modifiedConfig={modifiedConfig} pageNameQueryRouter={router.query.page ?? "home"} />
    </DevelopmentLayout>
  );
};

// Home.getInitialProps = async (ctx) => {
//   return {
//     site_code: ctx.query.site,
//   };
// };

export default Home;
