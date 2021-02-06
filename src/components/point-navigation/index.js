import React, { useMemo } from "react";
import { WrapperListPoint, Item } from "./style";

const PointNavigation = ({
  currentIndex,
  size,
  borderColor = "#ffffff",
  backgroundActive = "#ffffff",
  display = "inline-block",
  ...rest
}) => {
  const dots = useMemo(() => {
    return Array.from(Array(size)).map((_e, i) => i);
  }, [size]);

  return (
    <WrapperListPoint {...rest} maxWidth={20 * size}>
      {dots.map((i) => (
        <Item key={i} active={i === currentIndex} background={backgroundActive} borderColor={borderColor} display={display} />
      ))}
    </WrapperListPoint>
  );
};

export default PointNavigation;
