import React from "react";
import { WrapperFlex } from "./style";
const RenderListFlex = ({ numberItemOnLineMobile = 1, numItemOnDesktop = 2, children }) => {
  const widthItemDesktop = 100 / numItemOnDesktop + (100 % numItemOnDesktop);
  const widthItemMobile = 100 / numberItemOnLineMobile + (100 % numberItemOnLineMobile);
  return (
    <WrapperFlex widthItemDesktop={widthItemDesktop} widthItemMobile={widthItemMobile}>
      {children}
    </WrapperFlex>
  );
};

export default RenderListFlex;
