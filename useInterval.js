import { useEffect, useRef, useState, useCallback } from 'react';

const useInterval = (callback, timeout = 0, deps = []) => {
  const [start, setStart] = useState(false);
  const [refs] = useState([]);
  const [onBefore, bindOnBefore] = useState(null);
  const callbackRef = useRef();

  const run = useCallback(() => {
    setStart(true);
  }, []);

  const runBefore = useCallback(
    func => {
      bindOnBefore(func);
    },
    [callback, timeout, ...deps],
  );

  const clear = useCallback(
    clearCallback => {
      setStart(false);
      const len = refs.length;
      if (len) {
        for (let i = 0; i < len; i += 1) {
          clearInterval(refs[i]);
        }
        if (typeof clearCallback === `function`) {
          clearCallback();
        }
      }
    },
    [callback, timeout, ...deps],
  );

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback, ...deps]);

  useEffect(() => {
    if (start) {
      const tick = () => {
        callbackRef.current();
      };
      if (typeof onBefore === `function`) {
        onBefore();
      }
      const id = setInterval(tick, timeout);
      refs.push(id);
      return () => clearInterval(id);
    }
  }, [start, ...deps]);

  return {
    run,
    runBefore,
    clear,
  };
};

export default useInterval;
