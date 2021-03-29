import React from "react";
import { WrapperMarker } from "./style";
const Marker = ({ title, image, ...rest }) => {
  return (
    <WrapperMarker {...rest}>
      <img src={image} />
      <label>{title}</label>
    </WrapperMarker>
  );
};

export default Marker;
