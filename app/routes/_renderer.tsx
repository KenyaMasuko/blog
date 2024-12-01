import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { Script } from "honox/server";
import { Layout } from "../components/layout";
import styles from "../tailwind.css?url";
import { BLOG_NAME, ENV } from "../constants/env";

export default jsxRenderer(({ children, title, frontmatter, entryName }) => {
	const pageTitle = title ? `${title} | ${BLOG_NAME}` : BLOG_NAME;
	const ogpPath = entryName ? `/ogp/${entryName}.png` : "";
	const c = useRequestContext();
	const currentUrl = c.req.url;
	const description = frontmatter?.description ?? "kenchan's blog";

	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				{title && <meta property="og:title" content={pageTitle} />}
				{entryName && <meta property="og:image" content={`${ENV.domain}${ogpPath}`} />}
				<meta property="og:url" content={currentUrl} />
				<meta property="og:type" content="article" />
				<meta property="og:description" content={description} />
				<meta property="og:site_name" content={BLOG_NAME} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@kenchan_dayoooo" />
				<meta name="twitter:title" content={pageTitle} />
				<meta name="twitter:description" content={description} />
				<meta
					name="twitter:image"
					content={`${ENV.domain}${ogpPath}`}
				/>
				<title>{pageTitle}</title>
				{import.meta.env.PROD ? (
					<link rel="icon" href={`${ENV.domain}/assets/avatar.avif`} />
				) : (
					<link rel="icon" href="../assets/avatar.avif" />
				)}
				{import.meta.env.PROD ? (
					<script src="/static/theme.js" />
				) : (
					<script src="/app/theme.ts" />
				)}
				<Script src="/app/client.ts" async />
				{import.meta.env.PROD ? (
					<link href="/styles/style.css" rel="stylesheet" />
				) : (
					<link href={styles} rel="stylesheet" />
				)}
			</head>
			<body class="dark:bg-gray-800 dark:text-white">
				<Layout>{children}</Layout>
			</body>
		</html>
	);
});
