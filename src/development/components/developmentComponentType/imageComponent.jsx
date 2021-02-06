import { isArray } from "lodash";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { REMOVE_CONFIG, SET_MEDIA_DIALOG, UPDATE_CONFIG } from "../../../constants";
import { DevSecondaryButton } from "../../../styles/developmentStyle";
import ImageMedia from "../../components/imageMedia";
import { ComponentWrapper, ImageWrapper, MediaWrapper, MediaGroupButton, MultipleWrapper } from "./styled";

const ImageComponent = ({ config, path }) => {
  const dispatch = useDispatch();
  const updateConfig = useCallback((path, value) => dispatch({ type: UPDATE_CONFIG, path, value }), [dispatch]);
  const removeConfig = useCallback((path, value) => dispatch({ type: REMOVE_CONFIG, value, path }), [dispatch]);
  const showMedia = useCallback((dialog) => dispatch({ type: SET_MEDIA_DIALOG, value: dialog }), [dispatch]);
  return (
    <ComponentWrapper key={config.name}>
      <label>{config.title}</label>
      {config.multiple && isArray(config.value) && (
        <MultipleWrapper>
          {config.value.map((image, subIndex) => (
            <MediaWrapper key={subIndex}>
              <ImageWrapper
                onClick={() => {
                  showMedia({
                    show: true,
                    onSuccess: (media) => {
                      updateConfig([...path, subIndex], media);
                    },
                  });
                }}
              >
                <ImageMedia media={image} formats="thumbnail" />
              </ImageWrapper>
              <MediaGroupButton>
                <DevSecondaryButton
                  onClick={() => {
                    showMedia({
                      show: true,
                      onSuccess: (media) => {
                        updateConfig([...path, subIndex], media);
                      },
                    });
                  }}
                >
                  Change
                </DevSecondaryButton>
                <DevSecondaryButton
                  onClick={(e) => {
                    e.preventDefault();
                    removeConfig(path, subIndex);
                  }}
                >
                  Remove
                </DevSecondaryButton>
              </MediaGroupButton>
            </MediaWrapper>
          ))}
          <DevSecondaryButton
            width="100%"
            onClick={() => {
              updateConfig([...path, config.value.length ?? 0], null);
            }}
          >
            Add Image
          </DevSecondaryButton>
        </MultipleWrapper>
      )}
      {!config.multiple && (
        <MediaWrapper>
          <ImageWrapper
            onClick={() => {
              showMedia({
                show: true,
                onSuccess: (media) => {
                  updateConfig(path, media);
                },
              });
            }}
          >
            <ImageMedia media={config.value} formats="thumbnail" />
          </ImageWrapper>
          <MediaGroupButton>
            <DevSecondaryButton
              onClick={() => {
                showMedia({
                  show: true,
                  onSuccess: (media) => {
                    updateConfig(path, media);
                  },
                });
              }}
            >
              Change
            </DevSecondaryButton>
            <DevSecondaryButton
              onClick={(e) => {
                e.preventDefault();
                removeConfig(path);
              }}
            >
              Remove
            </DevSecondaryButton>
          </MediaGroupButton>
        </MediaWrapper>
      )}
    </ComponentWrapper>
  );
};

export default ImageComponent;
