import type { JSX } from "hono/jsx/jsx-runtime";
import type { MDXProps } from "mdx/types";
import type { Frontmatter } from "../types";
import { getEntryNameFromPath } from "../utils";

type MDX = {
	frontmatter: Frontmatter;
	default: (props: MDXProps) => JSX.Element;
};

const posts = import.meta.glob<MDX>("../articles/**/*.mdx", {
	eager: true,
});

const sortByDateDesc = ():
	| ((
			a: [string, { frontmatter: Frontmatter }],
			b: [string, { frontmatter: Frontmatter }],
	  ) => number)
	| undefined => {
	return ([_aid, aPost], [_bid, bPost]) => {
		const aDate = new Date(aPost.frontmatter.date);
		const bDate = new Date(bPost.frontmatter.date);
		return aDate.getTime() < bDate.getTime() ? 1 : -1;
	};
};

export const getPosts = () => {
	const postsData = Object.entries(posts)
		.filter(([_, post]) =>
			import.meta.env.PROD ? post.frontmatter.published : true,
		)
		.sort(sortByDateDesc())
		.map(([path, post]) => {
			const entryName = getEntryNameFromPath(path);
			const { frontmatter } = post;
			const { default: Component } = post;
			return { entryName, frontmatter, Component };
		});
	return postsData;
};

export const getPostByEntryName = (entryName: string) => {
	const posts = getPosts();
	const post = posts.find((post) => post.entryName === entryName);
	return post;
};

export const getLatestPostsWithoutTargetPost = (postEntryName: string) => {
	const posts = getPosts();
	const latestPosts = posts.filter((post) => post.entryName !== postEntryName);
	return latestPosts.slice(0, 3);
};

export const getPostsByTag = (tag: string) => {
	const posts = getPosts();
	return posts.filter((post) =>
		post.frontmatter.tags?.includes(tag)
	);
};

export const getAllTags = () => {
	const tagSet = new Set<string>();
	for (const post of getPosts()) {
		for (const tag of post.frontmatter.tags ?? []) {
			tagSet.add(tag);
		}
	}
	return Array.from(tagSet).sort();
};
