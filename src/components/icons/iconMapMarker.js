import React from "react";

const IconMapMarker = ({ width = "8", height = "22", color = "currentColor" }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 0C1.79427 0 0 1.85056 0 4.125C0 7.16818 3.69054 10.7852 3.84767 10.9378C3.89062 10.9792 3.94531 11 4 11C4.05469 11 4.10938 10.9792 4.15235 10.9378C4.30946 10.7852 8 7.16818 8 4.125C8 1.85056 6.20573 0 4 0ZM4 6.41667C2.77473 6.41667 1.77777 5.38856 1.77777 4.125C1.77777 2.86144 2.77475 1.83333 4 1.83333C5.22525 1.83333 6.22223 2.86146 6.22223 4.125C6.22223 5.38854 5.22527 6.41667 4 6.41667Z"
        fill={color}
      />
    </svg>
  );
};

export default IconMapMarker;
