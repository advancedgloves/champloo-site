# champloo.ai

Production landing page with AI-powered lead qualification and Supabase lead capture.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in your keys
cp .env.local.example .env.local

# 3. Run the Supabase migration
#    Go to Supabase Dashboard → SQL Editor → paste supabase-migration.sql → Run

# 4. Start dev server
npm run dev
```

## Environment Variables

| Variable | Where to get it |
|---|---|
| `ANTHROPIC_API_KEY` | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API (reveal) |

## Deploy to Vercel

```bash
# Option A: Vercel CLI
npm i -g vercel
vercel

# Option B: Connect GitHub repo
# Push to GitHub → vercel.com → Import → Add env vars → Deploy
```

**Add all env vars in Vercel Dashboard → Settings → Environment Variables.**

## Architecture

```
app/
├── layout.js          # Root layout with SEO metadata + fonts
├── globals.css        # Minimal reset + custom scrollbar
├── page.js            # Landing page (client component)
└── api/
    └── assess/
        └── route.js   # POST: saves lead to Supabase + calls Claude
lib/
└── supabase.js        # Supabase service client
```

## How the AI Assessment Works

1. User clicks "Get Your AI Assessment" → modal opens
2. Guided conversation collects: name, email, industry, size, pain point
3. On final answer, frontend POSTs to `/api/assess`
4. API route saves lead to Supabase `leads` table
5. API route calls Claude Sonnet for personalized assessment
6. Assessment displayed in chat, lead stored in your pipeline

## Supabase Leads Table

Run `supabase-migration.sql` in the SQL Editor. Fields:

- `name`, `email`, `industry`, `company_size`, `pain_point`
- `source` (defaults to "ai_assessment")
- `status` (new → contacted → qualified → closed)
- `score` (manual, 0-100)
- `notes` (your notes)
- Row-level security: only service role can access

## Swapping Claude for Your Local LLM Later

When your local LLM is ready, edit `app/api/assess/route.js`:

```js
// Replace the Anthropic SDK call with your local endpoint
const resp = await fetch("http://your-local-server:11434/api/generate", {
  method: "POST",
  body: JSON.stringify({
    model: "your-fine-tuned-model",
    prompt: `...same prompt...`,
  }),
});
```

The frontend doesn't change at all — it only talks to `/api/assess`.

## DNS Setup

Point your domain to Vercel:
- A record: `76.76.21.21`
- Or CNAME: `cname.vercel-dns.com`

Vercel handles SSL automatically.
