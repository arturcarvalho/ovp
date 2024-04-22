import { useState } from "react";
import { useInterval } from "usehooks-ts";
import "./App.css";

function App() {
  const [charge, setCharge] = useState<number>(1000);

  function updateRemainingCharge() {
    setCharge((prev) => {
      if (prev <= 0) return 0;
      return prev - 1;
    });
  }

  useInterval(updateRemainingCharge, 5);

  return (
    <div>
      <h1>{charge}</h1>
    </div>
  );
}

export default App;
