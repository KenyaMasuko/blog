import { Fragment, useState } from "hono/jsx";
import type { Child, FC } from "hono/jsx";
import { CATEGORY } from "../constants/category";
import { getPosts } from "../lib/posts";
import { ThemeButton } from "../islands/theme-button";
import { Badge } from "./badge";


type Props = {
  children: Child;
};

export const Layout: FC<Props> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const posts = getPosts();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={"min-h-screen flex flex-col"}>
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

            {/* <input
              type="search"
              placeholder="検索..."
              className="w-full md:w-[200px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white hidden md:inline-flex"
            /> */}
            <button
              type="button"
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              aria-label="メニュー"
            >
              ☰
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a
                href="/"
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
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 lg:pr-8">{children}</div>
        <aside className="w-full lg:w-1/4 mt-8 lg:mt-0">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sticky top-20">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              最近の投稿
            </h2>
            <ul className="space-y-2">
              {posts.map((p) => (
                <li key={p.entryName}>
                  <a
                    href={`/entry/${p.entryName}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {p.frontmatter.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-4 sticky top-64">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              カテゴリー
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.values(CATEGORY).map((c) => (
                <Fragment key={c}>
                  <Badge content={c} />
                </Fragment>
              ))}
            </div>
          </div>
        </aside>
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
          © 2024 KenyaMasuko All rights reserved.
        </div>
      </footer>
    </div>
  );
};
