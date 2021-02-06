import React from "react";
import { WrapperRatio, Content } from "./style";
const RatioImage = ({ children, ratio }) => {
  const paddingTop = () => {
    switch (ratio) {
      case "16:9":
        return 56.25;
      default:
        return 100;
    }
  };

  return (
    <WrapperRatio>
      <Content paddingTop={paddingTop}>{children}</Content>
    </WrapperRatio>
  );
};

export default RatioImage;
