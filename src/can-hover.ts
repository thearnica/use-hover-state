let isHoverSupported: boolean | undefined = undefined;

/**
 * @returns {true} if current device supports hover effects
 * @returns {false} if current device has no pointer device support (touch device)
 * @returns {false} if this check is not applicable (SSR)
 */
export const supportsHover = (): boolean | undefined => {
  if (typeof window == 'undefined') {
    return undefined;
  }

  isHoverSupported = isHoverSupported ?? !window.matchMedia('(hover: none)').matches;

  return isHoverSupported;
};
