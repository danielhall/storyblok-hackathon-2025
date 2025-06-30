import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';

import { fetchStoryCardTree, StoryCard } from '@/lib/storyblok/fetch-client';

export default async function Dashboard() {
	const storyData = await fetchStoryCardTree();

	return (
		<div className="page">
			<h1>Dashboard - Raw Data</h1>
			<p>{JSON.stringify(storyData)}</p>
			{storyData.map((story: StoryCard) => (
				<div key={story.id} className="story-card">
					<h2>{story.name}</h2>
					<p>Type: {story.storyType}</p>
					{story.children && story.children.length > 0 && (
						<ul>
							{story.children.map((child: StoryCard) => (
								<li key={child.id}>{child.name} ({child.storyType})</li>
							))}
						</ul>
					)}
				</div>
			))}
		</div>
	);
}