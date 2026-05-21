# filiphajek-cv

Personal CV site for Filip Hájek with an AI chat assistant that answers questions about experience, skills, and background.

Built with Next.js, React, and the [Vercel AI SDK](https://sdk.vercel.ai/).

## Setup

```bash
pnpm install
cp .env.example .env.local
```

Add your [Vercel AI Gateway](https://vercel.com/ai-gateway) API key to `.env.local`:

```
AI_GATEWAY_API_KEY=
```

## Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description          |
| ------------- | -------------------- |
| `pnpm dev`    | Start dev server     |
| `pnpm build`  | Production build     |
| `pnpm start`  | Run production build |
| `pnpm lint`   | Run ESLint           |
