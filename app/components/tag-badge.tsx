import type { JSX } from "hono/jsx/jsx-runtime";

type Props = {
	tag: string;
};

export const TagBadge = ({ tag }: Props): JSX.Element => {
	return (
		<a
			href={`/entry?tag=${tag}`}
			className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 text-sm rounded-full mr-2 mb-2 cursor-pointer transition-colors duration-200 inline-block"
		>
			#{tag}
		</a>
	);
};