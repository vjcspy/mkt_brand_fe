/**
 *
 * LoadingIndicator
 *
 */
import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  > div {
    width: ${({ small }) => (small ? "11px" : "26px")};
    height: ${({ small }) => (small ? "11px" : "26px")};
    border: 4px solid #f3f3f3;
    border-top: 4px solid #555555 !important;
    border-radius: 50%;
    animation: ${spin} 2s linear infinite;
  }

  ${({ fill }) =>
    fill &&
    `
  position: absolute;
  z-index: 1;
  height: 100%;
  align-items: center;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 50%);
  `}
`;

const LoadingIndicator = ({ small, fill }) => (
  <Loader small={small} fill={fill}>
    <div />
  </Loader>
);

LoadingIndicator.propTypes = {
  small: PropTypes.bool,
};

LoadingIndicator.defaultProps = {
  small: false,
};

export default LoadingIndicator;
