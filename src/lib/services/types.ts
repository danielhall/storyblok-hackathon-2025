export interface StoryblokComponentMap {
  name: string;
  schema?: Record<string, any>;
}

export type WhitelistMap = Record<string, string[]>;

export interface StoryCard {
  id?: string;
  name: string;
  slug: string;
  storyType: string;
  storyTypeCodeName: string;
  redirects?: string[];
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
