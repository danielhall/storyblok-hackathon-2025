import { titleCase } from "scule";

export const codenameToString = (slug: string | undefined): string => {
    if (!slug) {
        return "";
    }

    return titleCase(slug);
}