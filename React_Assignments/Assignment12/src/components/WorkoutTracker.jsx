
import { useState } from "react";
import { useTimer } from "../hooks/useTimer";

export default function WorkoutTracker() {
  const [sets, setSets] = useState(0);
  const { seconds, reset } = useTimer();

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="font-bold">Workout Tracker</h2>
      <p>Sets: {sets}</p>
      <p>Rest Time: {seconds}s</p>
      <button
        className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => {
          setSets((s) => s + 1);
          reset();
        }}
      >
        Complete Set
      </button>
    </div>
  );
}
