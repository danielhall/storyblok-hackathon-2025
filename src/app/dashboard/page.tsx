
import { Dashboard } from '@/components/dashboard';
import { computeSpaceIA } from '@/lib/services/ia-orchestration-service';

export default async function Page() {

	const storyData = await computeSpaceIA(true);


	return (
		<div className="page">
			<Dashboard storyData={storyData}/>
		</div>
	);
}