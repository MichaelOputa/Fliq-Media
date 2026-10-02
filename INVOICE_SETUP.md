# Staff invoice desk setup

The invoice desk is available at `/admin/invoices`. It is not linked from the public navigation. Staff must sign in and have a row in `public.invoice_staff`; only Supabase Edge Functions can create/read invoice records. The browser uses the public anon key only. Never put the Supabase service-role key or Resend API key in a `VITE_` variable.

## Supabase setup

1. Create or select the Supabase project for this site.
2. Install the Supabase CLI, sign in, and link this folder to the project. Use the project reference shown in the Supabase dashboard. The CLI may prompt for your database password; enter it directly in your terminal.

   ```sh
   npx supabase@latest login
   npx supabase@latest link --project-ref your-project-ref
   ```

3. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from the project API settings. `.env.local` is ignored by git.
4. Apply `supabase/migrations/202610020001_invoice_desk.sql` to the linked project:

   ```sh
   npx supabase@latest db push
   ```

   The sequence starts at `FLIQ 0443`, following the supplied invoice `FLIQ 0442`.
5. Create a staff account in Supabase Authentication. Then grant that user invoice access in the SQL editor, replacing the email with the exact staff email:

   ```sql
   insert into public.invoice_staff (user_id)
   select id from auth.users where email = 'staff@example.com'
   on conflict (user_id) do nothing;
   ```

6. Verify a sending domain in Resend and configure the Edge Function secrets on the linked Supabase project:

   ```sh
   npx supabase@latest secrets set RESEND_API_KEY=re_... INVOICE_FROM_EMAIL="FliQ Media <invoices@your-verified-domain.com>"
   ```

7. Deploy both JWT-protected functions:

   ```sh
   npx supabase@latest functions deploy create-invoice
   npx supabase@latest functions deploy email-invoice
   ```

8. Restart the Vite dev server after changing `.env.local`, then sign in at `/admin/invoices` with the staff account.

Hosted linking, migrations, secrets, and function deployment do not require Docker. Docker Desktop or Podman is only needed to run Supabase services locally with `supabase start` or inspect them with `supabase status`.

## Issuing an invoice

Use the form only after the project scope and quote have been approved. Enter the client's billing details, project description, invoice date, and agreed total. The invoice number is allocated by Postgres to avoid collisions. The browser downloads a branded PDF and sends the same PDF to the client's email through the protected Edge Function. The invoice records delivery status; if email fails, the page retains a retry action and the PDF remains downloadable.

The invoice includes the supplied business address, contact details, tax identity number, First Bank details, and the 70% upfront / 30% upon completion terms. Consultation bookings are not automatically invoiced.
