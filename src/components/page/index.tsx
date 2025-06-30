import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

import type { ISbStoryData } from '@storyblok/js';

export default function Page({ blok }: ISbStoryData) {
return (
	<main>
		{blok.body.map((nestedBlok: ISbStoryData) => (
			<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
		))}
	</main>
);
}