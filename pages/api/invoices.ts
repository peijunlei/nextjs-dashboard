import { fetchFilteredInvoices } from '@/app/lib/data';

export default async function handler(req, res) {
  const { query, page } = req.query;

  try {
    const invoices = await fetchFilteredInvoices(query, parseInt(page, 10));
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
} 