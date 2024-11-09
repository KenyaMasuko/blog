import { createRoute } from "honox/factory";
import { getPosts } from "../../lib/posts";
import { Fragment } from "hono/jsx/jsx-runtime";
import { BlogPost } from "../../components/blog";

export default createRoute(async (c) => {
	const posts = getPosts();
	return c.render(
		<div>
			{posts.map((p, i) => (
				<Fragment key={p.entryName}>
					<BlogPost entryName={p.entryName} frontmatter={p.frontmatter} />
				</Fragment>
			))}
		</div>,
		{ title: "ブログ一覧" },
	);
});
