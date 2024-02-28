import { useState } from "react";
import styles from "./App.module.css";

const initialState = () => Array(6).fill({ id: Math.random(), state: "" });

export default function App() {
  const [slices, setSlices] = useState(initialState);

  const handleSliceClick = (index: number) => {
    const updatedSlices = slices.map((slice, i) =>
      i === index ? { ...slice, state: "removing" } : slice
    );
    setSlices(updatedSlices);

    setTimeout(() => {
      setSlices((current) => current.filter((_, i) => i !== index));
      addSlice();
    }, 500);
  };

  const addSlice = () => {
    const newSlice = { id: Math.random(), state: "adding" };
    setSlices((currentSlices) => [...currentSlices, newSlice]);

    setTimeout(() => {
      setSlices((currentSlices) =>
        currentSlices.map((slice) =>
          slice.state === "adding" ? { ...slice, state: "" } : slice
        )
      );
    }, 500);
  };

  return (
    <div className={styles.roll}>
      {slices.map((slice, index) => (
        <div
          key={index}
          className={`${styles.slice} ${styles[slice.state]}`}
          onClick={() => handleSliceClick(index)}
        />
      ))}
    </div>
  );
}
