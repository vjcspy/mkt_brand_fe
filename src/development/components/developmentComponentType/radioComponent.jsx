import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isArray, isObject } from "lodash";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_CONFIG, REMOVE_CONFIG } from "../../../constants";
import { DevSecondaryButton } from "../../../styles/developmentStyle";
import { ComponentWrapper, LinkWrapper, MultipleWrapper, RemoveMenuLink, WrapperRatio, ItemRadio } from "./styled";

const RadioComponent = ({ config, path }) => {
  let { active, titles } = config.value ?? false;
  const dispatch = useDispatch();
  const updateConfig = useCallback((path, value) => dispatch({ type: UPDATE_CONFIG, value, path }), [dispatch]);
  const removeConfig = useCallback((path, value) => dispatch({ type: REMOVE_CONFIG, value, path }), [dispatch]);
  // const updateConfig = (path, value) => {
  //   console.log(path, value);
  // };
  return (
    <ComponentWrapper>
      <label>{config.title}</label>
      {!config.multiple && isObject(config.value) && (
        <WrapperRatio>
          {titles?.map((item, index) => (
            <ItemRadio key={index}>
              <label>{item}</label>
              <input
                type="radio"
                checked={active === item}
                value={item}
                onChange={(e) => {
                  updateConfig([...path, "active"], e.target.value);
                }}
              />
            </ItemRadio>
          ))}
          {/* <ItemRadio>
            <label>Show</label>
            <input
              type="radio"
              checked={active}
              value={true}
              onChange={(e) => {
                updateConfig([...path, [active]], e.target.value);
              }}
            />
          </ItemRadio>
          <ItemRadio>
            <label>Hidden</label>
            <input
              type="radio"
              checked={!active}
              value={false}
              onChange={(e) => {
                updateConfig([...path, "active"], e.target.value);
              }}
            /> */}
          {/* </ItemRadio> */}
        </WrapperRatio>
      )}
    </ComponentWrapper>
  );
};

export default RadioComponent;
