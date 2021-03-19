import React, { useState, useEffect } from "react";

const useAppHeight = () => {
  const [appHeight, setAppHeight] = useState(0);
  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--app-height", `${window.innerHeight}px` || "100vh");
      doc.style.setProperty("overflow-y", `hidden`);
      setAppHeight(window.innerHeight);
    };
    window.addEventListener("resize", appHeight);
    appHeight();
  }, []);
  return appHeight;
};

export default useAppHeight;
