export interface StoryblokComponentMap {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema?: Record<string, any>;
}

export type WhitelistMap = Record<string, string[]>;

export interface StoryCard {
  id?: string;
  name: string;
  slug: string;
  storyType: string;
  storyTypeCodeName: string;
  allowedBlocks?: string[];
  children: StoryCard[];
}

export interface StoryblokStory {
  id?: string | number;
  name?: string;
  slug?: string;
  full_slug?: string;
  storyType?: string;
  isFolder?: boolean;
  is_startpage?: boolean;
  content?: {
    component?: string;
    body?: StoryblokStory[];
    columns?: StoryblokStory[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}
