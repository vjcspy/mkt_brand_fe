import React, { useMemo } from "react";
import useFromJS from "../useFromJS";

const useMenu = (menuName) => {
  const menus = useFromJS(["modifiedConfig", "menus"]);
  return useMemo(() => menus?.find((m) => m.name == menuName), [menus, menuName]);
};

export default useMenu;
