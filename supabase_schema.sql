-- Create the waitlist table
create table public.waitlist (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text not null,
  email text not null,
  website text,
  revenue_range text,
  bottleneck text,
  whatsapp text,
  status text default 'new'::text
);

-- Set up Row Level Security (RLS)
-- Enable RLS
alter table public.waitlist enable row level security;

-- Allow public to insert (Apply form)
create policy "Allow public inserts"
on public.waitlist
for insert
to public
with check (true);

-- Allow authorized service/readers to view (Dashboard)
-- For simplicity in this demo, we can allow public read if we don't have Auth setup, 
-- BUT for security we usually restrict this. 
-- Since the developer dashboard is behind a hardcoded login, the CLIENT (browser) checks the cookie.
-- But Supabase needs a policy.
-- OPTION 1: Allow public read (easiest for demo, simpler than configuring Auth users)
create policy "Allow public read"
on public.waitlist
for select
to public
using (true);

-- OPTION 2: If we wanted proper auth, we'd need Supabase Auth.
-- Sticking to public read for now to ensure the Dashboard works immediately with the simple hardcoded login.
