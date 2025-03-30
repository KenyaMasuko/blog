import { ExternalOgp } from "./external-ogp";
import { AnchorLink } from "./anchor-link";
import type { MDXComponents } from "mdx/types";
import { ArticleImage } from "./article-image";

export const useMDXComponents = (): MDXComponents => ({
	ExternalOgp,
	AnchorLink,
	img: ArticleImage,
});
