import { getStoryblokApi } from "@/lib/storyblok";

import { codenameToString } from "@/lib/utils/string-utils";
import { StoryblokClient } from "@storyblok/react";

export interface StoryCard {
  id?: string; // Optional ID for each story
  name: string;
  slug: string;
  storyType: string;
  storyUrl?: string | null;
  storyTypeCodeName: string;
  allowedBlocks?: string[]; // Optional list of allowed blocks for this story
  children: StoryCard[];
}

// Helper to build a tree of StoryCard objects, inferring folders from slug hierarchy and inserting missing folders
interface StoryblokStory {
  id?: string | number;
  name?: string;
  slug?: string;
  full_slug?: string;
  storyType?: string;
  storyUrl?: string | null;
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

const buildStoryCardTree = (stories: StoryblokStory[]): StoryCard[] => {
  // Map slug to story for quick lookup
  const slugToStory = new Map<string, StoryblokStory>();
  stories.forEach((story) => {
    if (story.full_slug) slugToStory.set(story.full_slug, story);
  });

  // Collect all folder slugs that should exist
  const folderSlugs = new Set<string>();
  stories.forEach((story) => {
    if (!story.full_slug) return;
    const parts = story.full_slug.split("/");
    for (let i = 1; i < parts.length; i++) {
      const folderSlug = parts.slice(0, i).join("/");
      folderSlugs.add(folderSlug);
    }
  });

  // Add missing folders as synthetic stories
  folderSlugs.forEach((slug) => {
    if (!slugToStory.has(slug)) {
      slugToStory.set(slug, {
        id: `${slug}`,
        name: codenameToString(slug.split("/").pop()),
        full_slug: slug,
        storyType: "folder",
        isFolder: true,
      });
    }
  });

  // Build a flat array of all stories and folders, sorted by slug length (shortest first)
  const allNodes = Array.from(slugToStory.values()).sort((a, b) => {
    const aSlug = a.full_slug || a.slug || "";
    const bSlug = b.full_slug || b.slug || "";
    return aSlug.split("/").length - bSlug.split("/").length;
  });

  // Helper to find direct children by slug
  const getChildren = (parentSlug: string) => {
    return allNodes.filter((node) => {
      const slug = node.full_slug || node.slug;
      if (!slug) return false;
      const slugParts = slug.split("/");
      const parentParts = parentSlug ? parentSlug.split("/") : [];
      return (
        slugParts.length === parentParts.length + 1 &&
        (parentSlug === "" || slug.startsWith(parentSlug + "/"))
      );
    });
  };

  // Recursively build the tree
  const buildTree = (parentSlug: string): StoryCard[] => {
    return getChildren(parentSlug).map((node) => {
      const isFolder = node.isFolder;
      const name = node.is_startpage
        ? "Index"
        : node.name || node.full_slug || node.slug || "(no name)";
      const id = node.id !== undefined ? node.id.toString() : "";
      const slug = node.full_slug || node.slug || "";
      const storyType = isFolder
        ? "Folder"
        : codenameToString(node.content?.component || "unknown");
      const storyTypeCodeName = isFolder
        ? "folder"
        : node.content?.component || "unknown";
      const storyUrl = isFolder
        ? null
        : `https://app.storyblok.com/#/me/spaces/${process.env.STORYBLOK_SPACE_ID}/stories/0/0/${node.id}`;
      const children = buildTree(node.full_slug || node.slug || "");
      return { id, name, slug, storyType, storyUrl, storyTypeCodeName, children };
    });
  };

  // Root is ""
  return buildTree("");
};

// Helper to fetch all stories with pagination
async function fetchAllStories(storyblokApi: StoryblokClient, useDraft: boolean): Promise<StoryblokStory[]> {
  let page = 1;
  const perPage = 100;
  let allStories: StoryblokStory[] = [];
  let total = 0;
  do {
    const { data } = await storyblokApi.get("cdn/stories", {
      version: useDraft ? "draft" : "published",
      per_page: perPage,
      page,
    });
    allStories = allStories.concat(data.stories);
    total = data.total || allStories.length;
    page++;
  } while (allStories.length < total);
  return allStories;
}

// Fetches a tree of StoryCard objects with nested children based on parent/child relationship
export const fetchStoryCardTree = async (useDraft: boolean): Promise<StoryCard[]> => {
  const storyblokApi = getStoryblokApi();
  const stories = await fetchAllStories(storyblokApi, useDraft);
  // Build tree based on slug hierarchy (root is empty string)
  return buildStoryCardTree(stories);
};

// Flattens all stories to a unique set of story types
export const fetchUniqueStoryTypes = async (useDraft: boolean): Promise<string[]> => {
  const storyblokApi = getStoryblokApi();
  const stories = await fetchAllStories(storyblokApi, useDraft);
  const types = new Set<string>();
  // Recursively collect all unique story types from all stories
  const collectTypes = (story: StoryblokStory) => {
    if (story.content?.component) {
      types.add(story.content.component);
    }
    if (story.content?.body && Array.isArray(story.content.body)) {
      story.content.body.forEach(collectTypes);
    }
    if (story.content?.columns && Array.isArray(story.content.columns)) {
      story.content.columns.forEach(collectTypes);
    }
  };
  stories.forEach(collectTypes);
  return Array.from(types);
};
