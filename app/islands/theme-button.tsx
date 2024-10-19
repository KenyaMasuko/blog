export const ThemeButton = () => {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark") 
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={toggleTheme}
        className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        aria-label="ダークモード切り替え"
      >
        <DarkIcon />
        <LightIcon />
      </button>
    </div>
  );
}

const DarkIcon = () => <span className="hidden dark:block">🌞</span>
const LightIcon = () => <span className="block dark:hidden">🌙</span>