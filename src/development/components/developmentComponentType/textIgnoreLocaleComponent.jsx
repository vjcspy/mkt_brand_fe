import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { UPDATE_CONFIG } from "../../../constants";
import { themeColor } from "../../../services/frontend";
import { ComponentWrapper } from "./styled";

const TextArea = styled.textarea`
  width: 100% !important;
  min-height: 50px;
  padding: 5px 10px;
  font-weight: 400;
  border: 1px solid ${themeColor("page", "border")};
  border-radius: 4px;
`;

export const NumberInput = styled.input`
width: 100% !important;
height: 50px;
padding: 5px 10px;
font-weight: 400;
border: 1px solid ${themeColor("page", "border")};
border-radius: 4px;
`

const TextIgnoreLocaleComponent = ({ config, type = "text", path, ignoreLocale, onChangeTextBlog }) => {
  const dispatch = useDispatch();
  const onChange = useCallback(
    (e) => {
      if (onChangeTextBlog) {
        onChangeTextBlog(e.target.value);
        return;
      }
      const p = ignoreLocale ? path : [...path];
      dispatch({ type: UPDATE_CONFIG, path: p, value: e.target.value });
    },
    [dispatch, path, ignoreLocale]
  );
  return (
    <ComponentWrapper>
      <label>{config.title}</label>
      {type === "text" && (
        <TextArea
          type={type}
          value={ignoreLocale ? config.value : config.value}
          style={{
            height: 75,
          }}
          onChange={(e) => onChange(e)}
        />
      )}

      {type === "number" && (
        <NumberInput type="number" onChange={(e) => onChange(e)} value={config.value} min={0} />
      )}

    </ComponentWrapper>
  );
};

export default TextIgnoreLocaleComponent;
