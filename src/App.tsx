import { useState } from "react";
import { useInterval } from "usehooks-ts";
import "./App.css";

function maybeTrue(odds: number) {
  return Math.random() < odds;
}

function App() {  
  const [charge, setCharge] = useState<number>(0);

  function updateRemainingCharge() {
    setCharge((prev) => {
      const sameValue = maybeTrue(0.99);
      return sameValue ? prev : prev + 1;
    });
  }

  // The fast interval is ok, the browsers will throttle it if too low.
  useInterval(updateRemainingCharge, 5);

  // todo: replace <br>
  return (
    <div>
      <h1>{charge}</h1>
      <p>
Issue: if the next value set is the same as the previous, the memory usage will increase.
<br /><br />
- To debug: open devtools - performance - record - take a snapshot - record again - take another snapshot
<br /><br />

 - Sandboxes like codesandbox or stackblitz seem to hide the memory leak <br />
 - useMemo doesn't fix it<br />
 - Same issue if used on private window (firefox or chrome)<br />
 - Tested on mac m1 and m2<br />
 - useMemo doesn't fix it<br />
 - the issue is not because the charge is 0 and being considered null<br />
 - Collecting garbage doesn't fix it (little broom icon on devtools)<br />
 - The issue happens if you use the `useHook-ts` or `useInterval` from the Dan Abramovs or Josh Comeaus blog<br />
      </p>
    </div>
  );
}

export default App;
