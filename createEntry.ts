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
const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	fractionalSecondDigits: 3,
	timeZone: "Asia/Tokyo",
});

const parts = dateFormatter.formatToParts(date);
const dateParts: Record<string, string> = {};
for (const { type, value } of parts) {
	dateParts[type] = value;
}

const isoDate = `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}.${dateParts.fractionalSecond}Z`;

const { exitCode } =
	await $`ls ./app/articles/${dateParts.year}/${dateParts.month}`
		.quiet()
		.catch(async (e) => {
			console.warn("warn: ", e);
			await $`mkdir -p ./app/articles/${dateParts.year}/${dateParts.month}`;

			return { exitCode: 1 };
		});

if (exitCode !== 0) {
	await $`mkdir -p ./app/articles/${dateParts.year}/${dateParts.month}`;
}

await $`touch ./app/articles/${dateParts.year}/${dateParts.month}/${entryPath}.mdx`;

const frontMatter = `---
title: ${entryTitle}
date: ${isoDate}
description: 
iconUrl: 
---
`;

await promises.writeFile(
	`./app/articles/${dateParts.year}/${dateParts.month}/${entryPath}.mdx`,
	frontMatter,
);

await $`echo articles/${dateParts.year}/${dateParts.month}/${entryPath}.mdx is created.`;

await $`cursor ./app/articles/${dateParts.year}/${dateParts.month}/${entryPath}.mdx`;
