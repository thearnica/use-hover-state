import type { RefCallback } from 'react';

/**
 * a composite "Hover" state of an element, which sets it "hovered" if a focus is inside
 */
export const useHoverState: (options?: HoverOptions) => HoveredStateTuple;

/**
 * @returns {true} if current device supports hover effects
 * @returns {false} if current device has no pointer device support (touch device)
 * @returns {undefined} if this check is not applicable (SSR)
 */
export const supportsHover: () => boolean | undefined;

type Callback = () => void;

export type HoverState = {
  /**
   * ref is required for SSR/LazyHydration only
   */
  ref: RefCallback<HTMLElement>; // expose callback based ref to aid TypeScript contravariance (HTMLElement < AnyOtherElement)

  onClick: Callback;
  onMouseEnter: Callback;
  onMouseLeave: Callback;
  onFocus: Callback;
  onBlur: Callback;
};

export type HoverOptions = {
  enterDelay?: number;
  leaveDelay?: number;
};

type RealHoverState = {
  /**
   * the "real" focus state of an element
   */
  isFocused: boolean | undefined;
  /**
   * the "real" hover state of an element
   */
  isHovered: boolean | undefined;
};

export type HoveredStateTuple = [
  /**
   * indicates the current hovered state
   */
  isHovered: boolean,
  /**
   * please spread this object onto an element
   */
  spreadState: HoverState,
  /**
   * if you are interested in the real state of an element, not combined one
   */
  realState: RealHoverState
];
