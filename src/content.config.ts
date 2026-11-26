import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
    schema: z.object({
        title: z.string().optional().default('Untitled recipe'),
        description: z.string().optional().default(''),
        coverImage: z.string().optional().default(''),
        coverAlt: z.string().optional().default(''),
        categories: z.array(z.string()).default([]),
        totalTime: z.string().optional().default(''),
        servings: z.number().int().positive().optional(),
        difficulty: z.string().optional().default(''),
        popular: z.boolean().optional().default(false),
        published: z.boolean().optional().default(true),
        publishedDate: z.coerce.date().nullable().optional(),
        ingredients: z.array(z.string()).default([]),
        steps: z
            .array(
                z.object({
                    title: z.string().optional().default(''),
                    description: z.string().optional().default(''),
                    image: z.string().nullable().optional(),
                }),
            )
            .default([]),
        faq: z
            .array(
                z.object({
                    question: z.string().optional().default(''),
                    answer: z.string().optional().default(''),
                }),
            )
            .default([]),
    }),
});

export const collections = { recipes };
