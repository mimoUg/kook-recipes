import rawSettings from '../content/settings/index.json';

export interface Stat {
    value: string;
    label: string;
}

export interface FooterLink {
    label: string;
    href: string;
}

export interface FooterColumn {
    title: string;
    links: FooterLink[];
}

export interface Settings {
    siteTitle: string;
    siteDescription: string;
    hero: {
        headline: string;
        description: string;
        image: string;
        buttonLabel: string;
    };
    about: {
        title: string;
        description: string;
        image: string;
        stats: Stat[];
    };
    contact: {
        title: string;
        description: string;
        phone?: string;
        email: string;
    };
    footer: {
        description: string;
        columns: FooterColumn[];
    };
}

export const settings = rawSettings as Settings;

/**
 * Turns *accented* text into <em> while escaping the rest.
 * Used for the hero headline so editors can highlight one word.
 */
export function formatAccentText(text: string): string {
    const escaped = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    return escaped.replace(
        /\*([^*]+)\*/g,
        '<em class="font-serif italic font-medium">$1</em>',
    );
}
