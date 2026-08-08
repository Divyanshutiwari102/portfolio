import * as React from "react";

type Props = Omit<React.ComponentPropsWithoutRef<"img">, "src"> & {
  src: string | { src: string };
  quality?: number;
  priority?: boolean;
  fill?: boolean;
  unoptimized?: boolean;
  placeholder?: string;
  blurDataURL?: string;
};

/** Drop-in replacement for next/image — renders a plain lazy <img>. */
export default function Image({
  src,
  quality: _q,
  priority,
  fill,
  unoptimized: _u,
  placeholder: _p,
  blurDataURL: _b,
  style,
  alt = "",
  ...rest
}: Props) {
  const url = typeof src === "string" ? src : src.src;
  return (
    <img
      src={url}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={
        fill
          ? {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              ...style,
            }
          : style
      }
      {...rest}
    />
  );
}
