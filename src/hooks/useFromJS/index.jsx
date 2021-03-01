import { useMemo } from "react";
import { useSelector } from "react-redux";

const useFromJS = (paths) => {
  const select = useSelector((s) => s.getIn(paths));
  return useMemo(() => select?.toJS?.() ?? select, [select]);
};

export default useFromJS;
