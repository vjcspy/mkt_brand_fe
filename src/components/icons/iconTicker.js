import React from "react";

const IconTicker = ({ width = 12, height = 9, color = "currentColor" }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.07573 8.82324L0.175729 4.90081C-0.0585762 4.66516 -0.0585762 4.28308 0.175729 4.0474L1.02424 3.19399C1.25854 2.95832 1.63846 2.95832 1.87277 3.19399L4.5 5.8363L10.1272 0.176739C10.3615 -0.058913 10.7415 -0.058913 10.9758 0.176739L11.8243 1.03015C12.0586 1.2658 12.0586 1.64789 11.8243 1.88356L4.92426 8.82326C4.68994 9.05892 4.31004 9.05892 4.07573 8.82324Z"
        fill={color}
      />
    </svg>
  );
};

export default IconTicker;
