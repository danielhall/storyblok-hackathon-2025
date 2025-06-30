import StoryblokClient from 'storyblok-js-client';
import { extractComponentWhitelists } from '../utils/component-utils';
import { WhitelistMap } from './types';

const storyblok = new StoryblokClient({ endpoint: 'https://mapi.storyblok.com/v1/' });

export const fetchComponents = async (): Promise<WhitelistMap> => {
  try {
    const response = await storyblok.get(
      `spaces/${process.env.STORYBLOK_SPACE_ID}/components/`,
      {},
      {
        headers: {
          Authorization: process.env.STORYBLOK_PAT ? `${process.env.STORYBLOK_PAT}` : ''
        }
      }
    );
    return extractComponentWhitelists(response.data.components);
  } catch (error) {
    console.error(error);
    return {};
  }
};