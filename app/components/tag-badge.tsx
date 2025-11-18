import type { JSX } from "hono/jsx/jsx-runtime";

type Props = {
	tag: string;
};

export const TagBadge = ({ tag }: Props): JSX.Element => {
	return (
		<a href={`/entry/tag/${encodeURIComponent(tag)}`}>
			<span className="bg-gray-100 dark:bg-gray-600 px-2 py-1 text-blue-600 dark:text-blue-400 hover:underline hover:bg-gray-200 dark:hover:bg-gray-500 text-sm rounded-full mr-2 mb-2 cursor-pointer transition-colors duration-200 inline-block">
				#{tag}
			</span>
		</a>
	);
};
