import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isArray, isObject } from "lodash";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_CONFIG, REMOVE_CONFIG } from "../../../constants";
import { DevSecondaryButton } from "../../../styles/developmentStyle";
import { ComponentWrapper, LinkWrapper, MultipleWrapper, RemoveMenuLink } from "./styled";

const LinkComponent = ({ config, path }) => {
  const dispatch = useDispatch();
  const updateConfig = useCallback((path, value) => dispatch({ type: UPDATE_CONFIG, value, path }), [dispatch]);
  const removeConfig = useCallback((path, value) => dispatch({ type: REMOVE_CONFIG, value, path }), [dispatch]);

  return (
    <ComponentWrapper>
      <label>{config.title}</label>
      {config.multiple && (
        <MultipleWrapper>
          {isArray(config.value) &&
            config.value.map(({ label, url }, subIndex) => (
              <LinkWrapper key={subIndex}>
                <label>Label</label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => {
                    updateConfig([...path, subIndex, "label"], e.target.value);
                  }}
                />
                <label>Url</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    updateConfig([...path, subIndex, "url"], e.target.value);
                  }}
                />
                <RemoveMenuLink
                  onClick={(e) => {
                    removeConfig(path, subIndex);
                  }}
                >
                  <FontAwesomeIcon icon="trash-alt" />
                </RemoveMenuLink>
              </LinkWrapper>
            ))}
          <DevSecondaryButton
            width="100%"
            onClick={() => {
              updateConfig([...path, config.value.length ?? 0], {
                type: "link",
                label: "Menu Label",
                url: "/",
              });
            }}
          >
            Add Menu Link
          </DevSecondaryButton>
        </MultipleWrapper>
      )}
      {!config.multiple && isObject(config.value) && (
        <LinkWrapper>
          <label>Label</label>
          <input
            type="text"
            value={config.value.label}
            onChange={(e) => {
              updateConfig([...path, "label"], e.target.value);
            }}
          />
          <label>Url</label>
          <input
            type="text"
            value={config.value.url}
            onChange={(e) => {
              updateConfig([...path, "url"], e.target.value);
            }}
          />
        </LinkWrapper>
      )}
    </ComponentWrapper>
  );
};

export default LinkComponent;
