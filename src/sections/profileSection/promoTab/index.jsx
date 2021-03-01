import React from "react";
import { WrapperProfilePromo } from "./style";
import loadable from "@loadable/component";

import { profilePromo } from "../../../dummyData/profilePromo";
import useIframeResize from "../../../hooks/useWindowResize/useIframeResize";
const PromoTabDesktop = loadable(() => import("./desktop"));
const PromoTabMobile = loadable(() => import("./mobile"));

const PromoTab = ({}) => {
  const [sizeWidth] = useIframeResize();

  return (
    <WrapperProfilePromo className="promo-tab">
      {sizeWidth.width > 768 ? <PromoTabDesktop profilePromo={profilePromo} /> : <PromoTabMobile profilePromo={profilePromo} />}
    </WrapperProfilePromo>
  );
};

export default PromoTab;
