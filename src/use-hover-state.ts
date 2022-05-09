import { useCallback, useEffect, useRef } from 'react';
import { useRefToCallback } from 'use-callback-ref';

import type { HoverOptions, HoveredStateTuple } from 'use-hover-state';

import { useDelayedState } from './use-delayed-state';

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
