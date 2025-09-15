import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import { Fragment } from "hono/jsx/jsx-runtime";
import { BlogPost } from "../../../components/blog";
import { getAllTags, getPostsByTag } from "../../../lib/posts";

export default createRoute(
	ssgParams(() => {
		const tags = getAllTags();
		return tags.map((tag) => ({ tag }));
	}),
	async (c) => {
		const tag = c.req.param("tag");
		const posts = tag ? getPostsByTag(tag) : [];

		return c.render(
			<div>
				<div className="mb-6">
					<h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
						タグ「{tag}」の記事一覧
					</h2>
					<a href="/entry" className="text-blue-600 dark:text-blue-400 hover:underline">
						すべての記事を表示
					</a>
				</div>
				{posts.length === 0 ? (
					<p className="text-gray-600 dark:text-gray-400">該当する記事が見つかりませんでした。</p>
				) : (
					posts.map((p) => (
						<Fragment key={p.entryName}>
							<BlogPost entryName={p.entryName} frontmatter={p.frontmatter} />
						</Fragment>
					))
				)}
			</div>,
			{ title: tag ? `タグ「${tag}」の記事一覧` : "タグの記事一覧" },
		);
	}
);
