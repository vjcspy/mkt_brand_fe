import React, { useCallback } from "react";
import { Range, getTrackBackground } from "react-range";
import { useDispatch } from "react-redux";
import { UPDATE_CONFIG } from "../../../constants";
import { ComponentWrapper } from "./styled";

const RangeComponent = ({ config, path }) => {
  const dispatch = useDispatch();
  const updateConfig = useCallback((path, value) => dispatch({ type: UPDATE_CONFIG, path, value }), [dispatch]);
  return (
    <ComponentWrapper key={config.name}>
      <label>
        {config.title}: {config.value[0]}
      </label>
      <Range
        step={config.step}
        min={config.min}
        max={config.max}
        values={config.value}
        onChange={(values) => {
          updateConfig(path, values);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              height: "6px",
              width: "100%",
              backgroundColor: "#ccc",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                alignSelf: "center",
                background: getTrackBackground({
                  values: config.value,
                  colors: ["#548BF4", "#ccc"],
                  min: config.min,
                  max: config.max,
                }),
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              outline: "none",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div
              style={{
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                backgroundColor: isDragged ? "#548BF4" : "#CCC",
              }}
            />
          </div>
        )}
      />
    </ComponentWrapper>
  );
};

export default RangeComponent;
