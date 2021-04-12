import { useRouter } from "next/router";
import { parse, stringifyUrl } from "query-string";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { DEVELOPMENT_MODE } from "../../constants";
import { getBrowserLink } from "../../services/frontend";

const useSiteRouter = () => {
  const mode = useSelector((s) => s.get("mode"));
  const router = useRouter();
  return useMemo(() => {
    return {
      ...router,
      push: (url, as, option) => {
        let edit = mode == DEVELOPMENT_MODE ? "edit" : null;
        var a = getBrowserLink(edit, url);
        return router.push(a, as, option);
      },
      pushQuery: (url, as, option) => {
        let edit = mode == DEVELOPMENT_MODE ? "edit" : null;
        let [, page, search] = url.match(/\/([a-z_][\w-]*|)(\?.*|)/);
        let query = process.browser ? parse(location.search) : router.query;
        query = Object.assign(query, parse(search));
        let newUrl = (() => {
          if (edit) {
            if (page && page != "edit") {
              query = Object.assign(query, { page });
            }
            return stringifyUrl({ url: "/edit", query: query });
          } else {
            return stringifyUrl({ url: `/${page ?? ""}`, query: query });
          }
        })();
        return router.push(newUrl, as, option);
      },
    };
  }, [router, mode]);
};

export default useSiteRouter;
