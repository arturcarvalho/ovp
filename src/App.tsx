import { useState, useMemo } from "react";
import { useInterval } from "usehooks-ts";
import "./App.css";

function App() {
  const [charge, setCharge] = useState<number>(1000);

  function updateRemainingCharge() {
    setCharge((prev) => {
      if (prev <= 1) return 1;
      return prev - 1;
    });
  }

  useInterval(updateRemainingCharge, 5);

  const memoCharge = useMemo(() => {
    return charge;
  }, [charge]);

  return (
    <div>
      <h1>{memoCharge}</h1>
    </div>
  );
}

export default App;
