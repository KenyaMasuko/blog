import { createRoute } from "honox/factory";
import { getPosts, getPostsByTag } from "../../lib/posts";
import { Fragment } from "hono/jsx/jsx-runtime";
import { BlogPost } from "../../components/blog";

export default createRoute(async (c) => {
	const tagParam = c.req.query('tag');
	const posts = tagParam ? getPostsByTag(tagParam) : getPosts();

	return c.render(
		<div>
			{tagParam && (
				<div className="mb-6">
					<h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
						タグ「{tagParam}」の記事一覧
					</h2>
					<a href="/entry" className="text-blue-600 dark:text-blue-400 hover:underline">
						すべての記事を表示
					</a>
				</div>
			)}
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
		{ title: tagParam ? `タグ「${tagParam}」の記事一覧` : "ブログ一覧" },
	);
});
