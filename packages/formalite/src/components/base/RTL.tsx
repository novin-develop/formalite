import React, { useEffect } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { Direction } from "./model";

const myCache = createCache({
  key: "css-rtl",
  stylisPlugins: [rtlPlugin, prefixer],
});

type RTLProps = {
  direction: Direction;
  children: JSX.Element;
};

export const RTL = ({ direction, children }: RTLProps) => {
  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  if (direction === "rtl") {
    return <CacheProvider value={myCache}>{children}</CacheProvider>;
  }

  return children;
};
