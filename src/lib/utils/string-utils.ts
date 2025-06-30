import { titleCase } from "scule";

export const codenameToString = (slug: string | undefined): string => {
    if (!slug) {
        return "";
    }

    // Resolve common acronyms
    slug = resolveAcronyms(slug);

    return titleCase(slug);
}

const resolveAcronyms = (str: string): string => {    
    // Handle common acronyms
    const acronyms: Record<string, string> = {
        "ctm": "contentTextMedia",
        "cta": "callToAction"
    };

    return acronyms[str] || str;
}