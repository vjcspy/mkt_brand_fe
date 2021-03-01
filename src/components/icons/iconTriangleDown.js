import React from "react";

const IconTriangleDown = ({ width = 24, height = 24, color = "currentColor", ...rest }) => {
  return (
    <svg {...rest} width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 9L12 17L19 9" fill={color} />
    </svg>
  );
};

export default IconTriangleDown;
