import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import { TagBadge } from "../../components/tag-badge";
import { convertDateToJaYYMMDD } from "../../lib/date";
import { getPostByEntryName, getPosts } from "../../lib/posts";

export default createRoute(
	ssgParams(() => {
		const posts = getPosts();
		return posts.map((p) => ({
			slug: p.entryName,
		}));
	}),
	async (c) => {
		const slug = c.req.param("slug");
		if (!slug) {
			return c.render(
				<div>Oops! The page you are looking for does not exist ;(</div>,
			);
		}

		const post = getPostByEntryName(slug);
		if (!post) {
			return c.render(
				<div>Oops! The page you are looking for does not exist ;(</div>,
			);
		}
		const title = post?.frontmatter.title;
		const date = post?.frontmatter.date;
		const iconUrl =
			post?.frontmatter.iconUrl ??
			"https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Smiling%20face/Flat/smiling_face_flat.svg";

		return c.render(
			<div>
				<div>
					<div className="flex justify-center mb-4">
						<img src={iconUrl} alt="" height={100} width={100} />
					</div>
					{title && (
						<h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
							{title}
						</h1>
					)}
					{date && (
						<p className="text-sm text-gray-600 dark:text-gray-400">
							{convertDateToJaYYMMDD(date)}
						</p>
					)}
					{post?.frontmatter.tags && post.frontmatter.tags.length > 0 && (
						<div className="mt-4">
							{post.frontmatter.tags.map((tag) => (
								<TagBadge tag={tag} />
							))}
						</div>
					)}
				</div>
				<article className="prose dark:prose-invert max-w-none mt-6 markdown">
					{post?.Component({})}
				</article>
			</div>,
			{ title, entryName: slug, frontmatter: post?.frontmatter },
		);
	},
);
