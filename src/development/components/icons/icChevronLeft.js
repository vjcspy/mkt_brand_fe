import React from "react";

const IconChevronLeft = ({ color, width = 20, height = 20 }) => {
  return (
    <svg viewBox="0 0 32 32" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <g id="chevron-left">
        <line stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="11" x2="20" y1="16" y2="7" />
        <line stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="20" x2="11" y1="25" y2="16" />
      </g>
    </svg>
  );
};

export default IconChevronLeft;
