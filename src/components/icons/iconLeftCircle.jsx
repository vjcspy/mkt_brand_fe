import React from "react";

const IconLeftCircle = ({ color = "currentColor" }) => {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="27.5" transform="rotate(90 28 28)" fill="#E9E9E9" stroke={color} />
      <path d="M33 18L24 27.5L33 37" stroke={color} strokeWidth="2" strokeMiterlimit="10" />
    </svg>
  );
};

export default IconLeftCircle;
