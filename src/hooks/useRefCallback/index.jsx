import React, { useCallback, useRef } from "react";

const useRefCallback = (func, deps = []) => {
  const ref = useRef();
  ref.current = func;

  return useCallback(function () {
    ref.current?.(...arguments);
  }, deps);
};

export default useRefCallback;
