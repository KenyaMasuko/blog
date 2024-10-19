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

// yyyyMMddの形式で今日の日付を取得
const date = new Date();
const yyyyMM = date
	.toLocaleDateString("ja-JP", {
		year: "numeric",
		month: "2-digit",
	})
	.replace("/", "");
const yyyy = date.getFullYear();
const MM = date.getMonth() + 1;
console.log("hellooooo");
console.log(yyyy, MM);

// const yyyyMMdd = date
// 	.toLocaleDateString("ja-JP", {
// 		year: "numeric",
// 		month: "2-digit",
// 		day: "2-digit",
// 	})
// 	.replaceAll("/", "");

const { exitCode } = await $`ls ./app/articles/${yyyy}/${MM}`.quiet();

// MEMO: 今日の日付のディレクトリを生成
if (exitCode !== 0) {
	await $`mkdir ./app/articles/${yyyy}/${MM}`;
} else {
	const { exitCode } = await $`ls ./app/articles/${yyyy}/${MM}`.quiet();
	if (exitCode !== 0) {
		await $`mkdir ./app/articles/${yyyy}/${MM}/`;
	}
}

// MEMO: ファイルを生成
await $`touch ./app/articles/${yyyy}/${MM}//${entryPath}.mdx`;

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
