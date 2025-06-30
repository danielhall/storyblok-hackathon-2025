import { Teaser } from "@/lib/storyblok/types/storyblok-components";

interface TeaserProps {
    blok: Teaser
}

export default function Index({ blok }: TeaserProps) {
return (
	<div className="teaser">
		<h2>{blok.headline}</h2>
	</div>
);
}