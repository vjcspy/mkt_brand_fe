import styled, { keyframes } from "styled-components";
import React from "react";

const pulse = keyframes`
0% {
  transform: scale(1);
  opacity: 1;
}
45% {
  transform: scale(0.1);
  opacity: 0.7;
}
80% {
  transform: scale(1);
  opacity: 1;
}
`;

const Wrapper = styled.div`
  display: ${({ display }) => display};
  & > div {
    background-color: ${({ color }) => color};
  }
  &.fill {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Loader = styled.div`
  width: 15px;
  height: 15px;
  margin: 2px;
  border-radius: 100%;
  display: inline-block;
  animation: ${pulse} 0.75s ${({ delay }) => (delay ?? 1) * 0.12}s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation-fill-mode: both;
`;
const PulseLoader = ({ loading, fill, color = "#ffffff" }) => {
  return (
    <Wrapper color={color} display={loading ? "flex" : "none"} className={fill && "fill"}>
      <Loader delay={1} />
      <Loader delay={2} />
      <Loader delay={3} />
    </Wrapper>
  );
};

export default PulseLoader;
