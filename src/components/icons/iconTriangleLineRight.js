import React from "react";

const IconTriangleLineRight = ({ width = 20, height = 20, color = "currentColor" }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 12L6 6.5L1 0.999999" stroke={color} strokeWidth="2" strokeMiterlimit="10" />
    </svg>
  );
};

export default IconTriangleLineRight;
