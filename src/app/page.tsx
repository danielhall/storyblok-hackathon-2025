import { Dashboard } from '@/components/dashboard';
import { fetchStoryCardTree } from '@/lib/storyblok/fetch-client';

export default async function Home() {

	const storyData = await fetchStoryCardTree();


	return (
		<div className="page">
			<Dashboard storyData={storyData} />
		</div>
	);
}





