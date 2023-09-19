import React, { CSSProperties, FC, ReactNode } from "react";
import {
  SlideUpAnimation,
  SlideDownAnimation,
  SlideLeftAnimation,
  SlideRightAnimation,
} from "./animations/sizeAnimation";
import { SlideAnimatinonProps } from "./animations/sizeAnimation";

export type TYPE_ANIMATIONS = Record<
  "slideUp" | "slideDown" | "slideLeft" | "slideRight",
  FC<SlideAnimatinonProps>
>;

const ANIMATIONS: TYPE_ANIMATIONS = {
  slideUp: SlideUpAnimation,
  slideDown: SlideDownAnimation,
  slideLeft: SlideLeftAnimation,
  slideRight: SlideRightAnimation,
};

export type AnimationProps = {
  /**
   * Тип анимации
   */
  type: "slideUp" | "slideDown" | "slideLeft" | "slideRight";

  /**
   * Переключатель анимации entering/exiting
   */
  running: boolean;

  /**
   * Продолжительность анимации
   */
  duration?: number;

  /**
   * Дочерние элементы.
   */
  children: ReactNode;

  /**
   * Объект со стилями, которые приминяются в конце анимации
   */
  entered: CSSProperties;
};

export const Animation: FC<AnimationProps> = ({
  type,
  running,
  children,
  entered,
  ...animationProps
}) => {
  const Component = ANIMATIONS[type];

  return (
    <Component in={running} entered={entered} {...animationProps}>
      {children}
    </Component>
  );
};
