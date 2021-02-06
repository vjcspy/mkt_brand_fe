import React from "react";

const IconClose = ({ width = 15, height = 15, color = "#242424", ...res }) => {
  return (
    <svg {...res} width={width} height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 2.21571L19.7843 0L11 8.78429L2.21571 0L0 2.21571L8.78429 11L0 19.7843L2.21571 22L11 13.2157L19.7843 22L22 19.7843L13.2157 11L22 2.21571Z"
        fill={color}
      />
    </svg>
  );
};

export default IconClose;
