// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from "react";
export default function usePrevious(value) {
  var ref = useRef({});
  useEffect(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
}