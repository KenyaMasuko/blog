import { useState } from "hono/jsx";
import { ThemeButton } from "./theme-button";

export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => setIsMenuOpen((prev) => !prev);

	return (
		<header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<a
					href="/"
					className="text-2xl font-bold text-gray-800 dark:text-white"
				>
					kenchandayo
				</a>
				<nav className="hidden md:flex space-x-4">
					<a
						href="/entry"
						className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
					>
						Blog
					</a>
					<a
						href="/"
						className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
					>
						About
					</a>
				</nav>
				<div className="flex items-center space-x-4">
					<ThemeButton />
					<button
						type="button"
						onClick={toggleMenu}
						className="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
						aria-label="メニュー"
					>
						☰
					</button>

					{/* <input
        type="search"
        placeholder="検索..."
        className="w-full md:w-[200px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white hidden md:inline-flex"
      /> */}
				</div>
			</div>
			{isMenuOpen && (
				<div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
					<nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
						<a
							href="/entry"
							className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
						>
							Blog
						</a>
						<a
							href="/"
							className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
						>
							About
						</a>
						{/* <input
          type="search"
          placeholder="検索..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        /> */}
					</nav>
				</div>
			)}
		</header>
	);
};
