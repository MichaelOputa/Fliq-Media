import { FormEvent, useEffect, useState } from 'react';
import { Check, Download, FileText, LogOut, Mail, RotateCw } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { createInvoicePdf } from '@/invoicePdf';
import { supabase } from '@/supabaseClient';

type InvoiceDraft = {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  projectName: string;
  description: string;
  amount: string;
  invoiceDate: string;
};

type IssuedInvoice = {
  invoiceId: string;
  invoiceNumber: string;
  clientEmail: string;
  pdfBase64: string;
  filename: string;
  emailStatus: 'sending' | 'sent' | 'failed';
  emailError?: string;
};

function newInvoiceDraft(): InvoiceDraft {
  const today = new Date();
  return {
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    projectName: '',
    description: '',
    amount: '',
    invoiceDate: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
  };
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
}

function downloadPdf(pdfBase64: string, filename: string) {
  const bytes = Uint8Array.from(atob(pdfBase64), (character) => character.charCodeAt(0));
  const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Could not prepare the PDF for email.'));
        return;
      }
      resolve(reader.result.split(',')[1] ?? '');
    };
    reader.onerror = () => reject(new Error('Could not prepare the PDF for email.'));
    reader.readAsDataURL(blob);
  });
}

export function InvoiceAdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [staffState, setStaffState] = useState<'checking' | 'staff' | 'denied' | 'error'>('checking');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [draft, setDraft] = useState<InvoiceDraft>(newInvoiceDraft);
  const [issued, setIssued] = useState<IssuedInvoice | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return;
    }
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSession(data.session);
    }).finally(() => {
      if (active) setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session || !supabase) {
      setStaffState('checking');
      return;
    }
    let active = true;
    setStaffState('checking');
    supabase.from('invoice_staff').select('user_id').eq('user_id', session.user.id).maybeSingle().then(({ data, error }) => {
      if (active) setStaffState(error ? 'error' : data ? 'staff' : 'denied');
    });
    return () => {
      active = false;
    };
  }, [session]);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setFormError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setFormError(error.message);
    setBusy(false);
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setIssued(null);
    setNotice('');
  };

  const sendInvoiceEmail = async (invoice: IssuedInvoice) => {
    if (!supabase) return;
    setIssued({ ...invoice, emailStatus: 'sending', emailError: undefined });
    const { error } = await supabase.functions.invoke('email-invoice', {
      body: { invoiceId: invoice.invoiceId, pdfBase64: invoice.pdfBase64 },
    });
    if (error) {
      setIssued({ ...invoice, emailStatus: 'failed', emailError: error.message });
      setNotice('PDF downloaded. Email delivery failed; retry below.');
      return;
    }
    setIssued({ ...invoice, emailStatus: 'sent', emailError: undefined });
    setNotice(`Invoice emailed to ${invoice.clientEmail}.`);
  };

  const handleIssueInvoice = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setNotice('');
    setFormError('');
    try {
      const payload = { ...draft, amount: Number(draft.amount) };
      const { data, error } = await supabase.functions.invoke('create-invoice', { body: payload });
      if (error) throw error;
      if (!data?.invoiceId || !data?.invoiceNumber) throw new Error('The invoice service returned incomplete invoice details.');

      const pdf = createInvoicePdf({ ...payload, invoiceNumber: data.invoiceNumber });
      const blob = pdf.output('blob');
      const pdfBase64 = await blobToBase64(blob);
      const filename = `${String(data.invoiceNumber).replace(/\s+/g, '-')}.pdf`;
      const invoice: IssuedInvoice = {
        invoiceId: data.invoiceId,
        invoiceNumber: data.invoiceNumber,
        clientEmail: data.clientEmail,
        pdfBase64,
        filename,
        emailStatus: 'sending',
      };
      downloadPdf(pdfBase64, filename);
      setIssued(invoice);
      setDraft(newInvoiceDraft());
      setNotice(`Invoice ${data.invoiceNumber} created and downloaded. Sending the client email…`);
      await sendInvoiceEmail(invoice);
    } catch (error) {
      setFormError(errorMessage(error));
    } finally {
      setBusy(false);
    }
  };

  const updateDraft = (field: keyof InvoiceDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  return (
    <section className="invoice-admin">
      <div className="content-width invoice-admin-inner">
        <header className="invoice-admin-heading">
          <div>
            <p className="eyebrow">FliQ Media / Staff tools</p>
            <h1>Invoice <em>desk.</em></h1>
            <p>Create invoices after a project quote has been approved. Consultation requests are not invoiced.</p>
          </div>
          {session && <button className="invoice-signout" type="button" onClick={handleSignOut}><LogOut size={15} /> Sign out</button>}
        </header>

        {!supabase ? (
          <div className="invoice-admin-panel"><h2>Setup required</h2><p>Configure the Supabase URL and anon key in the local environment before signing in.</p></div>
        ) : authLoading || (session && staffState === 'checking') ? (
          <div className="invoice-admin-panel" role="status">Checking staff access…</div>
        ) : !session ? (
          <div className="invoice-admin-panel invoice-auth-panel">
            <p className="eyebrow">Staff access</p>
            <h2>Sign in to issue invoices.</h2>
            <form className="invoice-form invoice-signin-form" onSubmit={handleSignIn}>
              <label>Email address<input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
              <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
              {formError && <p className="invoice-error" role="alert">{formError}</p>}
              <button className="button button-dark" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
            </form>
          </div>
        ) : staffState !== 'staff' ? (
          <div className="invoice-admin-panel">
            <h2>{staffState === 'error' ? 'Could not verify staff access.' : 'This account is not authorized.'}</h2>
            <p>Ask an administrator to add your Supabase user to the invoice staff list.</p>
          </div>
        ) : (
          <>
            <div className="invoice-admin-panel">
              <div className="invoice-panel-heading"><div><p className="eyebrow">New invoice / Approved quote</p><h2>Client and project details</h2></div><FileText size={22} /></div>
              <form className="invoice-form" onSubmit={handleIssueInvoice}>
                <div className="invoice-form-grid">
                  <label>Client name<input required maxLength={120} autoComplete="name" value={draft.clientName} onChange={(event) => updateDraft('clientName', event.target.value)} /></label>
                  <label>Client email<input type="email" required maxLength={254} autoComplete="email" value={draft.clientEmail} onChange={(event) => updateDraft('clientEmail', event.target.value)} /></label>
                  <label>Phone number<input type="tel" maxLength={80} autoComplete="tel" value={draft.clientPhone} onChange={(event) => updateDraft('clientPhone', event.target.value)} /></label>
                  <label>Invoice date<input type="date" required value={draft.invoiceDate} onChange={(event) => updateDraft('invoiceDate', event.target.value)} /></label>
                  <label className="invoice-form-wide">Billing address<textarea rows={2} required maxLength={240} value={draft.clientAddress} onChange={(event) => updateDraft('clientAddress', event.target.value)} /></label>
                  <label>Project / event<input required maxLength={100} value={draft.projectName} onChange={(event) => updateDraft('projectName', event.target.value)} /></label>
                  <label>Approved total (NGN)<input type="number" min="0.01" max="9999999999.99" step="0.01" required value={draft.amount} onChange={(event) => updateDraft('amount', event.target.value)} /></label>
                  <label className="invoice-form-wide">Description<textarea rows={3} required maxLength={250} value={draft.description} onChange={(event) => updateDraft('description', event.target.value)} /></label>
                </div>
                <div className="invoice-terms-note"><strong>Payment terms:</strong> 70% upfront and 30% upon completion. The invoice includes FliQ Media’s bank and business details.</div>
                {formError && <p className="invoice-error" role="alert">{formError}</p>}
                <button className="button button-dark" type="submit" disabled={busy}>{busy ? 'Creating and sending…' : <><FileText size={15} /> Create, download & email invoice</>}</button>
              </form>
            </div>

            {issued && (
              <div className="invoice-result" role="status">
                <div className="invoice-result-icon">{issued.emailStatus === 'sent' ? <Check size={19} /> : issued.emailStatus === 'sending' ? <Mail size={19} /> : <FileText size={19} />}</div>
                <div className="invoice-result-copy">
                  <strong>{issued.invoiceNumber}</strong>
                  <span>{issued.emailStatus === 'sent' ? 'PDF downloaded and emailed to the client.' : issued.emailStatus === 'sending' ? 'PDF downloaded; sending email…' : 'PDF downloaded; email needs retry.'}</span>
                  {issued.emailError && <span className="invoice-error">{issued.emailError}</span>}
                </div>
                <div className="invoice-result-actions">
                  <button className="invoice-icon-button" type="button" onClick={() => downloadPdf(issued.pdfBase64, issued.filename)} aria-label="Download invoice PDF" title="Download PDF"><Download size={17} /></button>
                  {issued.emailStatus === 'failed' && <button className="invoice-icon-button" type="button" onClick={() => void sendInvoiceEmail(issued)} aria-label="Retry invoice email" title="Retry email"><RotateCw size={17} /></button>}
                </div>
              </div>
            )}
            {notice && <p className="invoice-notice" role="status">{notice}</p>}
          </>
        )}
      </div>
    </section>
  );
}
