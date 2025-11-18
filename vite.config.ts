import path from "node:path";
import ssg from "@hono/vite-ssg";
import mdx from "@mdx-js/rollup";
import honox from "honox/vite";
import client from "honox/vite/client";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { defineConfig, normalizePath } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig(({ mode }) => {
	console.log("=============== import vite config ===============");
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
					[
						remarkRehype,
						{
							footnoteBackContent: "↩︎",
							footnoteLabel: " ",
							footnoteLabelTagName: "hr",
							footnoteBackLabel: "Back to reference 1",
						},
					],
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
			ssrEmitAssets: true,
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
			external: [
				"unified",
				"@mdx-js/mdx",
				"satori",
				"@resvg/resvg-js",
				"feed",
				"budoux",
				"jsdom",
			],
		},
		server: {
			host: "0.0.0.0",
		},
	};
});
