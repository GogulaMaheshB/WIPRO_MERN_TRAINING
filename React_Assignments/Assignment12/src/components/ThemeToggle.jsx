
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-black text-white rounded"
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
