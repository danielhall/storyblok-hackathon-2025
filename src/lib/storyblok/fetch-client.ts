import { getStoryblokApi } from "@/lib/storyblok";

export interface StoryCard {
    id?: string; // Optional ID for each story
    name: string;
    storyType: string;
    children: StoryCard[];
}

// Helper to build a tree of StoryCard objects, inferring folders from slug hierarchy and inserting missing folders
const buildStoryCardTree = (stories: any[]): StoryCard[] => {
    // Map slug to story for quick lookup
    const slugToStory = new Map<string, any>();
    stories.forEach(story => {
        if (story.full_slug) slugToStory.set(story.full_slug, story);
    });

    // Collect all folder slugs that should exist
    const folderSlugs = new Set<string>();
    stories.forEach(story => {
        if (!story.full_slug) return;
        const parts = story.full_slug.split("/");
        for (let i = 1; i < parts.length; i++) {
            const folderSlug = parts.slice(0, i).join("/");
            folderSlugs.add(folderSlug);
        }
    });

    // Add missing folders as synthetic stories
    folderSlugs.forEach(slug => {
        if (!slugToStory.has(slug)) {
            slugToStory.set(slug, {
                id: `folder:${slug}`,
                name: slug.split("/").pop(),
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
        return allNodes.filter(node => {
            const slug = node.full_slug || node.slug;
            if (!slug) return false;
            const slugParts = slug.split("/");
            const parentParts = parentSlug ? parentSlug.split("/") : [];
            return slugParts.length === parentParts.length + 1 &&
                (parentSlug === "" || slug.startsWith(parentSlug + "/"));
        });
    };

    // Recursively build the tree
    const buildTree = (parentSlug: string): StoryCard[] => {
        return getChildren(parentSlug).map(node => {
            const isFolder = node.isFolder;
            const name = node.name || node.full_slug || node.slug || "(no name)";
            const id = node.id;
            const storyType = isFolder ? "folder" : (node.content?.component || "unknown");
            const children = buildTree(node.full_slug || node.slug);
            return { id, name, storyType, children };
        });
    };

    // Root is ""
    return buildTree("");
};

// Fetches a tree of StoryCard objects with nested children based on parent/child relationship
export const fetchStoryCardTree = async (): Promise<StoryCard[]> => {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
        version: "draft",
        per_page: 100,
    });
    // Build tree based on slug hierarchy (root is empty string)
    return buildStoryCardTree(data.stories);
};

// Flattens all stories to a unique set of story types
export const fetchUniqueStoryTypes = async (): Promise<string[]> => {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
        version: "draft",
        per_page: 100,
    });
    const types = new Set<string>();
    // Recursively collect all unique story types from all stories
    const collectTypes = (story: any) => {
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
    data.stories.forEach(collectTypes);
    return Array.from(types);
};
