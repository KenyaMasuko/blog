import { css } from "hono/css";
import { createRoute } from "honox/factory";
import { Me } from "../components/me";

const className = css`
  font-family: sans-serif;
`;

export default createRoute((c) => {
	return c.render(
		<div class={className}>
			<Me />
		</div>,
		{ title: "ホーム" },
	);
});
