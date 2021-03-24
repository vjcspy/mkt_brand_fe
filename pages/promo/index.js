import { List } from "immutable";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { SET_GOOGLE_MAP_API } from "../../src/constants";
import Layout from "../../src/containers/layout";
import { Pages } from "../../src/sections";
import { formatConfig } from "../../src/services/frontend";
import { getListPromo, getSiteServer } from "../../src/services/backend";
import PageContainer from "../../src/containers/pageContainer";

export async function getServerSideProps({}) {
  const site_code = process.env.SITE_CODE;
  try {
    const [{ data: promoListApi }, { data: site }] = await Promise.all([getListPromo(), getSiteServer(site_code)]);
    console.log("this data: ", promoListApi);
    return {
      props: {
        config: site?.config ?? null,
        site_code: site?.site_code ?? null,
        promoListApi: promoListApi.result.find((item) => item.type === "gift-promotion")?.data,
      },
    };
  } catch (e) {
    return {
      props: {
        config: null,
        site_code: null,
        promoListApi: [],
      },
    };
  }
}

const Promo = ({ config, site_code, promoListApi }) => {
  console.log(promoListApi);
  const modifiedConfig = useMemo(() => formatConfig(config), [config]);
  return (
    <Layout>
      <PageContainer
        promoListApi={promoListApi}
        pageName={Pages.promo.name}
        siteCode={site_code}
        modifiedConfig={modifiedConfig}
      />
    </Layout>
  );
};

export default Promo;
