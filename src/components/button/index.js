import React, { forwardRef } from "react";
import { ButtonLink, OutlineButton, PrimaryLink, PrimaryButton, ButtonBack, OutlineA } from "./style";
import IconTriangleLineLeft from "../icons/iconTriangleLineLeft";
import LinkRouter from "../link-router";

const Button = forwardRef(({ varian = "primary", children, ...rest }, ref) => {
  switch (varian) {
    case "outline":
      return (
        <OutlineButton {...rest} ref={ref}>
          {children}
        </OutlineButton>
      );
    case "primary-router": {
      let { href, ...rest2 } = rest;
      return (
        <LinkRouter href={href} ref={ref} passHref>
          <PrimaryLink {...rest2}>{children}</PrimaryLink>
        </LinkRouter>
      );
    }
    case "outline-a":
      return (
        <OutlineA {...rest} ref={ref}>
          {children}
        </OutlineA>
      );
    case "link":
      return (
        <ButtonLink {...rest} ref={ref}>
          {children}
        </ButtonLink>
      );
    case "back":
      return (
        <ButtonBack {...rest} ref={ref}>
          <IconTriangleLineLeft width="11" height="13" />
          {children}
        </ButtonBack>
      );
    default:
      return (
        <PrimaryButton {...rest} ref={ref}>
          {children}
        </PrimaryButton>
      );
  }
});

export default Button;
