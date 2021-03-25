import React from "react";

const IconTriangleLineLeft = ({ width = 20, height = 20, color = "currentColor", ...rest }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.75 4.5L9 11.625L15.75 18.75" stroke={color} strokeWidth="2" strokeMiterlimit="10" />
    </svg>
  );
};

export default IconTriangleLineLeft;
