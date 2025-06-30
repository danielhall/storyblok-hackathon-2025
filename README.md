# Storyblok Information Architecture Dashboard

This project is a live Information Architecture (IA) dashboard and diagram for any given Storyblok space. It visualises your content structure, folders, and relationships in real time, providing a clear, interactive map of your Storyblok space.

## Storyblok Hackathon 2025
Created by Daniel Hall and Ben Haynes for the Storyblok Hackathon 2025.

## Getting Started

### 1. Set Environment Variables

Before running the project, you must set the following environment variables in a `.env` file at the root of the project:

- `NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN`: Your Storyblok preview API token (for reading draft content)
- `STORYBLOK_SPACE_ID`: Your Storyblok space ID (numeric)
- `STORYBLOK_PAT`: Your Storyblok Personal Access Token (for management API requests)

Example `.env`:

```
NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN=your_preview_token_here
STORYBLOK_SPACE_ID=123456
STORYBLOK_PAT=your_personal_access_token_here
```

### 2. Point the Dashboard to Your Storyblok Space

When you visit the homepage, enter your Storyblok Preview Token and Space ID in the form. The dashboard will then visualise the IA for your space.

## Running the Project

Install dependencies and start the development server:

```
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---
This project is not affiliated with Storyblok. Built for the 2025 Hackathon by Daniel Hall and Ben Haynes.

## Project Structure

```
src/
  app/                  # Next.js app directory (entry, layout, pages, dashboard)
  components/           # React components (including dashboard visualisation components)
  lib/
    services/           # Service classes for Storyblok data, IA orchestration, and components
    storyblok.ts        # Storyblok API and component registration
    utils/              # Utility functions (e.g. string formatting)
    storyblok/
      types/            # Generated Storyblok component types
      ...               # Storyblok-related helpers and config
public/                 # Static assets (SVGs, images, etc.)
```

## Storyblok Integration

- Components are registered in `src/lib/storyblok.ts`.
- Types for Storyblok blocks are generated in `src/lib/storyblok/types/storyblok-components.d.ts`.
- The `StoryblokProvider` initialises the API and enables the Visual Editor.

## Scripts

- `pnpm dev` – Start development server
- `pnpm build` – Build for production
- `pnpm start` – Start production server
- `pnpm lint` – Lint code

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Storyblok Documentation](https://www.storyblok.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Note:** Keep your API tokens secure and do not commit sensitive credentials to version control.
