import type { FC } from "hono/jsx";

type Props = {
	content: string;
};

export const Badge: FC<Props> = (props) => {
	return (
		<span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
			{props.content}
		</span>
	);
};
