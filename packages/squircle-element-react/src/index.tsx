"use client";

import { getSvgPath } from "figma-squircle";
import { useMemo } from "react";

import { useElementSize } from "./use-element-size";
export { SquircleNoScript } from "./no-js";

interface SquircleProps<E extends React.ElementType> {
  cornerSmoothing?: number;
  cornerRadius?: number;
  as?: E;
  children?: React.ReactNode;
}

function Squircle<E extends React.ElementType = "div">({
  cornerRadius,
  cornerSmoothing = 0.6,
  as,
  style,
  ...props
}: SquircleProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof SquircleProps<E>>) {
  const Component = as || "div";

  // Note: If you need to pass ref, wrap this component in another, and style to full-width/height.
  const [ref, { width, height }] = useElementSize<HTMLDivElement>();

  const path = useMemo(() => {
    return getSvgPath({
      width,
      height,
      cornerRadius,
      cornerSmoothing,
    });
  }, [width, height, cornerRadius, cornerSmoothing]);

  return (
    <Component
      {...props}
      ref={ref}
      style={{
        ...style,
        borderRadius: cornerRadius,
        clipPath: `path('${path}')`,
      }}
      data-squircle={cornerRadius}
    />
  );
}

export { Squircle, type SquircleProps };
