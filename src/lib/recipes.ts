import { getCollection, type CollectionEntry } from 'astro:content';

export type Recipe = CollectionEntry<'recipes'>;

/**
 * Keystatic can write either `slug.md` or `slug/index.md`, depending on the
 * collection format. Normalise both to a clean URL slug.
 */
export function getRecipeSlug(recipe: Recipe): string {
    return recipe.id.replace(/\/index$/, '');
}

export function getRecipeDate(recipe: Recipe): Date | null {
    const value = recipe.data.publishedDate;
    if (!value) return null;

    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDate(date: Date | null): string {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
}

export async function getAllRecipes(): Promise<Recipe[]> {
    const recipes = await getCollection('recipes');

    return recipes
        .filter((recipe) => recipe.data.published !== false)
        .sort((a, b) => {
            const aDate = getRecipeDate(a)?.getTime() ?? 0;
            const bDate = getRecipeDate(b)?.getTime() ?? 0;
            return bDate - aDate;
        });
}

export type RecipeSection = 'leftover-chicken' | 'eggplant';

export const RECIPE_SECTIONS: { slug: RecipeSection; label: string }[] = [
    { slug: 'leftover-chicken', label: 'Leftover Chicken' },
    { slug: 'eggplant', label: 'Eggplant' },
];

export function getRecipeSection(recipe: Recipe): RecipeSection {
    return recipe.data.section === 'eggplant'
        ? 'eggplant'
        : 'leftover-chicken';
}

export function getSectionLabel(section: RecipeSection): string {
    return (
        RECIPE_SECTIONS.find((entry) => entry.slug === section)?.label ??
        section
    );
}

export function getRecipesForSection(
    recipes: Recipe[],
    section: RecipeSection,
): Recipe[] {
    return recipes.filter((recipe) => getRecipeSection(recipe) === section);
}

export function getCategories(recipes: Recipe[]): string[] {
    const categories = new Set<string>();

    for (const recipe of recipes) {
        for (const category of recipe.data.categories) {
            if (category.trim()) categories.add(category.trim());
        }
    }

    return [...categories].sort((a, b) => a.localeCompare(b));
}

export function getSimilarRecipes(
    current: Recipe,
    recipes: Recipe[],
    limit = 3,
): Recipe[] {
    const currentCategories = new Set(current.data.categories);
    const currentSlug = getRecipeSlug(current);

    const scored = recipes
        .filter((recipe) => getRecipeSlug(recipe) !== currentSlug)
        .map((recipe) => {
            const shared = recipe.data.categories.filter((category) =>
                currentCategories.has(category),
            ).length;
            return { recipe, shared };
        })
        .sort((a, b) => {
            if (b.shared !== a.shared) return b.shared - a.shared;
            const aDate = getRecipeDate(a.recipe)?.getTime() ?? 0;
            const bDate = getRecipeDate(b.recipe)?.getTime() ?? 0;
            return bDate - aDate;
        });

    return scored.slice(0, limit).map((entry) => entry.recipe);
}

export function getStepImage(
    image: string | null | undefined,
): string | undefined {
    if (!image || !image.trim()) return undefined;
    return image;
}
