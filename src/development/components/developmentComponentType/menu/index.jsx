import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_CONFIG } from "../../../../constants";
import useFromJS from "../../../../hooks/useFromJS";
import useMenu from "../../../../hooks/useMenu";
import Dropdown from "../../dropdown";
import { ComponentWrapper } from "../styled";

const MenuComponent = ({ path, config }) => {
  const menus = useFromJS(["modifiedConfig", "menus"]);
  const dispatch = useDispatch();
  const updateComponent = useCallback(
    (value) => {
      dispatch({ type: UPDATE_CONFIG, value, path });
    },
    [dispatch]
  );

  const menu = useMenu(config.value);

  return (
    <ComponentWrapper>
      <label>{config.title}</label>
      <Dropdown
        current={menu?.title}
        items={menus.map((m) => ({
          label: m.title,
          onClick: () => {
            updateComponent(m.name);
          },
        }))}
      />
    </ComponentWrapper>
  );
};

export default MenuComponent;
