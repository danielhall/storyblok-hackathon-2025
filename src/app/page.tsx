import Link from 'next/link';

export default async function Home() {
	return (
		<div className="page flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
			<h1 className="text-4xl font-bold mb-4 text-center text-blue-700">Storyblok Information Architecture Visualiser</h1>
			<p className="text-lg text-gray-700 mb-6 max-w-2xl text-center">
				Welcome to our Storyblok Hackathon project!
			</p>
			<p className="text-lg text-gray-700 mb-6 max-w-2xl text-center">
				This tool automatically builds a live, interactive Information Architecture (IA) diagram from your Storyblok space. Visualise your content structure, explore nested folders and stories, and gain insights into your digital ecosystem—all in real time.
			</p>
			<Link href="/dashboard" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
				Go to Dashboard
			</Link>
			<Link href="/sitemap-visualiser" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 mt-2 transition">
				Go to Redirect Visualiser
			</Link>
		</div>
	);
}





