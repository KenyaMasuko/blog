import { createRoute } from "honox/factory";
import { getPosts } from "../../lib/posts";

export default createRoute(async (c) => {
  const posts = getPosts();
  return c.render(
    <div>
      {posts.map((p, i) => (
        <a key={p.entryName} href={`/entry/${p.entryName}`}>
          <h2>{p.frontmatter.title}</h2>
          <p>{p.frontmatter.date}</p>
        </a>
      ))}
    </div>,
  );
});
