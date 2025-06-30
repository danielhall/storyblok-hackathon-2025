# Storyblok Next.js Starter Kit

A modern starter kit for building content-driven websites with [Next.js](https://nextjs.org/) and [Storyblok](https://www.storyblok.com/).

## Features

- Next.js 15 App Router
- Storyblok Visual Editor integration
- TypeScript support
- Dynamic component rendering from Storyblok
- Tailwind CSS (via PostCSS)
- Environment-based configuration

## Getting Started

### 1. Install Dependencies

```sh
pnpm install
# or
yarn install
# or
npm install
```

### 2. Configure Environment Variables

Copy `.env` or `.env.local` and set your Storyblok API credentials:

```
NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN=your_preview_token
STORYBLOK_SPACE_ID=your_space_id
```

You can find your API token and space ID in your Storyblok space settings.

### 3. Run the Development Server

```sh
pnpm dev
# or
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
  app/                # Next.js app directory (entry, layout, pages)
  components/         # React components mapped to Storyblok blocks
  lib/
    storyblok.ts      # Storyblok API and component registration
    types/            # Generated Storyblok component types
public/               # Static assets
```

## Storyblok Integration

- Components are registered in `src/lib/storyblok.ts`.
- Types for Storyblok blocks are generated in `src/lib/storyblok/types/storyblok-components.d.ts`.
- The `StoryblokProvider` initializes the API and enables the Visual Editor.

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
