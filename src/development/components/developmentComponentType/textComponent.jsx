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

const TextComponent = ({ config, path, ignoreLocale }) => {
  const locale = useSelector((s) => s.get("locale"));
  const dispatch = useDispatch();
  const onChange = useCallback(
    (e) => {
      const p = ignoreLocale ? path : [...path, locale];
      // debugger;
      // console.log(p);
      dispatch({ type: UPDATE_CONFIG, path: p, value: e.target.value });
    },
    [dispatch, path, locale, ignoreLocale]
  );
  return (
    <ComponentWrapper>
      <label>{config.title}</label>
      <TextArea
        type="text"
        value={ignoreLocale ? config.value : config.value?.[locale]}
        style={{
          height: 75,
        }}
        onChange={onChange}
      />
    </ComponentWrapper>
  );
};

export default TextComponent;
