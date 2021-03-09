import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isArray, isObject } from "lodash";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CONFIG, REMOVE_CONFIG } from "../../../constants";
import { DevSecondaryButton } from "../../../styles/developmentStyle";
import { ComponentWrapper, LinkWrapper, MultipleWrapper, RemoveMenuLink } from "./styled";

const LinkComponent = ({ config, path }) => {
  const locale = useSelector((s) => s.get("locale"));
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
                  value={label[locale]}
                  onChange={(e) => {
                    updateConfig([...path, subIndex, "label", locale], e.target.value);
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
                label: { vi: "Menu Label", en: "Menu Label" },
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
            value={config.value.label[locale]}
            onChange={(e) => {
              updateConfig([...path, "label", locale], e.target.value);
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
