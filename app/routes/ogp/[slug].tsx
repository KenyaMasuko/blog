import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import { getPostByEntryName, getPosts } from "../../lib/posts";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { BLOG_NAME } from "../../constants/env";

const buildGoogleFontUrl = ({
	family,
	weight,
	text,
	display
}: {
	family: string;
	weight?: number;
	text?: string;
	display?: string;
}) => {
	const params: Record<string, string> = {
		family: `${encodeURIComponent(family)}${weight ? `:wght@${weight}` : ""}`,
	}
	if (text) {
		params.text = encodeURIComponent(text);
	} else {
		params.subset = "latin";
	}
	if (display) {
		params.display = display;
	}
	return `https://fonts.googleapis.com/css2?${Object.entries(params).map(([key, value]) => `${key}=${value}`).join("&")}`;
}

const loadGoogleFont = async ({
	family,
	weight, 
	text
}: {
	family: string;
	weight?: number;
	text?: string
}) => {
	const url = buildGoogleFontUrl({ family, weight, text });
	const res = await fetch(url, {
		headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
	});
	const css = await res.text();
	const fontUrl = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  )?.[1];
	
	if (!fontUrl) {
		throw new Error("fontUrl not found");
	}

	const font = await fetch(fontUrl);

	return font.arrayBuffer();
}

export default createRoute(
	ssgParams(() => {
		const posts = getPosts();
		return posts.map((p) => ({
			slug: p.entryName,
		}));
	}),
	async (c) => {
		console.log("=============== now building ogp image ===============");
		const entryName = c.req.param("slug");
		if(entryName === ":slug") {
			c.status(404);
			return c.body("Not found");
		}
		
		const post = getPostByEntryName(entryName);
		const title = post?.frontmatter?.title ?? "";

		const notoSansBold = await loadGoogleFont({
			family: "Noto Sans JP",
			weight: 600,
		});

		const svg = await satori(
			<div tw={"w-full h-full flex p-9"} style={{
				background: "linear-gradient(180deg, #FFCB67, #FF9A67)"
			}}>
				<div
					tw={
						"bg-white rounded-3xl border-solid w-full flex flex-col justify-end"
					}
				>
					<div tw={"flex w-full flex-1 items-center mt-10 px-34"}>
						<div
							tw={`flex justify-center  text-[4rem] flex-wrap`}
						>
							{title}
						</div>
					</div>
					<div
						tw={
							"flex px-18 mb-10 items-center justify-between w-full text-[#444444]"
						}
					>
						<div tw="text-4xl flex items-center">
							<img
								alt="avatar"
								tw="rounded-full mr-4 w-18 h-18"
								src="https://avatars.githubusercontent.com/u/85816730?v=4"
							/>
							{BLOG_NAME}
						</div>
						<h1
							style={{
								fontWeight: 600,
								fontFamily: "Noto Sans JP",
							}}
						>
							kenchandayo.xyz
						</h1>
					</div>
				</div>
			</div>,
			{
				width: 1200,
				height: 630,
				fonts: [{
					name: "Noto Sans JP",
					data: notoSansBold,
					weight: 600,
					style: "normal",
				}],
			},
		);

		const body = new Resvg(svg).render().asPng();

		console.log("=============== ogp image built ===============");

		c.header("Content-Type", "image/png");
		return c.body(body);
	},
);
