import { useEffect, useRef } from 'react';

export function useDebounceCallback(fn, delay) {
  const t = useRef(null);
  useEffect(() => {
    clearTimeout(t.current);
  }, []);
  return (...args) => {
    clearTimeout(t.current);
    t.current = setTimeout(() => fn(...args, delay));
  };
}
