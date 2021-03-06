import React from "react";

const IconMapMarker = ({ width = 24, height = 24, color = "currentColor" }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.773 15.2729L12 20.0459L7.227 15.2729C6.28301 14.3289 5.64014 13.1262 5.3797 11.8168C5.11925 10.5075 5.25293 9.15026 5.76382 7.91687C6.27472 6.68347 7.13988 5.62927 8.24991 4.88757C9.35994 4.14588 10.665 3.75 12 3.75C13.335 3.75 14.6401 4.14588 15.7501 4.88757C16.8601 5.62927 17.7253 6.68347 18.2362 7.91687C18.7471 9.15026 18.8808 10.5075 18.6203 11.8168C18.3599 13.1262 17.717 14.3289 16.773 15.2729ZM12 11.9999C12.3978 11.9999 12.7794 11.8419 13.0607 11.5606C13.342 11.2793 13.5 10.8978 13.5 10.4999C13.5 10.1021 13.342 9.72059 13.0607 9.43928C12.7794 9.15798 12.3978 8.99994 12 8.99994C11.6022 8.99994 11.2206 9.15798 10.9393 9.43928C10.658 9.72059 10.5 10.1021 10.5 10.4999C10.5 10.8978 10.658 11.2793 10.9393 11.5606C11.2206 11.8419 11.6022 11.9999 12 11.9999Z"
        fill={color}
      />
    </svg>
  );
};

export default IconMapMarker;
