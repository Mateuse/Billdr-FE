

import type { Invoice } from '../types/invoice';


export const generatePaymentLink = (invoiceId: string, baseUrl?: string): string => {
  const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  return `${base}/pay/${invoiceId}`;
};


export const canInvoiceAcceptPayment = (invoice: Invoice): boolean => {
  return (
    invoice.status !== 'paid' && 
    invoice.status !== 'cancelled' && 
    (Number(invoice.total_amount) - Number(invoice.amount_paid)) > 0
  );
};


export const copyPaymentLinkToClipboard = async (invoiceId: string, baseUrl?: string): Promise<void> => {
  const link = generatePaymentLink(invoiceId, baseUrl);
  
  if (navigator.clipboard && window.isSecureContext) {

    await navigator.clipboard.writeText(link);
  } else {

    const textArea = document.createElement('textarea');
    textArea.value = link;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  }
};


export const generatePaymentMessage = (invoice: Invoice, baseUrl?: string): string => {
  const link = generatePaymentLink(invoice.id, baseUrl);
  const remainingAmount = Number(invoice.total_amount) - Number(invoice.amount_paid);
  
  return `Payment Request - Invoice #${invoice.invoice_number}

Amount Due: ${new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
}).format(remainingAmount)}

Pay securely online: ${link}`;
};