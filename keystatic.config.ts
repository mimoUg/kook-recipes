import { collection, config, fields, singleton } from '@keystatic/core';
import siteSettings from './src/content/settings/index.json';

/**
 * In production the admin UI commits Markdown files to GitHub.
 * Locally `npm run dev` uses Keystatic's local mode so you can edit files
 * without setting up OAuth.
 */
const repoString =
    (typeof process !== 'undefined' && process.env.KEYSTATIC_REPO) ||
    (import.meta.env.KEYSTATIC_REPO as string | undefined) ||
    'mimoUg/kook-recipes';

const repo = repoString.trim() as `${string}/${string}`;

export default config({
    storage: import.meta.env.PROD
        ? {
              kind: 'github',
              repo,
          }
        : {
              kind: 'local',
          },
    ui: {
        brand: {
            name: siteSettings.siteTitle || 'Kook Recipes',
        },
    },
    collections: {
        recipes: collection({
            label: 'Recipes',
            slugField: 'title',
            path: 'src/content/recipes/*',
            columns: ['title', 'published', 'publishedDate'],
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({
                    name: {
                        label: 'Recipe title',
                        description: 'The name shown on the card and page.',
                    },
                    slug: {
                        label: 'URL slug',
                        description:
                            'Used in the web address, e.g. /recipes/creamy-garlic-pasta',
                    },
                }),
                description: fields.text({
                    label: 'Short description',
                    description: 'One or two sentences shown on recipe cards.',
                    multiline: true,
                }),
                coverImage: fields.url({
                    label: 'Cover image URL (Cloudinary)',
                    description:
                        'Paste the full Cloudinary image URL, e.g. https://res.cloudinary.com/.../image/upload/...',
                }),
                coverAlt: fields.text({
                    label: 'Cover image alt text',
                    description: 'Describe the photo for accessibility and SEO.',
                }),
                categories: fields.array(fields.text({ label: 'Category' }), {
                    label: 'Categories',
                    description: 'Examples: Dinner, Vegetarian, Pasta',
                    itemLabel: (props) => props.value || 'New category',
                }),
                section: fields.select({
                    label: 'Section',
                    description:
                        'Which part of the blog this recipe belongs to.',
                    options: [
                        {
                            label: 'Leftover Chicken',
                            value: 'leftover-chicken',
                        },
                        { label: 'Eggplant', value: 'eggplant' },
                    ],
                    defaultValue: 'leftover-chicken',
                }),
                totalTime: fields.text({
                    label: 'Total time',
                    description: 'Example: 45 min',
                }),
                servings: fields.integer({
                    label: 'Servings',
                    validation: { min: 1 },
                }),
                difficulty: fields.select({
                    label: 'Difficulty',
                    options: [
                        { label: 'Not specified', value: '' },
                        { label: 'Easy', value: 'Easy' },
                        { label: 'Medium', value: 'Medium' },
                        { label: 'Advanced', value: 'Advanced' },
                    ],
                    defaultValue: '',
                }),
                popular: fields.checkbox({
                    label: 'Popular recipe',
                    description: 'Popular recipes appear in the Popular filter.',
                    defaultValue: false,
                }),
                published: fields.checkbox({
                    label: 'Published',
                    description:
                        'Turn off to hide this recipe from the website without deleting it.',
                    defaultValue: true,
                }),
                publishedDate: fields.date({
                    label: 'Published date',
                }),
                ingredients: fields.array(
                    fields.text({ label: 'Ingredient' }),
                    {
                        label: 'Ingredients',
                        description:
                            'Add one ingredient per row, including the amount.',
                        itemLabel: (props) => props.value || 'New ingredient',
                    },
                ),
                steps: fields.array(
                    fields.object({
                        title: fields.text({
                            label: 'Step title',
                        }),
                        description: fields.text({
                            label: 'Step instructions',
                            multiline: true,
                        }),
                        image: fields.url({
                            label: 'Step image URL (optional, Cloudinary)',
                        }),
                    }),
                    {
                        label: 'Method steps',
                        itemLabel: (props) =>
                            props.fields.title.value || 'New step',
                    },
                ),
                faq: fields.array(
                    fields.object({
                        question: fields.text({
                            label: 'Question',
                        }),
                        answer: fields.text({
                            label: 'Answer',
                            multiline: true,
                        }),
                    }),
                    {
                        label: 'Questions & answers',
                        itemLabel: (props) =>
                            props.fields.question.value || 'New question',
                    },
                ),
                content: fields.markdoc({
                    label: 'Article intro',
                    description:
                        'The story or introduction shown under the recipe title. Use Markdown for headings, lists, links and bold text.',
                    extension: 'md',
                    options: {
                        image: false,
                        table: true,
                    },
                }),
            },
        }),
    },
    singletons: {
        settings: singleton({
            label: 'Site settings',
            path: 'src/content/settings/',
            format: { data: 'json' },
            schema: {
                siteTitle: fields.text({
                    label: 'Site title',
                    defaultValue: 'Flavour Fushion',
                    validation: { isRequired: true },
                }),
                siteDescription: fields.text({
                    label: 'Site description',
                    multiline: true,
                    defaultValue:
                        'A collection of favourite recipes, made simple.',
                }),
                hero: fields.object(
                    {
                        headline: fields.text({
                            label: 'Headline',
                            description:
                                'Wrap a word in *asterisks* to render it in the italic serif style.',
                            defaultValue:
                                'Discover the best *recipes* from our collection',
                            validation: { isRequired: true },
                        }),
                        description: fields.text({
                            label: 'Subheading',
                            multiline: true,
                            defaultValue:
                                'Find your desired recipes from our maestro',
                        }),
                        image: fields.url({
                            label: 'Background image URL (Cloudinary)',
                            validation: { isRequired: true },
                        }),
                        buttonLabel: fields.text({
                            label: 'Button label',
                            defaultValue: 'Browse recipes',
                        }),
                    },
                    { label: 'Home hero' },
                ),
                about: fields.object(
                    {
                        title: fields.text({
                            label: 'Title',
                            defaultValue: 'About us',
                        }),
                        description: fields.text({
                            label: 'Description',
                            multiline: true,
                            defaultValue:
                                'We believe that food brings people together and that cooking can be both fun and rewarding.',
                        }),
                        image: fields.url({
                            label: 'Background image URL (Cloudinary)',
                        }),
                        stats: fields.array(
                            fields.object({
                                value: fields.text({ label: 'Value' }),
                                label: fields.text({ label: 'Label' }),
                            }),
                            {
                                label: 'Stats',
                                itemLabel: (props) =>
                                    `${props.fields.value.value || ''} ${
                                        props.fields.label.value || ''
                                    }`.trim() || 'New stat',
                            },
                        ),
                    },
                    { label: 'About section' },
                ),
                contact: fields.object(
                    {
                        title: fields.text({
                            label: 'Title',
                            defaultValue: "Let's talk",
                        }),
                        description: fields.text({
                            label: 'Description',
                            multiline: true,
                            defaultValue:
                                'Have a recipe request or a question? Send us a message and we will get back to you.',
                        }),
                        phone: fields.text({
                            label: 'Phone',
                            defaultValue: '(+1) 812 91831',
                        }),
                        email: fields.text({
                            label: 'Email',
                            defaultValue: 'hello@flavourfushion.com',
                        }),
                    },
                    { label: 'Contact section' },
                ),
                footer: fields.object(
                    {
                        description: fields.text({
                            label: 'Footer description',
                            multiline: true,
                            defaultValue:
                                'A little corner of the internet for recipes worth cooking again.',
                        }),
                        columns: fields.array(
                            fields.object({
                                title: fields.text({ label: 'Column title' }),
                                links: fields.array(
                                    fields.object({
                                        label: fields.text({
                                            label: 'Link label',
                                        }),
                                        href: fields.text({
                                            label: 'Link URL',
                                            description:
                                                'Use /recipes, /#about, /legal#privacy, etc.',
                                        }),
                                    }),
                                    {
                                        label: 'Links',
                                        itemLabel: (props) =>
                                            props.fields.label.value ||
                                            'New link',
                                    },
                                ),
                            }),
                            {
                                label: 'Footer columns',
                                itemLabel: (props) =>
                                    props.fields.title.value || 'New column',
                            },
                        ),
                    },
                    { label: 'Footer' },
                ),
            },
        }),
    },
});
