const theme = () => {
	const setTheme = (isDark: boolean) => {
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	};

	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", (e) => setTheme(e.matches));

	const currentTheme = localStorage.getItem("theme");
	setTheme(currentTheme === "dark");
};

theme();
window.addEventListener("pageshow", theme);
