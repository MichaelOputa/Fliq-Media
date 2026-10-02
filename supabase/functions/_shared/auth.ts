import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

export async function authorizeInvoiceStaff(request: Request) {
  const authorization = request.headers.get('Authorization');
  const token = authorization?.replace(/^Bearer\s+/i, '');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!token || !supabaseUrl || !serviceKey) {
    return { error: jsonResponse({ error: 'Invoice service is not configured.' }, 401) };
  }

  const client = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: { user }, error: userError } = await client.auth.getUser(token);
  if (userError || !user) {
    return { error: jsonResponse({ error: 'Please sign in again.' }, 401) };
  }

  const { data: staff, error: staffError } = await client
    .from('invoice_staff')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (staffError || !staff) {
    return { error: jsonResponse({ error: 'This account is not authorized to issue invoices.' }, 403) };
  }

  return { client, user };
}
