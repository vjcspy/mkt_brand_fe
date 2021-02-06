import React, { useEffect, useState } from "react";
export default function CSSTransition({ show, classTransition, timing = 300, children }) {
  const [className, setClassName] = useState();
  const [isEnabled, setEnabled] = useState();

  useEffect(() => {
    if (show) {
      setEnabled(true);
      setClassName(classTransition + "-start");
      setTimeout(() => {
        setClassName(classTransition + "-started");
      }, timing);
    } else {
      setClassName(classTransition + "-end");
      setTimeout(() => {
        setEnabled(false);
        setClassName(classTransition + "-ended");
      }, timing);
    }
  }, [show, timing, classTransition]);

  useEffect(() => {
    setTimeout(() => {
      if (className === classTransition + "-start") {
        setClassName(classTransition + "-starting");
      } else if (className === classTransition + "-end") {
        setClassName(classTransition + "-ending");
      }
    });
  }, [className, classTransition]);

  return isEnabled ? React.cloneElement(children, { className: className }) : null;
}
