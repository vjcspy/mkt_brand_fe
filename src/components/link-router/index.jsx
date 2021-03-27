import React, { forwardRef, Children } from "react";
import NextLink from "next/link";
import Router, { useRouter } from "next/router";
import { getBrowserLink } from "../../services/frontend";
import { useSelector } from "react-redux";
import { DEVELOPMENT_MODE } from "../../constants";
import { first } from "lodash";
import { parse, stringifyUrl } from "query-string";

const LinkRouter = forwardRef(({ href, children, passHref, ...props }, ref) => {
  const mode = useSelector((s) => s.get("mode"));
  const router = useRouter();

  const provinceSelected = useSelector((s) => s.get("provinceSelected"));
  if (first(href) === "/") {
    let edit = mode == DEVELOPMENT_MODE ? "edit" : null;
    let newHref = href;
    let query = process.browser ? parse(location.search) : router.query;
    let [, page, search] = href.match(/\/([a-z_][\w-]*|)(\?.*|)/);
    query = Object.assign(query, parse(search));
    if (edit) {
      if (page) {
        query = Object.assign(query, { page });
      }
      newHref = stringifyUrl({ url: "/edit", query: query });
    } else {
      newHref = stringifyUrl({ url: `/${page ?? ""}`, query: query });
    }

    return <NextLink {...props} passHref={passHref} children={children} href={newHref} ref={ref} shallow />;
  }
  if (first(href) === "/promo") {
  }
  let child = React.Children.only(children);
  if (child.type === "a") {
    return React.cloneElement(child, { ...props, href, ref, target: "_blank" });
  }
  return <a {...props} children={children} href={href} target="_blank" ref={ref} />;
});

export default LinkRouter;
