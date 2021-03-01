import Axios from "axios";
import React, { useEffect, useState } from "react";

const useApi = (url, body, method = "GET") => {
  const [data, setData] = useState();
  useEffect(async () => {
    try {
      const { data } = await Axios({
        url,
        method,
        body,
      });
      setData(data);
    } catch (e) {
      console.error(e);
    }
  }, [url, body, method]);
  return data;
};

export default useApi;
