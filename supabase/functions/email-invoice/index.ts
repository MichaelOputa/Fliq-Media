import { authorizeInvoiceStaff, corsHeaders, jsonResponse } from '../_shared/auth.ts';

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character] ?? character);
}

Deno.serve(async (request: Request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed.' }, 405);

  const authorization = await authorizeInvoiceStaff(request);
  if ('error' in authorization) return authorization.error;

  try {
    const body = await request.json();
    const invoiceId = typeof body.invoiceId === 'string' ? body.invoiceId : '';
    const pdfBase64 = typeof body.pdfBase64 === 'string' ? body.pdfBase64 : '';
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const from = Deno.env.get('INVOICE_FROM_EMAIL');

    if (!/^[0-9a-f-]{36}$/i.test(invoiceId) || pdfBase64.length < 100 || pdfBase64.length > 8_000_000) {
      return jsonResponse({ error: 'Invalid invoice email request.' }, 400);
    }
    if (!resendApiKey || !from) {
      return jsonResponse({ error: 'Email delivery is not configured. The invoice PDF is still available to download.' }, 503);
    }

    const { data: invoice, error: invoiceError } = await authorization.client
      .from('invoice_records')
      .select('invoice_number, client_name, client_email, project_name, amount')
      .eq('id', invoiceId)
      .maybeSingle();

    if (invoiceError || !invoice) return jsonResponse({ error: 'Invoice record not found.' }, 404);

    let pdfBytes: Uint8Array;
    try {
      pdfBytes = Uint8Array.from(atob(pdfBase64), (character) => character.charCodeAt(0));
    } catch {
      return jsonResponse({ error: 'Invoice PDF attachment is invalid.' }, 400);
    }
    if (new TextDecoder().decode(pdfBytes.slice(0, 5)) !== '%PDF-') {
      return jsonResponse({ error: 'Invoice PDF attachment is invalid.' }, 400);
    }

    const clientName = escapeHtml(invoice.client_name);
    const invoiceNumber = escapeHtml(invoice.invoice_number);
    const projectName = escapeHtml(invoice.project_name);
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [invoice.client_email],
        subject: `FliQ Media invoice ${invoice.invoice_number}`,
        html: `<p>Hello ${clientName},</p><p>Please find attached invoice <strong>${invoiceNumber}</strong> for ${projectName}.</p><p>Payment terms: 70% upfront and 30% upon completion.</p><p>Thank you,<br>FliQ Media</p>`,
        attachments: [{ filename: `${invoice.invoice_number.replace(/\s+/g, '-')}.pdf`, content: pdfBase64 }],
      }),
    });

    if (!response.ok) {
      const { error: updateError } = await authorization.client
        .from('invoice_records')
        .update({ email_status: 'failed' })
        .eq('id', invoiceId);
      if (updateError) console.error('Could not update invoice email status:', updateError.message);
      console.error('Invoice email provider returned status:', response.status);
      return jsonResponse({ error: 'Email could not be delivered. Download the PDF or retry email delivery.' }, 502);
    }

    const { error: updateError } = await authorization.client
      .from('invoice_records')
      .update({ email_status: 'sent', email_sent_at: new Date().toISOString() })
      .eq('id', invoiceId);
    if (updateError) console.error('Could not update invoice email status:', updateError.message);

    return jsonResponse({ sent: true, email: invoice.client_email });
  } catch (error) {
    console.error('Invoice email request failed:', error);
    return jsonResponse({ error: 'Email could not be delivered. Download the PDF or retry email delivery.' }, 500);
  }
});
