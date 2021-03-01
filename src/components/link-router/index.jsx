import React, { forwardRef, Children } from "react";
import NextLink from "next/link";
import { getBrowserLink } from "../../services/frontend";
import { useSelector } from "react-redux";
import { DEVELOPMENT_MODE } from "../../constants";
import { first } from "lodash";

const LinkRouter = forwardRef(({ href, children, passHref, ...props }, ref) => {
  const mode = useSelector((s) => s.get("mode"));

  if (first(href) === "/") {
    return (
      <NextLink
        {...props}
        passHref={passHref}
        children={children}
        href={getBrowserLink(mode == DEVELOPMENT_MODE ? "edit" : null, href)}
        ref={ref}
      />
    );
  }
  let child = React.Children.only(children);
  if (child.type === "a") {
    return React.cloneElement(child, { ...props, href, ref, target: "_blank" });
  }
  return <a {...props} children={children} href={href} target="_blank" ref={ref} />;
});

export default LinkRouter;
