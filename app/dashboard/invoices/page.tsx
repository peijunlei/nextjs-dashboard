'use client';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense, useEffect, useState } from 'react';
import { Button } from '@/app/ui/button';
import { fetchFilteredInvoices } from '@/app/lib/data';

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [iptValue, setIptValue] = useState('');
  const [invoices, setInvoices] = useState([]);

  async function handleSearch() {
    const data = await fetchData(iptValue)
    setInvoices(data);
  }
  async function fetchData(value = '', pageNum = 1) {
    setLoading(true)
    const response = await fetch(`/api/invoices?query=${encodeURIComponent(value)}&page=${pageNum}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setLoading(false)
    return data
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." value={iptValue} onChange={(value) => setIptValue(value)} />
        <Button onClick={handleSearch}>
          搜索
        </Button>
        <CreateInvoice />
      </div>
      {
        loading ? <InvoicesTableSkeleton /> : <Table invoices={invoices} />
      }
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}