import { fetchStoryCardTree, StoryCard } from "./story-service";
import { getComponents } from "./component-service";
import { codenameToString } from "../utils/string-utils";

export const computeSpaceIA = async (
  useDraft: boolean
): Promise<StoryCard[]> => {
  const storyCardTree = await fetchStoryCardTree(useDraft);
  const componentMap = await getComponents();

  // Recursively assign allowedBlocks to each story and its children
  function assignAllowedBlocks(story: StoryCard) {
    if (componentMap && story.storyType && componentMap[story.storyTypeCodeName]) {
      story.allowedBlocks = componentMap[story.storyTypeCodeName].map(
        (str: string) => codenameToString(str)
      );
    } else {
      story.allowedBlocks = [];
    }
    if (story.children && story.children.length > 0) {
      story.children.forEach(assignAllowedBlocks);
    }
  }

  storyCardTree.forEach(assignAllowedBlocks);
  return storyCardTree;
};
