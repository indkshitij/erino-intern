import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import ViewDialog from "./ViewDialog";
import DeleteDialog from "./DeleteDialog";

ModuleRegistry.registerModules([AllCommunityModule]);

const LeadGrid = ({ backendUrl, page, limit, filters, onTotalChange }) => {
  const [rowData, setRowData] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [deleteLead, setDeleteLead] = useState(null);
  const navigate = useNavigate();

  const fetchLeads = async () => {
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "" && v !== null)
      );

      const { data } = await axios.get(`${backendUrl}/leads`, {
        withCredentials: true,
        params: { page, limit, ...cleanFilters },
      });

      setRowData(data.data);
      if (onTotalChange) onTotalChange(data.total, data.totalPages);
    } catch {
      toast.error("Failed to fetch leads");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, limit, filters]);

  const handleDeleteLead = async () => {
    try {
      await axios.delete(`${backendUrl}/leads/${deleteLead._id}`, {
        withCredentials: true,
      });
      toast.success("Lead deleted successfully");
      setDeleteLead(null);
      fetchLeads();
    } catch {
      toast.error("Failed to delete lead");
    }
  };

  const colDefs = [
    { headerName: "Name", valueGetter: (p) => `${p.data.first_name} ${p.data.last_name}`, flex: 1 },
    { field: "email", flex: 1 },
    { field: "phone", flex: 1 },
    { field: "company", flex: 1 },
    { field: "city", flex: 1 },
    { field: "state", flex: 1 },
    { field: "source", flex: 1 },
    { field: "status", flex: 1 },
    { headerName: "Qualified", field: "is_qualified", flex: 1, valueFormatter: (p) => (p.value ? "Yes" : "No") },
    { field: "score", flex: 1 },
    { headerName: "Lead Value", field: "lead_value", flex: 1, valueFormatter: (p) => `₹ ${Number(p.value || 0).toLocaleString()}` },
    {
      headerName: "Actions",
      flex: 1,
      cellRenderer: (params) => (
        <div className="flex gap-2 justify-center">
          <Button variant="ghost" size="icon" onClick={() => setSelectedLead(params.data)}>
            <Eye className="h-4 w-4 text-blue-600" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate(`/leads/${params.data._id}/edit`)}>
            <Pencil className="h-4 w-4 text-green-600" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setDeleteLead(params.data)}>
            <Trash className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="ag-theme-alpine rounded-xl w-full">
        <AgGridReact rowData={rowData} columnDefs={colDefs} domLayout="autoHeight" rowHeight={44} headerHeight={52} />
      </div>
      <ViewDialog open={!!selectedLead} lead={selectedLead} onClose={() => setSelectedLead(null)} />
      <DeleteDialog open={!!deleteLead} lead={deleteLead} onClose={() => setDeleteLead(null)} onConfirm={handleDeleteLead} />
    </>
  );
};

export default LeadGrid;
