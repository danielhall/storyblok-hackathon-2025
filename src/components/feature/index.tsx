import { Feature } from "@/lib/storyblok/types/storyblok-components";

interface FeatureProps {	
	blok: Feature;
}

export default function Index({ blok }: FeatureProps) {
	return (
		<div className="feature">
			<span>{blok.name}</span>
		</div>
	);
}