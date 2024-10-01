import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";
import ssg from "@hono/vite-ssg";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

export default defineConfig(({ mode }) => {
	if (mode === "client") {
		return {
			plugins: [client()],
		};
	}

	const entry = "./app/server.ts";

	return {
		plugins: [
			ssg({ entry }),
			honox(),
			mdx({
				jsxImportSource: "hono/jsx",
				remarkPlugins: [
					remarkFrontmatter,
					remarkMdxFrontmatter,
					[remarkRehype],
					remarkGfm,
					remarkParse,
				],
				rehypePlugins: [
					rehypeStringify,
					[rehypePrettyCode, { theme: "catppuccin-mocha" }],
				],
			}),
		],
		build: {
			assetsDir: "static",
			emptyOutDir: false,
			ssrEmitAssets: false,
			rollupOptions: {
				input: ["./app/tailwind.css"],
				output: {
					entryFileNames: "[name].js",
					assetFileNames: (assetInfo) => {
						if (assetInfo.name === "tailwind.css") {
							return "styles/style.css";
						}
						return assetInfo.name ?? "";
					},
				},
			},
		},
		ssr: {
			target: "node",
			external: ["@mdx-js/mdx"],
		},
	};
});
