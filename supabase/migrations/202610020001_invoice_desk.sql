create sequence if not exists public.invoice_number_seq start with 443;

create table if not exists public.invoice_staff (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.invoice_staff enable row level security;
revoke all on table public.invoice_staff from anon, authenticated;
grant select on table public.invoice_staff to authenticated;

drop policy if exists "Staff can verify their own membership" on public.invoice_staff;
create policy "Staff can verify their own membership"
  on public.invoice_staff
  for select
  to authenticated
  using (user_id = auth.uid());

create table if not exists public.invoice_records (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  created_by uuid not null references auth.users (id),
  client_name text not null,
  client_email text not null,
  client_phone text not null default '',
  client_address text not null,
  project_name text not null,
  description text not null,
  amount numeric(12, 2) not null check (amount > 0),
  invoice_date date not null,
  email_status text not null default 'pending' check (email_status in ('pending', 'sent', 'failed')),
  email_sent_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.invoice_records enable row level security;
revoke all on table public.invoice_records from anon, authenticated;
grant all on table public.invoice_records to service_role;

drop function if exists public.issue_invoice(uuid, text, text, text, text, text, text, numeric, date);
create function public.issue_invoice(
  p_created_by uuid,
  p_client_name text,
  p_client_email text,
  p_client_phone text,
  p_client_address text,
  p_project_name text,
  p_description text,
  p_amount numeric,
  p_invoice_date date
)
returns table (invoice_id uuid, invoice_number text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid := gen_random_uuid();
  v_number text := 'FLIQ ' || lpad(nextval('public.invoice_number_seq')::text, 4, '0');
begin
  insert into public.invoice_records (
    id, invoice_number, created_by, client_name, client_email, client_phone,
    client_address, project_name, description, amount, invoice_date
  ) values (
    v_id, v_number, p_created_by, p_client_name, p_client_email, p_client_phone,
    p_client_address, p_project_name, p_description, p_amount, p_invoice_date
  );

  return query select v_id, v_number;
end;
$$;

revoke all on function public.issue_invoice(uuid, text, text, text, text, text, text, numeric, date) from public, anon, authenticated;
grant execute on function public.issue_invoice(uuid, text, text, text, text, text, text, numeric, date) to service_role;
