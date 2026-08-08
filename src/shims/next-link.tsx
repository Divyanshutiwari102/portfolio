import * as React from "react";

type Props = Omit<React.ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
};

/** Drop-in replacement for next/link — plain anchors work for this single-page site. */
const Link = React.forwardRef<HTMLAnchorElement, Props>(function Link(
  { href, prefetch: _p, replace: _r, scroll: _s, shallow: _sh, children, ...rest },
  ref,
) {
  return (
    <a ref={ref} href={href} {...rest}>
      {children}
    </a>
  );
});

export default Link;
