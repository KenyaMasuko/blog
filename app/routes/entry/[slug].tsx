import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import { getPostByEntryName, getPosts } from "../../lib/posts";
import { convertDateToJaYYMMDD } from "../../lib/date";

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
      return c.render(<div>Not found</div>);
    }

    const post = getPostByEntryName(slug);
    const title = post?.frontmatter.title;
    const date = post?.frontmatter.date;

    return c.render(
      <div>
        <div>
          {title && (
            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              {title}
            </h1>
          )}
          {date && (
            <p className="text-sm text-gray-600 dark:text-gray-400">{convertDateToJaYYMMDD(date)}</p>
          )}
        </div>
        <article className="prose dark:prose-invert max-w-none mt-6 markdown">{post?.Component({})}</article>
      </div>
    );
  }
);
