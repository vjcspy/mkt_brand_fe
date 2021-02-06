import React from "react";

const IconFacebook = ({ color = "#131313", width = 24, height = 24 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.2125 0H0.7875C0.3375 0 0 0.3375 0 0.7875V17.325C0 17.6625 0.3375 18 0.7875 18H9V12.375H6.75V9H9V6.75C9 4.3875 10.35 3.375 12.375 3.375C13.3875 3.375 14.4 3.375 14.625 3.375V6.75H13.5C12.825 6.75 12.375 7.2 12.375 7.875V9H15.3L14.625 12.375H12.375V18H17.2125C17.6625 18 18 17.6625 18 17.2125V0.7875C18 0.3375 17.6625 0 17.2125 0Z"
        fill={color}
      />
    </svg>
  );
};

export default IconFacebook;
