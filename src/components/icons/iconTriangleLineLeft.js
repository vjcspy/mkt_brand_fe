import React from "react";

const IconTriangleLineLeft = ({ width = 20, height = 20, color = "currentColor" }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 1L2 6.5L7 12" stroke={color} strokeWidth="2" strokeMiterlimit="10" />
    </svg>
  );
};

export default IconTriangleLineLeft;
