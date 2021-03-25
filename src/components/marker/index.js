import React from "react";
import { WrapperMarker } from "./style";
const Marker = ({ title, image }) => {
  return (
    <WrapperMarker>
      <img src={image} />
      <label>{title}</label>
    </WrapperMarker>
  );
};

export default Marker;
