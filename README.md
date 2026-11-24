# Kook Recipes

A recipe blog built with Astro, Tailwind CSS and Keystatic. Recipes are plain
Markdown files in `src/content/recipes`, and all photography is referenced by
URL (Cloudinary-friendly) rather than committed to the repository.

## Live site

- Website: https://kook-recipes.vercel.app
- Repository: https://github.com/mimoUg/kook-recipes
- Editor: https://kook-recipes.vercel.app/keystatic

## Local development

```bash
npm install
npm run dev
```

- Site: http://localhost:4321
- Editor: http://localhost:4321/keystatic

In local development Keystatic reads and writes the Markdown files directly, so
no GitHub login is needed.

## Adding a recipe

1. Open http://localhost:4321/keystatic (or `/keystatic` on the live site).
2. Choose **Recipes → Add**.
3. Fill in the title, description, categories, timing and ingredients.
4. Paste a Cloudinary URL into **Cover image URL**, for example:
   `https://res.cloudinary.com/<cloud-name>/image/upload/v1234567890/recipe.jpg`
5. Write the introduction in **Article intro**. Use Markdown for headings,
   lists, links and bold text.
6. Add the method steps and any questions and answers.
7. Save.

Each recipe is stored as `src/content/recipes/<slug>.md`. The file name is the
URL slug. The **Article intro** becomes the Markdown body of the file.

Step images are optional. Paste a Cloudinary URL into a step's **Step image
URL** field.

## Site settings

**Site settings** in Keystatic controls the hero, about section, contact details
and footer. It is stored in `src/content/settings/index.json`.

The hero headline supports `*asterisks*` around one or two words to render them
in the italic serif style.

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import the repository in Vercel. Vercel detects Astro automatically.
3. Add the environment variables listed in `.env.example`:
   - `SITE_URL` — the production URL, e.g. `https://your-project.vercel.app`
   - `KEYSTATIC_REPO` — `owner/repository`
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET` — a long random string
   - `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
4. Deploy.

## GitHub App for the live editor

Keystatic's GitHub storage needs a GitHub App so editors can log in and commit
changes:

1. Go to **GitHub → Settings → Developer settings → GitHub Apps → New GitHub App**.
2. Set the callback URL to:
   `https://<your-vercel-domain>/api/keystatic/github/oauth/callback`
3. Give the app **Contents: Read and write** and **Metadata: Read-only**
   permissions.
4. Create the app, then install it on the recipe repository.
5. Copy the **Client ID**, generate a **Client secret**, and add them to Vercel
   as `KEYSTATIC_GITHUB_CLIENT_ID` and `KEYSTATIC_GITHUB_CLIENT_SECRET`.
6. Set `KEYSTATIC_SECRET` to a long random value (for example, the output of
   `openssl rand -hex 32`).
7. Set `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` to the app's URL slug (the last part of
   `https://github.com/apps/<slug>`).
8. Redeploy so the new environment variables are picked up.

Once that is done, open `/keystatic` on the live site, sign in with GitHub, and
saved changes are committed to the repository. Vercel's Git integration rebuilds
the site after each commit.

## Project structure

```
src/
  components/        Astro UI components
  content/
    recipes/         One Markdown file per recipe
    settings/        Site-wide settings (index.json)
  content.config.ts  Astro content collection schema
  layouts/           Page shell, header and footer
  lib/               Settings and recipe helpers
  pages/             Routes
  styles/            Tailwind and long-form content styles
keystatic.config.ts  Keystatic collections, fields and storage
```

## Commands

| Command           | Action                                      |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start the dev server at `localhost:4321`    |
| `npm run build`   | Type-check and build for production         |
| `npm run preview` | Preview the production build locally        |
