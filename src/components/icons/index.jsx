import React from "react";
import IconCamera from "./iconCamera";
import IconCoin from "./iconCoin";
import IconTabGift from "./iconTabGift";
import IconTabHistory from "./iconTabHistory";
import IconTabProfile from "./iconTabProfile";
import IconTabPromo from "./iconTabPromo";

const Icon = ({ icon, ...props }) => {
  switch (icon) {
    case "tab-profile":
      return <IconTabProfile {...props} />;
    case "tab-promo":
      return <IconTabPromo {...props} />;
    case "tab-history":
      return <IconTabHistory {...props} />;
    case "tab-gift":
      return <IconTabGift {...props} />;
    case "camera":
      return <IconCamera {...props} />;
    case "coin":
      return <IconCoin {...props} />;
    default:
      return null;
  }
};

export default Icon;
