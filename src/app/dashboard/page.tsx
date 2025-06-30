
import Tag from '@/components/tag';

export default async function Dashboard() {
	return (
		<div className="page">
			<h1>Dashboard</h1>
			<Tag tag="example-tag" />
			<Tag tag="example-tag-2" />
			<Tag tag="example-tag-2" />
			<Tag tag="example-tag-3" />
		</div>
	);
}