import { useCallback, useEffect, useRef, RefCallback } from 'react';
import { useRefToCallback } from 'use-callback-ref';

import { useDelayedState } from './use-delayed-state';

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

/**
 * a composite "Hover" state of an element, which sets it "hovered" if a focus is inside
 * @param options
 *
 */
export const useHoverState = (options: HoverOptions = {}): HoveredStateTuple => {
  const [hovered, setHovered] = useDelayedState(undefined, options.enterDelay || 0, options.leaveDelay || 0);
  const [focused, setFocused] = useDelayedState(undefined, options.enterDelay || 0, options.leaveDelay || 0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // check if targeted node is already focused

    const currentRef = ref.current;

    if (currentRef) {
      const { activeElement } = currentRef.ownerDocument;

      if (activeElement === currentRef || currentRef.contains(activeElement)) {
        setFocused(true);
      }
    }
  }, [setFocused]);

  return [
    !!(focused || hovered),
    {
      // expose callback based ref to aid TypeScript contravariance (HTMLElement < AnyOtherElement)
      ref: useRefToCallback(ref),
      // on click it should become "hovered". Aid for touch events
      onClick: useCallback(() => setHovered(true), [setHovered]),
      // mouse events
      onMouseEnter: useCallback(() => setHovered(true), [setHovered]),
      onMouseLeave: useCallback(() => setHovered(false), [setHovered]),
      // keyboard navigation
      onFocus: useCallback(() => setFocused(true), [setFocused]),
      onBlur: useCallback(() => {
        setFocused(false);
        setHovered(false);
      }, [setFocused, setHovered]),
    },
    {
      isFocused: focused,
      isHovered: hovered,
    },
  ];
};
