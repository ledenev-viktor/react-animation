import React, { useMemo, useRef, ReactNode, FC } from 'react';
import { Transition } from 'react-transition-group';

const getElementSize = (element: HTMLElement, type: 'width' | 'height') =>
  element[type === 'width' ? 'scrollWidth' : 'scrollHeight'];

export type SizeAnimationProps = {
  in?: boolean;
  type?: 'width' | 'height';
  duration?: number;
  children?: ReactNode | string;
};

const SizeAnimation: FC<SizeAnimationProps> = ({
  in: visible,
  type,
  duration = 300,
  children,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const defaultStyles = useMemo(
    () => ({
      overflow: 'hidden',
      transition: `${type} ${duration}ms linear`,
    }),
    [type, duration],
  );

  const handleEntering = () => {
    if (rootRef.current && type) {
      rootRef.current.style[type] = `0`;
    }
    requestAnimationFrame(() => {
      if (rootRef.current && contentRef.current && type) {
        const size = getElementSize(contentRef.current, type);

        rootRef.current.style[type] = `${size}px`;
      }
    });
  };

  const handleExiting = () => {
    if (!rootRef.current || !contentRef.current) return;
    if (rootRef.current && type) {
      const size = getElementSize(contentRef.current, type);

      rootRef.current.style[type] = `${size}px`;
    }
    requestAnimationFrame(() => {
      if (rootRef.current && type) {
        rootRef.current.style[type] = `0`;
      }
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
        unmountOnExit>
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

export const SlideRightAnimation: FC<SlideAnimatinonProps> = ({ in: visible, ...props }) => {
  return <SizeAnimation type="width" in={!visible} {...props} />;
};

export const SlideUpAnimation: FC<SlideAnimatinonProps> = (props) => {
  return <SizeAnimation type="height" {...props} />;
};

export const SlideDownAnimation: FC<SlideAnimatinonProps> = ({ in: visible, ...props }) => {
  return <SizeAnimation type="height" in={!visible} {...props} />;
};
