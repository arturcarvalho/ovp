import { useState } from "react";
import { useInterval } from "usehooks-ts";
import "./App.css";

/**
 * - Sandboxes like codesandbox or stackblitz hide the memory leak
 * - Same issue if used on private window (firefox or chrome)
 * - Tested on mac m1 and m2
 * - useMemo doesn't fix it
 * - the issue is not because the charge is 0 and being considered null
 *
 */

function App() {
  const [charge, setCharge] = useState<number>(500);

  function updateRemainingCharge() {
    setCharge((prev) => {
      if (prev <= 0) return 0;
      return prev - 1;
    });
  }

  // The fast interval is ok, the browsers will throttle it if too low.
  useInterval(updateRemainingCharge, charge === 0 ? null : 5);

  return (
    <div>
      <h1>{charge}</h1>
    </div>
  );
}

export default App;
