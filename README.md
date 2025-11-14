## Overview

This project is a simplified streaming dashboard built with Next.js 14, TypeScript, and Tailwind. It fetches movie data from the TMDB API and displays a hero banner, multiple horizontal movie rows, and a detail page for each movie. The app is deployed on Vercel.

## Features

=> Next.js 14 App Router

=> Server-side fetching

=> Hero banner

=> Reusable movie rows with horizontal scroll

=> Dynamic movie detail pages

=> Fully responsive layout

=> Tailwind-based UI

=> Vercel deployment with environment variables

## Tech Stack

=> Next.js 14

=> TypeScript

=> Tailwind CSS

=> TMDB API

=> Vercel

## Getting Started
```bash
1. Clone the repo
git clone https://github.com/sumanredd/stream
cd stream

2. Install dependencies
npm install
# or
pnpm install
# or
yarn install

3. Add environment variables

Create a .env.local file:

TMDB_API_KEY=your_tmdb_api_key


Do not commit this file.

4. Run the project
npm run dev
```

App runs at **http://localhost:3000**.

## Deployment

This project is deployed on Vercel.

To deploy your own version:

Push to GitHub

Import the repo in Vercel

Add TMDB_API_KEY in Project Settings → Environment Variables

Trigger a deployment

## Project Structure
```bash 
  app/
  layout.tsx
  page.tsx
  movie/[id]/page.tsx
  components/
    Header.tsx
    HeroBanner.tsx
    MovieRow.tsx
    MovieCard.tsx
types/
  movie.ts
lib/
  tmdb.ts
```
## Scripts
```bash
dev – start development server

build – build for production

start – run production build
```
## AI Usage
See AI_Report.md in the repository for details.