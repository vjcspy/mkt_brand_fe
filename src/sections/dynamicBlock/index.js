import React from "react";
import { useSelector } from "react-redux";

const defaultConfig = {
  name: "dynamicBlock",
  title: "Dynamic Block",
  type: "dynamicBlock",
  value: {
    vi: "",
    en: "",
  },
};

const DynamicBlock = ({ config = defaultConfig }) => {
  const locale = useSelector((s) => s.get("locale"));

  return <div>kokok</div>;
};
DynamicBlock.defaultConfig = defaultConfig;

export default DynamicBlock;
