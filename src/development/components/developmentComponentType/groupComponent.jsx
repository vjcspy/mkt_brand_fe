import React, { useCallback } from "react";
import { isArray } from "lodash";
import SectionThumbnail from "../../components/sectionsConfig/sectionThumbnail";
import { SectionItem, SectionThumbnailWrapper } from "../../components/sectionsConfig/styled";
import { ComponentWrapper, MultipleWrapper } from "./styled";
import { useDispatch } from "react-redux";
import { DevSecondaryButton } from "../../../styles/developmentStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionTitle from "../../components/sectionsConfig/sectionTitle";
import { REMOVE_CONFIG, UPDATE_CONFIG } from "../../../constants";
import { fromJS } from "immutable";
import GroupConfig from "../groupConfig";

const GroupComponent = ({ config, path, putStage }) => {
  const dispatch = useDispatch();
  const updateConfig = useCallback((path, value) => dispatch({ type: UPDATE_CONFIG, value, path }), [dispatch]);
  const removeConfig = useCallback((path, value) => dispatch({ type: REMOVE_CONFIG, value, path }), [dispatch]);
  return (
    <ComponentWrapper>
      <label>{config.title}</label>
      <MultipleWrapper>
        {isArray(config.value) &&
          config.value.map((components, subIndex) => (
            <SectionItem
              key={subIndex}
              onClick={() => {
                putStage({
                  props: { path: [...path, subIndex] },
                  Component: GroupConfig,
                });
              }}
            >
              <SectionThumbnail components={components} />
              <SectionTitle components={components} />
              <DevSecondaryButton
                icon
                onClick={(e) => {
                  e.stopPropagation();
                  removeConfig(path, subIndex);
                }}
              >
                <FontAwesomeIcon icon="trash-alt" />
              </DevSecondaryButton>
            </SectionItem>
          ))}

        <SectionItem
          add
          onClick={() => {
            updateConfig([...path, config.value.length ?? 0], fromJS(config.defaultConfig));
          }}
        >
          <SectionThumbnailWrapper>
            <FontAwesomeIcon icon={["far", "plus-square"]} />
          </SectionThumbnailWrapper>
          Add {config.title}
        </SectionItem>
      </MultipleWrapper>
    </ComponentWrapper>
  );
};

export default GroupComponent;
