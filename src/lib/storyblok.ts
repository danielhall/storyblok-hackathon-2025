import Page from "@/components/page";
import Feature from "@/components/feature";
import Teaser from "@/components/teaser";
import Grid from "@/components/grid";

import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

export const getStoryblokApi = storyblokInit({
	accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
	use: [apiPlugin],
	components: {
		page: Page,
		feature: Feature,
		teaser: Teaser,
		grid: Grid,
	}
});