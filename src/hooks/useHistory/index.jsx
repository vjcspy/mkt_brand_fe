import { cloneDeep } from "lodash";
import { useEffect, useMemo, useState } from "react";

if (process.browser) {
  let origin = window.onpopstate;
  window.onpopstate = function (event) {
    var e = new PopStateEvent("onPopState", event);
    window.dispatchEvent(e);
    origin?.apply(window, arguments);
  };
}

const useHistory = () => {
  const [state, setState] = useState();
  const history = useMemo(
    () => ({
      push: (state, title, url) => {
        window.history.pushState(state, title, url);
        setState(cloneDeep(state));
      },
    }),
    []
  );
  useEffect(() => {
    const listener = function (event) {
      setState(event.state);
    };
    window.addEventListener("onPopState", listener);
    return () => window.removeEventListener("onPopState", listener);
  }, []);

  return [state, history];
};

export default useHistory;
