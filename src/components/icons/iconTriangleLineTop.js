import React from "react";

const IconTriangleLineTop = ({ width = 14, height = 8, color = "currentColor", ...rest }) => {
  return (
    <svg {...rest} width={width} height={height} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 7L7 2L0.999999 7" stroke={color} strokeWidth="2" strokeMiterlimit="10" />
    </svg>
  );
};

export default IconTriangleLineTop;
