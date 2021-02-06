import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChromePicker } from "react-color";
import { useDispatch } from "react-redux";
import { UPDATE_CONFIG } from "../../../constants";
import { ColorWrapper, ComponentWrapper, PickerDialog } from "./styled";

const ColorComponent = ({ config, path }) => {
  const dispatch = useDispatch();
  const updateConfig = useCallback((path, value) => dispatch({ type: UPDATE_CONFIG, path, value }), [dispatch]);

  const [value, setValue] = useState(config.value);
  const [position, setPosition] = useState();
  const ref = useRef();

  useEffect(() => {
    var t = setTimeout(() => {
      if (value != config.value) {
        updateConfig(path, value);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [value, config.value]);

  const show = useCallback(() => {
    var rect = ref.current.getBoundingClientRect();
    if (process.browser && window.innerHeight - rect.top < 300) {
      setPosition("bottom");
      return;
    }
    setPosition("top");
  }, []);

  const onChange = useCallback(
    ({ rgb: { r, g, b, a }, hex }) => {
      var c = a != 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : hex;
      setValue(c);
    },
    [updateConfig]
  );

  return (
    <ComponentWrapper key={config.name}>
      <label>{config.title}</label>
      <ColorWrapper
        ref={ref}
        color={value}
        onClick={() => show()}
        // onBlur={() => {
        //   if (value != config.value) {
        //     updateConfig(path, value);
        //   }
        //   setPosition();
        // }}
      >
        {value}
        {position && (
          <div
            style={{ position: "fixed", inset: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              if (value != config.value) {
                updateConfig(path, value);
              }
              setPosition();
            }}
          ></div>
        )}
        {position && (
          <PickerDialog position={position}>
            <ChromePicker color={value} onChange={onChange} />
          </PickerDialog>
        )}
      </ColorWrapper>
    </ComponentWrapper>
  );
};

export default ColorComponent;
