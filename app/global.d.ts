import {} from "hono";

type Head = {
	title?: string;
	entryName?: string;
	frontmatter?: Frontmatter;
};

declare module "hono" {
	interface Env {
		Variables: {};
		Bindings: {};
	}
	interface ContextRenderer {
		(
			content: string | Promise<string>,
			head?: Head,
		): Response | Promise<Response>;
	}
}
