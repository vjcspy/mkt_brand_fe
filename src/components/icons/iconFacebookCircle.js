import React from "react";

const IconFacebookCircle = ({ color = "#131313", width = 24, height = 24 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05888 27.9411 0 18 0C8.05888 0 0 8.05888 0 18C0 27.9411 8.05888 36 18 36Z"
        fill={color}
      />
      <path
        d="M22.5244 18.7046H19.3125V30.4715H14.4462V18.7046H12.1318V14.5693H14.4462V11.8933C14.4462 9.97961 15.3553 6.98303 19.3558 6.98303L22.9605 6.99811V11.0122H20.3451C19.9161 11.0122 19.3128 11.2265 19.3128 12.1394V14.5731H22.9495L22.5244 18.7046Z"
        fill="white"
      />
    </svg>
  );
};

export default IconFacebookCircle;
