import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

export const getStoryblokApi = storyblokInit({
	accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
	use: [apiPlugin]
});