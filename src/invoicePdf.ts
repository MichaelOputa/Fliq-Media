import { jsPDF } from 'jspdf';

export type InvoicePdfData = {
  invoiceNumber: string;
  invoiceDate: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  projectName: string;
  description: string;
  amount: number;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${value}T00:00:00`));
}

function formatAmount(value: number) {
  return `NGN ${new Intl.NumberFormat('en-NG', { maximumFractionDigits: 2 }).format(value)}`;
}

export function createInvoicePdf(invoice: InvoicePdfData) {
  const document = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageHeight = 297;
  const panelWidth = 58;
  const contentLeft = 70;
  const contentRight = 198;

  document.setFillColor(103, 65, 48);
  document.rect(0, 0, panelWidth, pageHeight, 'F');
  document.setTextColor(255, 255, 255);
  document.setFont('helvetica', 'bold');
  document.setFontSize(20);
  document.text('FliQ Media', 11, 28);
  document.setFont('helvetica', 'normal');
  document.setFontSize(8);
  document.text('PHOTOGRAPHY', 11, 35);

  document.setDrawColor(255, 255, 255);
  document.setLineWidth(0.25);
  document.line(11, 42, 47, 42);

  document.setFontSize(8.5);
  document.text('OFFICE ADDRESS', 11, 57);
  document.setFontSize(9);
  document.text(['Brown Stone Estate, Lekki,', 'Lagos, Nigeria'], 11, 64, { lineHeightFactor: 1.5 });
  document.setFontSize(8.5);
  document.text('PHONE', 11, 83);
  document.setFontSize(9);
  document.text('+234 813 452 5821', 11, 90);
  document.setFontSize(8.5);
  document.text('EMAIL', 11, 103);
  document.setFontSize(9);
  document.text('talkwithfliqmedia@gmail.com', 11, 110, { maxWidth: 38 });
  document.setFontSize(8.5);
  document.text('TAX ID NUMBER', 11, 126);
  document.setFontSize(9);
  document.text('26008052-0001', 11, 133);
  document.setFontSize(8.5);
  document.text('PAYMENT METHOD', 11, 153);
  document.setFontSize(9);
  document.text(['First Bank', 'Account name: FliQ Media', '2043501421'], 11, 160, { lineHeightFactor: 1.6 });
  document.setFontSize(8.5);
  document.text('INSTAGRAM', 11, 191);
  document.setFontSize(9);
  document.text('@fliqmedia_', 11, 198);

  document.setTextColor(42, 38, 35);
  document.setFont('helvetica', 'normal');
  document.setFontSize(27);
  document.text('INVOICE', contentLeft, 31);
  document.setTextColor(103, 65, 48);
  document.setFont('helvetica', 'bold');
  document.setFontSize(10);
  document.text(invoice.invoiceNumber, contentRight, 39, { align: 'right' });

  document.setDrawColor(207, 202, 197);
  document.line(contentLeft, 48, contentRight, 48);
  document.setTextColor(112, 105, 99);
  document.setFont('helvetica', 'bold');
  document.setFontSize(8);
  document.text('INVOICE DATE', contentLeft, 59);
  document.text('PAYMENT TERMS', 145, 59);
  document.setTextColor(42, 38, 35);
  document.setFont('helvetica', 'normal');
  document.setFontSize(10);
  document.text(formatDate(invoice.invoiceDate), contentLeft, 66);
  document.text('70% upfront / 30% on completion', 145, 66, { maxWidth: 53 });

  document.setTextColor(112, 105, 99);
  document.setFont('helvetica', 'bold');
  document.setFontSize(8);
  document.text('BILL TO', contentLeft, 84);
  document.setTextColor(42, 38, 35);
  document.setFont('helvetica', 'bold');
  document.setFontSize(11);
  const clientNameLines = document.splitTextToSize(invoice.clientName, 125).slice(0, 2);
  document.text(clientNameLines, contentLeft, 92);
  document.setFont('helvetica', 'normal');
  document.setFontSize(9);
  const clientDetails = [invoice.clientEmail, invoice.clientPhone, ...invoice.clientAddress.split('\n')].filter(Boolean);
  document.text(document.splitTextToSize(clientDetails.join('\n'), 125).slice(0, 6), contentLeft, 99 + (clientNameLines.length - 1) * 5, { lineHeightFactor: 1.4 });

  document.setFillColor(245, 243, 240);
  document.rect(contentLeft, 132, contentRight - contentLeft, 12, 'F');
  document.setTextColor(103, 65, 48);
  document.setFont('helvetica', 'bold');
  document.setFontSize(8);
  document.text('DESCRIPTION', contentLeft + 4, 140);
  document.text('AMOUNT', contentRight - 4, 140, { align: 'right' });

  document.setTextColor(42, 38, 35);
  document.setFontSize(10);
  const projectLines = document.splitTextToSize(invoice.projectName, 78).slice(0, 2);
  document.text(projectLines, contentLeft + 4, 154);
  document.setFont('helvetica', 'normal');
  document.setTextColor(112, 105, 99);
  document.setFontSize(8.5);
  const descriptionLines = document.splitTextToSize(invoice.description, 78).slice(0, 4);
  const descriptionY = 154 + projectLines.length * 5;
  document.text(descriptionLines, contentLeft + 4, descriptionY, { lineHeightFactor: 1.4 });
  document.setTextColor(42, 38, 35);
  document.setFontSize(9.5);
  document.text(formatAmount(invoice.amount), contentRight - 4, 154, { align: 'right' });
  document.setDrawColor(207, 202, 197);
  const dividerY = Math.max(184, descriptionY + descriptionLines.length * 4.5 + 4);
  document.line(contentLeft, dividerY, contentRight, dividerY);

  const deposit = Math.round(invoice.amount * 0.7 * 100) / 100;
  const balance = invoice.amount - deposit;
  const totalY = dividerY + 11;
  document.setTextColor(112, 105, 99);
  document.setFont('helvetica', 'normal');
  document.setFontSize(9);
  document.text('TOTAL', contentLeft, totalY);
  document.text('70% UPFRONT', contentLeft, totalY + 13);
  document.text('30% ON COMPLETION', contentLeft, totalY + 26);
  document.setTextColor(42, 38, 35);
  document.setFont('helvetica', 'bold');
  document.setFontSize(10);
  document.text(formatAmount(invoice.amount), contentRight, totalY, { align: 'right' });
  document.setFont('helvetica', 'normal');
  document.text(formatAmount(deposit), contentRight, totalY + 13, { align: 'right' });
  document.text(formatAmount(balance), contentRight, totalY + 26, { align: 'right' });

  const termsY = totalY + 44;
  document.setDrawColor(103, 65, 48);
  document.line(contentLeft, termsY, contentRight, termsY);
  document.setTextColor(42, 38, 35);
  document.setFont('helvetica', 'bold');
  document.setFontSize(9);
  document.text('TERMS & CONDITIONS', contentLeft, termsY + 13);
  document.setFont('helvetica', 'normal');
  document.setTextColor(112, 105, 99);
  document.setFontSize(9);
  document.text('70% upfront payment and 30% upon completion.', contentLeft, termsY + 21);
  document.text('Thank you for choosing FliQ Media.', contentLeft, termsY + 35);

  return document;
}
