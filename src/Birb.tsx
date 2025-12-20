import { useState, useEffect } from "react";

export default function Birb() {
  const frame1 = "∽('▿')~";
  const frame2 = "~('▿')∽";
  const [currentFrame, setCurrentFrame] = useState(frame1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev === frame1 ? frame2 : frame1));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return <pre>{currentFrame}</pre>;
}
