let isHoverSupported: boolean | undefined = undefined;

export const supportsHover = (): boolean | undefined => {
  if (typeof window == 'undefined') {
    return undefined;
  }

  isHoverSupported = isHoverSupported ?? !window.matchMedia('(hover: none)').matches;

  return isHoverSupported;
};
