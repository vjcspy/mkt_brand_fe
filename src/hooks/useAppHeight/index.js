import React, { useState, useEffect } from "react";

const useAppHeight = () => {
  const [appHeight, setAppHeight] = useState(process.browser ? window.innerHeight : 0);

  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--app-height", `${window.innerHeight}px`);
      // doc.style.setProperty("overflow-y", `hidden`);
      setAppHeight(window.innerHeight);
    };
    appHeight();
    window.addEventListener("resize", appHeight);

    return () => {
      window.removeEventListener("resize", appHeight);
    };
  }, []);

  return appHeight;
};

export default useAppHeight;
