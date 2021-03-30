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
import { fromJS, List } from "immutable";
import GroupConfig from "../groupConfig";
let indexChange;
const GroupBlogComponent = ({ config, path, putStage }) => {
  const dispatch = useDispatch();
  const updateConfig = useCallback((path, value) => dispatch({ type: UPDATE_CONFIG, value, path }), [dispatch]);
  const removeConfig = useCallback((path, value) => dispatch({ type: REMOVE_CONFIG, value, path }), [dispatch]);
  const onOrderList = (indexChange, indexByChange) => {
    const tamp = config.value[indexChange];
    config.value[indexChange] = config.value[indexByChange];
    config.value[indexByChange] = tamp;
    return config.value.map((item) => fromJS(item));
  };
  const onDragStart = (e, index) => {
    indexChange = index;
  };

  const handleDrop = (e) => {
    const indexByChange = +e.target.dataset.index;
    if (indexByChange >= 0) {
      dispatch({ type: UPDATE_CONFIG, value: onOrderList(indexChange, indexByChange), path });
    }
  };
  return (
    <ComponentWrapper>
      <label>{config.title}</label>
      <MultipleWrapper
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => handleDrop(e)}
      >
        {isArray(config.value) &&
          config.value.map((components, subIndex) => (
            <SectionItem
              data-index={subIndex}
              key={subIndex}
              draggable="true"
              onDragStart={(e) => onDragStart(e, subIndex)}
              onClick={(e) => {
                e.stopPropagation();
                putStage({
                  props: { path: [...path, subIndex], putStage },
                  Component: GroupConfig,
                });
              }}
            >
              <SectionThumbnail components={components} />
              <SectionTitle data-index={subIndex} components={components} />
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

export default GroupBlogComponent;
