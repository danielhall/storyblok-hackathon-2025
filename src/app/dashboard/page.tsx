import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';

import { fetchStoryCardTree, StoryCard } from '@/lib/storyblok/fetch-client';

export default async function Dashboard() {
	const storyData = await fetchStoryCardTree();

	return (
		<div className="page">
			<h1>Dashboard</h1>
		</div>
	);
}