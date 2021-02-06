import React from "react";

const IconPoint = ({ color = "#242424" }) => {
  return (
    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.45312 6.23438C4.89844 6.23438 6.08594 5.03906 6.08594 3.60156C6.08594 2.15625 4.89844 0.960938 3.45312 0.960938C2.00781 0.960938 0.8125 2.15625 0.8125 3.60156C0.8125 5.03906 2.00781 6.23438 3.45312 6.23438Z"
        fill={color}
      />
    </svg>
  );
};

export default IconPoint;
