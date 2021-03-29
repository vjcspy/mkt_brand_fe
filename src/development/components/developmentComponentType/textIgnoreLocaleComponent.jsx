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

const TextIgnoreLocaleComponent = ({ config, path, ignoreLocale, onChangeTextBlog }) => {
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
      <TextArea
        type="text"
        value={ignoreLocale ? config.value : config.value}
        style={{
          height: 75,
        }}
        onChange={(e) => onChange(e)}
      />
    </ComponentWrapper>
  );
};

export default TextIgnoreLocaleComponent;
