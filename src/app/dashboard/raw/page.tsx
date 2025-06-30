import { fetchStoryCardTree } from '@/lib/storyblok/fetch-client';
import { draftMode } from 'next/headers';

export default async function Dashboard() {
	const { isEnabled } = await draftMode();
	const storyData = await fetchStoryCardTree(isEnabled);


	return (
		<div className="page">
			<h1>Dashboard - Raw Data</h1>
			<pre>{JSON.stringify(storyData, null, 2)}</pre>
		</div>
	);
}