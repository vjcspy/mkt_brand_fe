import React from "react";

const IconMenu = ({ color = "currentColor", width = 32, height = 32, ...res }) => {
  return (
    <svg {...res} width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 16H28" stroke="#231F20" strokeWidth="2" />
      <path d="M4 7H28" stroke="#231F20" strokeWidth="2" />
      <path d="M4 25H28" stroke="#231F20" strokeWidth="2" />
    </svg>
  );
};

export default IconMenu;
