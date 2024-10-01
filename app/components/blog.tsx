import type { FC } from "hono/jsx";
import type { getPosts } from "../lib/posts";
import { convertDateToJaYYMMDD } from "../lib/date";

type Props = Omit<ReturnType<typeof getPosts>[0], "Component">;

export const BlogPost: FC<Props> = (props) => {
  return (
    <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md mb-8 overflow-hidden">
      <div className="p-6">
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
        <a
          href={`/entry/${props.entryName}`}
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          続きを読む
        </a>
      </div>
    </article>
  );
};
