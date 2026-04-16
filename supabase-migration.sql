-- ═══════════════════════════════════════════════════════════
-- champloo.ai — Leads Table
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),

  -- Lead data from AI assessment
  name          text not null,
  email         text not null,
  industry      text,
  company_size  text,
  pain_point    text,

  -- Pipeline management
  source        text default 'ai_assessment',   -- where lead came from
  status        text default 'new',              -- new | contacted | qualified | closed
  score         int,                              -- manual score 0-100 after review
  notes         text,                             -- your notes on the lead

  -- Timestamps
  contacted_at  timestamptz,
  qualified_at  timestamptz
);

-- Index for fast lookups
create index if not exists idx_leads_status on public.leads(status);
create index if not exists idx_leads_created on public.leads(created_at desc);
create index if not exists idx_leads_email on public.leads(email);

-- Row-level security: only service role can insert/read
alter table public.leads enable row level security;

-- Policy: service role has full access (API routes use service key)
-- No public access — leads are private
create policy "Service role full access"
  on public.leads
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- ═══════════════════════════════════════════════════════════
-- Optional: email notification on new lead
-- Uncomment if you set up a Supabase Edge Function or webhook
-- ═══════════════════════════════════════════════════════════
-- create or replace function notify_new_lead()
-- returns trigger as $$
-- begin
--   perform net.http_post(
--     url := 'https://champloo.ai/api/notify',
--     body := json_build_object(
--       'name', new.name,
--       'email', new.email,
--       'industry', new.industry,
--       'pain', new.pain_point
--     )::text,
--     headers := '{"Content-Type": "application/json"}'::jsonb
--   );
--   return new;
-- end;
-- $$ language plpgsql;
--
-- create trigger on_new_lead
--   after insert on public.leads
--   for each row execute function notify_new_lead();
