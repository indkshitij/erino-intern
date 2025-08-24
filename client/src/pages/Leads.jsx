import React, { useContext, useEffect } from "react";
import AppContext from "../AppContext/AppContext";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LeadGrid from "../components/LeadGrid";
import LeadFilter from "../components/LeadFilter";
import { useNavigate } from "react-router-dom";

const Leads = () => {
  const {
    backendUrl, page, setPage, limit, setLimit, totalPages, total,
    setTotal, setTotalPages, filters, setFilters, resetFilters,
  } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(()=>{
    document.title = "Leads"
  })
  return (
    <div className="min-h-screen px-7 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-semibold text-purple-800">Leads</h1>
        <div className="flex gap-2">
          <Button onClick={() => { resetFilters(); setPage(1); }}
            variant="outline" className="cursor-pointer border-purple-600 text-purple-600 hover:text-purple-600 hover:bg-purple-100">
            Reset
          </Button>
          <Button onClick={() => navigate("/leads/new")}
            className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
            + New Lead
          </Button>
        </div>
      </div>

      <LeadFilter
        {...filters}
        {...Object.fromEntries(Object.keys(filters).map((k) => [
          `set${k[0].toUpperCase() + k.slice(1)}`, (v) => setFilters((f) => ({ ...f, [k]: v })),
        ]))}
      />

      <div className="mt-6">
        <LeadGrid
          backendUrl={backendUrl}
          page={page}
          limit={limit}
          filters={filters}
          onTotalChange={(t, p) => { setTotal(t); setTotalPages(p); }}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between mt-6">
        <div className="text-sm text-gray-600">Page {page} of {totalPages} • {total} total</div>
        <div className="flex gap-2">
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</Button>
          <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
          <Select value={String(limit)} onValueChange={(v) => { setLimit(Number(v)); setPage(1); }}>
            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
            <SelectContent>
              {[10, 20, 50, 100].map((n) => (
                <SelectItem key={n} value={String(n)}>{n}/page</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Leads;