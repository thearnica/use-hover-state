import { fireEvent, act, render, screen } from '@testing-library/react';
import React, { ButtonHTMLAttributes, MutableRefObject } from 'react';

import type { HoverOptions, HoveredStateTuple } from 'use-hover-state';

import { useHoverState } from '../src';

describe('useHoverState', () => {
  const testHook = (
    options: HoverOptions = {},
    buttonProps: ButtonHTMLAttributes<HTMLButtonElement> = {}
  ): MutableRefObject<HoveredStateTuple> => {
    const ref: MutableRefObject<HoveredStateTuple | undefined> = {
      current: undefined,
    };

    const App = () => {
      const hover = useHoverState(options);
      ref.current = hover;

      return <button {...hover[1]} {...buttonProps} />;
    };

    render(<App />);

    return ref as any;
  };

  const getElement = () => screen.getByRole('button');

  const perform = (cb: () => any) => () =>
    act(() => {
      cb();
    });

  const mouseEnter = perform(() => fireEvent.mouseEnter(getElement()));
  const mouseLeave = perform(() => fireEvent.mouseLeave(getElement()));
  const focusIn = perform(() => fireEvent.focusIn(getElement()));
  const focusOut = perform(() => fireEvent.focusOut(getElement()));

  const travelTime = perform(() => jest.runAllTimers());

  it('should respond to enters and leaves', () => {
    const result = testHook();

    expect(result.current[0]).toBe(false);

    mouseEnter();
    expect(result.current[0]).toBe(true);
    expect(result.current[2]).toEqual({ isFocused: undefined, isHovered: true });

    mouseLeave();
    expect(result.current[0]).toBe(false);
  });

  describe('focus', () => {
    it('handles focus', () => {
      const result = testHook();

      expect(result.current[0]).toBe(false);

      focusIn();
      expect(result.current[0]).toBe(true);
      expect(result.current[2]).toEqual({ isFocused: true, isHovered: undefined });

      focusOut();
      expect(result.current[0]).toBe(false);
    });

    it('handles autofocus', () => {
      const result = testHook({}, { autoFocus: true });

      expect(result.current[0]).toBe(true);
    });
  });

  describe('delays', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('responds to enter delay', () => {
      const result = testHook({ enterDelay: 100 });
      expect(result.current[0]).toBe(false);

      mouseEnter();
      expect(result.current[0]).toBe(false);

      travelTime();
      expect(result.current[0]).toBe(true);

      mouseLeave();
      expect(result.current[0]).toBe(false);
    });

    it('responds to leave delay', () => {
      const result = testHook({ leaveDelay: 100 });
      expect(result.current[0]).toBe(false);

      mouseEnter();
      expect(result.current[0]).toBe(true);

      mouseLeave();
      expect(result.current[0]).toBe(true);

      travelTime();
      expect(result.current[0]).toBe(false);
    });
  });
});
