import { WhitelistMap, StoryblokComponentMap } from "../services/types";

export function extractComponentWhitelists(components: StoryblokComponentMap[]): WhitelistMap {
  const result: WhitelistMap = {};
  for (const component of components) {
    const whitelist: string[] = [];
    if (component.schema) {
      for (const fieldKey in component.schema) {
        const field = component.schema[fieldKey];
        if (field?.component_whitelist && Array.isArray(field.component_whitelist)) {
          whitelist.push(...field.component_whitelist);
        }
      }
    }
    result[component.name] = whitelist;
  }
  return result;
}
