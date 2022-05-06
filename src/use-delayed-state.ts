import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

export type TriState = undefined | true | false;

export const useDelayedState = (
  initialState: TriState,
  delayIn: number,
  delayOut: number
): [TriState, Dispatch<SetStateAction<TriState>>] => {
  const [state, setState] = useState(initialState);
  const [mirror, setMirror] = useState(state);

  useEffect(() => {
    const timeout = mirror ? delayIn : delayOut;
    const tm = timeout && setTimeout(setState, timeout, mirror);

    if (!tm) {
      setState(mirror);
    }

    return () => {
      tm ? clearTimeout(tm) : null;
    };
  }, [delayIn, delayOut, mirror]);

  return [state, setMirror];
};
