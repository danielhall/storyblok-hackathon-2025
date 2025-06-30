import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({
  endpoint: 'https://mapi.storyblok.com/'
});

export const getComponents = async (): Promise<WhitelistMap | null> => {
    try {
        const response = await Storyblok.get(
            `v1/spaces/${process.env.STORYBLOK_SPACE_ID}/components/`, {}, {
                headers: {
                    Authorization: process.env.STORYBLOK_PAT ? `${process.env.STORYBLOK_PAT}` : ''
                }
            }
        );
        
        return extractComponentWhitelists(response.data.components);
    } catch (error) {
        console.log(error);
        return null;
    }
}

type StoryblokComponentMap = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema?: Record<string, any>;
};

type WhitelistMap = Record<string, string[]>;

function extractComponentWhitelists(components: StoryblokComponentMap[]): WhitelistMap {
  const result: WhitelistMap = {};

  for (const component of components) {
    const whitelist: string[] = [];

    if (component.schema) {
      for (const fieldKey in component.schema) {
        const field = component.schema[fieldKey];

        if (
          field?.component_whitelist &&
          Array.isArray(field.component_whitelist)
        ) {
          whitelist.push(...field.component_whitelist);
        }
      }
    }

    result[component.name] = whitelist;
  }

  return result;
}