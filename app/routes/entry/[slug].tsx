import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
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
      return c.render(<div>Not found</div>);
    }

    const post = getPostByEntryName(slug);
    const title = post?.frontmatter.title;
    const description = post?.frontmatter.description;
    const date = post?.frontmatter.date;

    return c.render(
      <div>
        {title && <h1>{title}</h1>}
        {date && <p>{date}</p>}
        {description && <p>{description}</p>}
        {post?.Component({})}
      </div>,
    );
  },
);
