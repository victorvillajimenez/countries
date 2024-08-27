import { useState, useCallback } from "react";

export function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function useDebouncedState(initialValue, wait) {
  const [state, setState] = useState(initialValue);
  const debouncedSetState = useCallback(debounce(setState, wait), [wait]);
  return [state, debouncedSetState];
}
/*
 TYPESCRIPT
export function useDebouncedState<S>(
  initialValue: S,
  wait: number,
  debounceSettings?: Parameters<typeof debounce>[2]
): [S, Dispatch<S>] {
  const [state, setState] = useState <S> (initialValue);
  const debouncedSetState = useCallback(
    debounce(setState, wait, debounceSettings),
    [wait, debounceSettings]
  );
}
*/

export function sortByCommonName(a, b) {
  if (a.name.common < b.name.common) return -1;
  if (a.name.common > b.name.common) return 1;
  return 0;
}

export function sortBy(a, b, ...args) {
  if (a[args[0]] < b[args[0]]) return -1;
  if (a[args[0]] > b[args[0]]) return 1;
  if (args.length > 1) return sortBy(a, b, args.slice(1));
  return 0;
}

export function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

export const numberIntlDefault = new Intl.NumberFormat();
