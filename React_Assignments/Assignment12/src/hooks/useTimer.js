
import { useEffect, useRef, useState } from "react";

export function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    ref.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(ref.current);
  }, []);

  const reset = () => setSeconds(0);

  return { seconds, reset };
}
