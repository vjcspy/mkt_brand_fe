import React, { useState, useEffect } from "react";

const useAppHeight = () => {
  const [appHeight, setAppHeight] = useState(process.browser ? window.innerHeight : 0);

  useEffect(() => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px` || "100vh");
    setAppHeight(window.innerHeight);
  }, []);

  return appHeight;
};

export default useAppHeight;
