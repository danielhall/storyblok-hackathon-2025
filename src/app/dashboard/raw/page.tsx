import { computeSpaceIA } from '@/lib/services/ia-orchestration-service';
import { draftMode } from 'next/headers';

export default async function Dashboard() {
	const { isEnabled } = await draftMode();
	const dashboardData = await computeSpaceIA(isEnabled);

	return (
		<div className="page">
			<h1>Dashboard - Raw Data</h1>
			<pre>{JSON.stringify(dashboardData, null, 2)}</pre>
		</div>
	);
}