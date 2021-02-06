import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { getBrowserLink } from "../../services/frontend";

const useSiteRouter = () => {
  const router = useRouter();
  return useMemo(() => {
    return {
      ...router,
      push: (url, as, option) => {
        return router.push(getBrowserLink(router.query.site, url), as, option);
      },
    };
  }, [router]);
};

export default useSiteRouter;
