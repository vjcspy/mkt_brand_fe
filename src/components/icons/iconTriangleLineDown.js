import React from "react";

const IconTriangleLineDown = ({ width = 14, height = 8, color = "currentColor", ...rest }) => {
  return (
    <svg {...rest} width={width} height={height} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L7 6L13 1" stroke={color} strokeWidth="2" strokeMiterlimit="10" />
    </svg>
  );
};

export default IconTriangleLineDown;
