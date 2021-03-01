import { useRouter } from "next/router";
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
        let link = mode == DEVELOPMENT_MODE ? "edit" : null;
        return router.push(getBrowserLink(link, url), as, option);
      },
    };
  }, [router]);
};

export default useSiteRouter;
