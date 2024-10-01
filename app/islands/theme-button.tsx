import { useState } from "hono/jsx";

export const ThemeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    console.log(document.documentElement.classList);
  };
  return (
    <div>
      <button
        type="button"
        onClick={toggleDarkMode}
        className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        aria-label="ダークモード切り替え"
      >
        {isDarkMode ? "🌞" : "🌙"}
      </button>
    </div>
  );
}
