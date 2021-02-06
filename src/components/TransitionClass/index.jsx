import React, { Fragment, useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

const TransitionClass = ({ active, transition = 300, children }) => {
  const showDebounce = useDebounce(active, transition);

  return active ? <Fragment>{children}</Fragment> : null;
};

export default TransitionClass;
