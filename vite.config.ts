import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig, normalizePath } from "vite";
import ssg from "@hono/vite-ssg";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "node:path";

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
				providerImportSource: "./app/lib/mdx",
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
			viteStaticCopy({
				targets: [
					{
						src: ["./app/assets/**/*.avif"],
						dest: "assets",
						rename: (
							_fileName: string,
							_fileExtension: string,
							fullPath: string,
						) => {
							const destPath = normalizePath(
								path.relative(__dirname, fullPath).replace(/^app\/.*\//, ""),
							);
							return destPath;
						},
						overwrite: false,
					},
				],
			}),
		],
		build: {
			assetsDir: "static",
			emptyOutDir: false,
			ssrEmitAssets: false,
			rollupOptions: {
				input: ["./app/tailwind.css", "./app/theme.ts"],
				output: {
					entryFileNames: "static/[name].js",
					assetFileNames: (assetInfo) => {
						if (assetInfo.name === "tailwind.css") return "styles/style.css";
						if (assetInfo.name === "theme.js") return "static/theme.js";
						return assetInfo.name ?? "";
					},
				},
			},
		},
		ssr: {
			target: "node",
			external: ["@mdx-js/mdx", "jsdom"],
		},
	};
});
