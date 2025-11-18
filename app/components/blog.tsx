import type { FC } from "hono/jsx";
import { convertDateToJaYYMMDD } from "../lib/date";
import type { getPosts } from "../lib/posts";
import { TagBadge } from "./tag-badge";

type Props = Omit<ReturnType<typeof getPosts>[0], "Component">;

export const BlogPost: FC<Props> = (props) => {
	return (
		<article className="hover:opacity-65 transition-opacity bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md mb-8 overflow-hidden grid grid-cols-5">
			<a href={`/entry/${props.entryName}`}>
				<div className="h-full bg-gray-100 dark:bg-gray-600 col-span-1 grid place-content-center">
					<img
						src={
							props.frontmatter.iconUrl ??
							"https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Smiling%20face/Flat/smiling_face_flat.svg"
						}
						className="object-cover"
						width={60}
						height={60}
						alt=""
					/>
				</div>
			</a>
			<div className="p-6 col-span-4">
				<a href={`/entry/${props.entryName}`}>
					<div className="flex items-center mb-4">
						<div>
							<h2 className="text-xl sm:text-2xl font-bold mb-1 text-gray-800 dark:text-white">
								{props.frontmatter.title}
							</h2>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								{convertDateToJaYYMMDD(props.frontmatter.date)}
							</p>
						</div>
					</div>
					<div className="prose dark:prose-invert max-w-none">
						<p className="mb-4">{props.frontmatter.description}</p>
					</div>
				</a>
				<div>
					{props.frontmatter.tags &&
						props.frontmatter.tags.length > 0 &&
						props.frontmatter.tags.map((tag) => (
							<TagBadge key={tag} tag={tag} />
						))}
				</div>
			</div>
		</article>
	);
};
