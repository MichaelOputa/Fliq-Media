import { authorizeInvoiceStaff, corsHeaders, jsonResponse } from '../_shared/auth.ts';

const requiredText = (value: unknown, maximumLength: number) =>
  typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maximumLength;

Deno.serve(async (request: Request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed.' }, 405);

  const authorization = await authorizeInvoiceStaff(request);
  if ('error' in authorization) return authorization.error;

  try {
    const body = await request.json();
    const email = typeof body.clientEmail === 'string' ? body.clientEmail.trim() : '';
    const amount = Number(body.amount);
    const date = typeof body.invoiceDate === 'string' ? body.invoiceDate : '';
    const validDate = /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(`${date}T00:00:00Z`));

    if (
      !requiredText(body.clientName, 120) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !requiredText(body.clientAddress, 240) ||
      (body.clientPhone !== undefined && typeof body.clientPhone !== 'string') ||
      !requiredText(body.projectName, 100) ||
      !requiredText(body.description, 250) ||
      !Number.isFinite(amount) || amount <= 0 || amount > 9999999999.99 ||
      !validDate
    ) {
      return jsonResponse({ error: 'Check the invoice details and try again.' }, 400);
    }

    const { data, error } = await authorization.client.rpc('issue_invoice', {
      p_created_by: authorization.user.id,
      p_client_name: body.clientName.trim(),
      p_client_email: email,
      p_client_phone: typeof body.clientPhone === 'string' ? body.clientPhone.trim().slice(0, 80) : '',
      p_client_address: body.clientAddress.trim(),
      p_project_name: body.projectName.trim(),
      p_description: body.description.trim(),
      p_amount: amount,
      p_invoice_date: date,
    });

    if (error) {
      console.error('Invoice record creation failed:', error.message);
      return jsonResponse({ error: 'Could not create the invoice record.' }, 500);
    }

    const invoice = Array.isArray(data) ? data[0] : data;
    if (!invoice?.invoice_id || !invoice?.invoice_number) {
      return jsonResponse({ error: 'Could not create the invoice record.' }, 500);
    }

    return jsonResponse({ invoiceId: invoice.invoice_id, invoiceNumber: invoice.invoice_number, clientEmail: email });
  } catch (error) {
    console.error('Invoice creation request failed:', error);
    return jsonResponse({ error: 'Could not create the invoice.' }, 500);
  }
});
