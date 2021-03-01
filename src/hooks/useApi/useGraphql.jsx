import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_MENU } from "../../constants";
import useFromJS from "../useFromJS";

const useGraphql = () => {
  const { data } = useFromJS(["apiStatus", "menu"]) ?? {};
  const graphqlHost = useSelector((s) => s.get("graphqlHost"));
  const dispatch = useDispatch();
  useEffect(() => {
    if (graphqlHost) {
      dispatch({ type: FETCH_MENU, urlKey: process.env.SITE_CODE });
    }
  }, [graphqlHost]);
  return data;
};

export default useGraphql;
