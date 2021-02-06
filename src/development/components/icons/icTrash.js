import React from "react";

const IconTrash = ({ color = "gray", width = 20, height = 20 }) => {
  return (
    <svg viewBox="0 0 32 32" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <g id="trash">
        <rect fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" height="22" width="18" x="7" y="7" />
        <line stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="29" y1="7" y2="7" />
        <line stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13" x2="19" y1="3" y2="3" />
        <line stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13" x2="13" y1="12" y2="22" />
        <line stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="19" x2="19" y1="12" y2="22" />
      </g>
    </svg>
  );
};

export default IconTrash;
