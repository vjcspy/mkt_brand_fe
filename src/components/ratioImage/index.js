import React, { useMemo } from "react";
import { WrapperRatio, Content } from "./style";

const RatioImage = ({ children, ratio }) => {
  const paddingTop = useMemo(() => {
    return ratio === "16:9" ? 56.25 : 100;
  }, [ratio]);

  return (
    <WrapperRatio>
      <Content paddingTop={paddingTop}>{children}</Content>
    </WrapperRatio>
  );
};

export default RatioImage;
