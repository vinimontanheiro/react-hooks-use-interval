
## React Hooks interval alternative to start inside another hook and avoid browser memory leak 

## Dependencies:

- [React Hooks](https://pt-br.reactjs.org/docs/hooks-intro.html)

### How to use
```
import React, { useState, useCallback } from 'react';
import useInterval from './useInterval';

const styles = {
  padding: `10px`,
};

const YourComponent = () => {
  const [counter, setCounter] = useState(null);

  const increment = useCallback(
    () => {
      setCounter(counter + 1);
    },
    [counter],
  );

  const interval = useInterval(() => {
    increment();
  }, 2000, [counter]);

  useEffect(() => {
    interval.runBefore(() => { // Running something before interval beginning
      setCounter(0);
    });
    interval.run(); 
  }, []);

  return (
    <div style={{ ...styles }}>{counter}</div>
  );
};

export default YourComponent;
```
