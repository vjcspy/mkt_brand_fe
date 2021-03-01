import React from "react";
import loadable from "@loadable/component";
import { useRouter } from "next/router";
import { MainPromo } from "./style";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import { dummyPromoList } from "../../dummyData/listPromo";
import Comment from "../comment";
import useHistory from "../../hooks/useHistory";

const PromoDesktop = loadable(() => import("./desktop"));
const PromoMobile = loadable(() => import("./mobile"));

const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "promoSection",
  title: "Promo Section",
  components: {},
};

const PromoSection = ({ config, theme }) => {
  const [sizeWidth, ref] = useIframeResize();
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <MainPromo ref={ref} className="main-promo">
        {sizeWidth.width > 768 ? (
          <PromoDesktop detailPromo={id} listPromo={dummyPromoList} />
        ) : (
          <PromoMobile detailPromo={id} listPromo={dummyPromoList} />
        )}
      </MainPromo>
      <Comment />
    </>
  );
};

PromoSection.defaultConfig = defaultConfig;

export default PromoSection;
