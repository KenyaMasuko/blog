type Props = {
	src: string;
	alt: string;
};

export const ArticleImage = (props: Props) => {
	const src = import.meta.env.PROD
		? `/assets/${props.src}`
		: `/app/assets/${props.src}`;
	return (
		<figure class="full-width justify-center flex">
			<a href={src}>
				<img src={src} alt={props.alt} />
			</a>
		</figure>
	);
};
