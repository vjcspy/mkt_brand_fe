import React from "react";

const IconView = ({ width = 24, height = "24", color = "currentColor" }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        fill="#7B7979"
      />
      <path
        d="M22 12.5C19.333 17.5004 16 20 12 20C8 20 4.667 17.5004 2 12.5C4.667 7.49964 8 5 12 5C16 5 19.333 7.49964 22 12.5Z"
        stroke="#7B7979"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default IconView;
