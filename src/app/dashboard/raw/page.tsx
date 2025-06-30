import { fetchStoryCardTree } from '@/lib/storyblok/fetch-client';

export default async function Dashboard() {
	const storyData = await fetchStoryCardTree();

	return (
		<div className="page">
			<h1>Dashboard - Raw Data</h1>
			<pre>{JSON.stringify(storyData, null, 2)}</pre>
		</div>
	);
}