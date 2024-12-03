import { promises } from "node:fs";
import { $ } from "bun";
import prompts from "prompts";

const result = await prompts(
	[
		{
			type: "text",
			name: "entryTitle",
			message: "記事のタイトルを入力してください:",
		},
		{
			type: "text",
			name: "entryPath",
			message: "記事のuriを入力してください:",
		},
	],
	{
		onCancel: () => {
			process.exit(0);
		},
	},
);

const entryTitle = result.entryTitle as string;
const entryPath = result.entryPath as string;

const date = new Date();
const yyyy = date.getFullYear();
const MM = date.getMonth() + 1;

try {
	const { exitCode } = await $`ls ./app/articles/${yyyy}/${MM}`.quiet();
	if (exitCode !== 0) {
		await $`mkdir -p ./app/articles/${yyyy}/${MM}`;
	}
} catch (error) {
	console.error("error: ", error);
	await $`mkdir -p ./app/articles/${yyyy}/${MM}`;
}

await $`touch ./app/articles/${yyyy}/${MM}/${entryPath}.mdx`;

const frontMatter = `---
title: ${entryTitle}
date: ${date.toISOString()}
description: 
iconUrl: 
---
`;

await promises.writeFile(
	`./app/articles/${yyyy}/${MM}/${entryPath}.mdx`,
	frontMatter,
);

await $`echo articles/${yyyy}/${MM}/${entryPath}.mdx is created.`;

await $`cursor ./app/articles/${yyyy}/${MM}/${entryPath}.mdx`;
