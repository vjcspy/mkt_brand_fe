import React from "react";

const IconClose = ({ width = 24, height = 24, color = "currentColor", ...res }) => {
  return (
    <svg {...res} width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 4.5L19.5 19.5" stroke="#231F20" strokeWidth="2" />
      <path d="M19.5 4.5L4.5 19.5" stroke="#231F20" strokeWidth="2" />
    </svg>
  );
};

export default IconClose;
