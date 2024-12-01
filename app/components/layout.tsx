import { Fragment, useState } from "hono/jsx";
import type { Child, FC } from "hono/jsx";
import { CATEGORY } from "../constants/category";
import { getPosts } from "../lib/posts";
import { ThemeButton } from "../islands/theme-button";
import { Badge } from "./badge";
import { Header } from "../islands/header";

type Props = {
	children: Child;
};

export const Layout: FC<Props> = ({ children }) => {
	const posts = getPosts();

	return (
		<div className={"min-h-screen flex flex-col"}>
			<Header />
			<main className="flex-grow container mx-auto px-4 py-8 flex flex-col lg:flex-row">
				<div className="w-full lg:w-3/4 lg:pr-8">{children}</div>
				<aside className="w-full lg:w-1/4 mt-8 lg:mt-0">
					<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sticky top-20">
						<h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
							最近の投稿
						</h2>
						<ul className="space-y-2">
							{posts.slice(0, 3).map((p) => (
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
					{/* <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-4 sticky top-64">
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
					</div> */}
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
