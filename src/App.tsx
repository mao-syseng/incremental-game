import { useState } from "react";
import Button, { AboutButton } from "./Button";
import Birb from "./Birb";
import Title from "./Title";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <AboutButton />
      <Title />
      <Button label={`Count is ${count}`} onClick={() => setCount(count + 1)} />
      <Birb />
    </main>
  );
}

export default App;
