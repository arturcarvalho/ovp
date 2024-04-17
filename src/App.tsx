import { useEffect, useRef, useState } from 'react';
import './App.css';

type IntervalFunction = () => unknown | void;

/** If delay is null, do not execute */
export function useInterval(callback: IntervalFunction, delay: number | null) {
  const savedCallback = useRef<IntervalFunction | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    if (delay === null) return;
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    if (delay === null) return;
    function tick() {
      if (savedCallback.current !== null) {
        savedCallback.current();
      }
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

function App() {
  const [charge, setCharge] = useState<number>(24);
  const [direction, setDirection] = useState<'up' | 'down' | 'static'>('up');

  function updateRemainingCharge() {
    setCharge((prev) => {
      if (direction === 'up') return prev + 1;
      if (direction === 'down') return prev + 1;

      return prev;
    });
  }

  useInterval(updateRemainingCharge, 5);

  const up = () => setDirection('up');
  const down = () => setDirection('down');
  const stat = () => setDirection('static');

  return (
    <div>
      <h1>{charge}</h1>
      <button onClick={up}>up</button>
      <button onClick={down}>down</button>
      <button onClick={stat}>static</button>
    </div>
  );
}

export default App;
