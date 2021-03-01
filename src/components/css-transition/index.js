import React, { useEffect, useState } from "react";
export default function CSSTransition({ show, classTransition, timing = 300, children }) {
  const [className, setClassName] = useState();
  const [isEnabled, setEnabled] = useState();

  useEffect(() => {
    let timer;
    if (show) {
      setEnabled(true);
      setClassName(classTransition + "-start");
      timer = setTimeout(() => {
        setClassName(classTransition + "-started");
      }, timing);
    } else {
      setClassName(classTransition + "-end");
      timer = setTimeout(() => {
        setEnabled(false);
        setClassName(classTransition + "-ended");
      }, timing);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [show, timing, classTransition]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (className === classTransition + "-start") {
        setClassName(classTransition + "-starting");
      } else if (className === classTransition + "-end") {
        setClassName(classTransition + "-ending");
      }
    });
    return () => {
      clearTimeout(timer);
    };
  }, [className, classTransition]);

  return isEnabled ? React.cloneElement(children, { className: className }) : null;
}
