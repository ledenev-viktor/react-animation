import React, { useMemo, useRef, ReactNode, FC, CSSProperties } from "react";
import { Transition } from "react-transition-group";

const getElementSize = (element: HTMLElement, type: "width" | "height") => {
  return element[type === "width" ? "scrollWidth" : "scrollHeight"];
};

export type SizeAnimationProps = {
  in?: boolean;
  type?: "width" | "height";
  duration?: number;
  children?: ReactNode | string;
  entered?: CSSProperties;
};

const SizeAnimation: FC<SizeAnimationProps> = ({
  in: visible,
  type,
  duration = 300,
  children,
  entered = {},
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const defaultStyles = useMemo(
    () => ({
      overflow: "hidden",
      transition: `${type} ${duration}ms linear`,
    }),
    [type, duration]
  );

  const handleEntering = () => {
    if (!rootRef.current || !contentRef.current || !type) return;

    rootRef.current.style[type] = `0`;

    requestAnimationFrame(() => {
      if (!rootRef.current || !contentRef.current || !type) return;
      const size = getElementSize(rootRef.current, type);

      rootRef.current.style[type] = `${size}px`;
    });
  };

  const handleEntered = () => {
    if (!rootRef.current || !entered) return;

    Object.entries(entered).forEach(
      ([key, value]: string[] & number[]): void => {
        if (!rootRef.current || !entered) return;
        rootRef.current.style[key] = value;
      }
    );
  };

  const handleExiting = () => {
    if (!rootRef.current || !contentRef.current || !type) return;

    const size = getElementSize(rootRef.current, type);
    rootRef.current.style[type] = `${size}px`;

    requestAnimationFrame(() => {
      if (!rootRef.current || !contentRef.current || !type) return;
      rootRef.current.style[type] = `0`;
    });
  };

  return (
    <>
      <Transition
        in={visible}
        nodeRef={rootRef}
        timeout={duration}
        onExiting={handleExiting}
        onEntering={handleEntering}
        onEntered={handleEntered}
        unmountOnExit
      >
        <div style={defaultStyles} ref={rootRef}>
          <div ref={contentRef}>{children}</div>
        </div>
      </Transition>
    </>
  );
};

export type SlideAnimatinonProps = SizeAnimationProps;

export const SlideLeftAnimation: FC<SlideAnimatinonProps> = (props) => {
  return <SizeAnimation type="width" {...props} />;
};

export const SlideRightAnimation: FC<SlideAnimatinonProps> = ({
  in: visible,
  ...props
}) => {
  return <SizeAnimation type="width" in={!visible} {...props} />;
};

export const SlideUpAnimation: FC<SlideAnimatinonProps> = (props) => {
  return <SizeAnimation type="height" {...props} />;
};

export const SlideDownAnimation: FC<SlideAnimatinonProps> = ({
  in: visible,
  ...props
}) => {
  return <SizeAnimation type="height" in={!visible} {...props} />;
};
