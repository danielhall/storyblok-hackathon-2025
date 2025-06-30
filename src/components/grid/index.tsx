import { StoryblokServerComponent } from '@storyblok/react/rsc'

import type { Grid } from '@/lib/storyblok/types/storyblok-components'

interface GridProps {
    blok: Grid
}

export default function Grid({ blok }: GridProps){
return (
	<div className="grid">
		{blok.columns && (
            blok.columns.map((nestedBlok) => (
			    <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
		    ))
        )}
	</div>
);
};