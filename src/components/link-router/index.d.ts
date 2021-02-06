/// <reference types="node" />
import { LinkProps } from "next/link";
import React from "react";
declare function LinkRouter(
  props: React.PropsWithChildren<LinkProps>
): React.DetailedReactHTMLElement<
  {
    onMouseEnter?: ((event: React.MouseEvent<Element, MouseEvent>) => void) | undefined;
    onClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
    href?: string | undefined;
    ref?: any;
  },
  HTMLElement
>;
export default LinkRouter;
