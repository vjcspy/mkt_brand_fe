import React from "react";

const IconRectangle = ({ color = "currentColor", ...rest }) => {
  return (
    <svg {...rest} width="32" height="4" viewBox="0 0 32 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect opacity="0.5" width="32" height="4" rx="2" fill={color} />
    </svg>
  );
};

export default IconRectangle;
