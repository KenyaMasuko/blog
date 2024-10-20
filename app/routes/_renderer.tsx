import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";
import { Layout } from "../components/layout";
import styles from "../tailwind.css?url";
import { ENV } from "../constants/env";

export default jsxRenderer(({ children, title }) => {
	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>{title}</title>
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
