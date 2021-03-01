import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEVELOPMENT_MODE, GET_SITE, SET_MODE, SET_OUR_MENUS } from "../../src/constants";
import PageContainer from "../../src/containers/pageContainer";
import DevelopmentLayout from "../../src/development/containers/developmentLayout";
import { menus } from "../../src/dummyData/menus";
import useSiteRouter from "../../src/hooks/useSiteRouter";

export async function getStaticProps() {
  const site_code = process.env.SITE_CODE;
  return {
    props: {
      site_code: site_code,
    },
  };
}

const Home = ({ site_code }) => {
  /// Selector
  const token = useSelector((s) => s.get("token"));
  const router = useSiteRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_MODE, value: DEVELOPMENT_MODE });
  }, []);

  useEffect(() => {
    if (!token) {
      router.push("/signin");
    } else {
      dispatch({ type: SET_OUR_MENUS, value: menus });
      dispatch({ type: GET_SITE, site_code });
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

export default Home;
