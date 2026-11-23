import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        coverImage: z.url(),
        coverAlt: z.string().optional().default(''),
        categories: z.array(z.string()).default([]),
        totalTime: z.string().optional().default(''),
        servings: z.number().int().positive().optional().default(4),
        difficulty: z.string().optional().default('Easy'),
        popular: z.boolean().optional().default(false),
        publishedDate: z.coerce.date().nullable().optional(),
        ingredients: z.array(z.string()).default([]),
        steps: z
            .array(
                z.object({
                    title: z.string(),
                    description: z.string(),
                    image: z.string().nullable().optional(),
                }),
            )
            .default([]),
        faq: z
            .array(
                z.object({
                    question: z.string(),
                    answer: z.string(),
                }),
            )
            .default([]),
    }),
});

export const collections = { recipes };
