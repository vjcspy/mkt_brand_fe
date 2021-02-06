import React, { forwardRef } from "react";
import NextLink from "next/link";
import { getBrowserLink } from "../../services/frontend";
import { useRouter } from "next/router";

const LinkRouter = forwardRef(({ href, ...props }, ref) => {
  const {
    query: { site },
  } = useRouter();
  const hr = getBrowserLink(site, href);
  return <NextLink {...props} href={hr} ref={ref} />;
});

export default LinkRouter;
