import Axios from "axios";
import React, { useCallback, useState } from "react";

const useApi = (url, body, headers, method = "GET") => {
  const [api, setApi] = useState({});

  const action = useCallback(
    async (newUrl) => {
      setApi({ loading: true });
      try {
        const { data } = await Axios(`${newUrl ?? url}`, {
          method,
          credentials: "omit",
          data: body,
          headers,
        });
        setApi({ data });
      } catch (e) {
        setApi({ error: e });
      }
    },
    [url, body, method]
  );

  return [api, action];
};

export default useApi;
