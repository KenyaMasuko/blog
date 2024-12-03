import { ExternalOgp } from "./external-ogp";
import { AnchorLink } from "./anchor-link";
import type { MDXComponents } from "mdx/types";

export const useMDXComponents = (): MDXComponents => ({
	ExternalOgp,
	AnchorLink,
});
