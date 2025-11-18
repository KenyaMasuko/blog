import type { MDXComponents } from "mdx/types";
import { AnchorLink } from "./anchor-link";
import { ArticleImage } from "./article-image";
import { ExternalOgp } from "./external-ogp";

export const useMDXComponents = (): MDXComponents => ({
	ExternalOgp,
	AnchorLink,
	img: ArticleImage,
});
