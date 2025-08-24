import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../AppContext/AppContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const LeadForm = ({ mode }) => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    source: "website",
    status: "new",
    score: 0,
    lead_value: 0,
    last_activity_at: "",
    is_qualified: false,
  });

  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchLead = async () => {
        try {
          const { data } = await axios.get(`${backendUrl}/leads/${id}`, {
            withCredentials: true,
          });
          setForm(data.data);
        } catch {
          toast.error("Failed to fetch lead");
        }
      };
      fetchLead();
    }
  }, [mode, id, backendUrl]);

  const handleSubmit = async () => {
    try {
      if (mode === "create") {
        const { data } = await axios.post(`${backendUrl}/leads`, form, {
          withCredentials: true,
        });
        toast.success(data.message || "Lead created!");
      } else {
        const { data } = await axios.put(`${backendUrl}/leads/${id}`, form, {
          withCredentials: true,
        });
        toast.success(data.message || "Lead updated!");
      }
      navigate("/leads");
    } catch {
      toast.error("Failed to save lead");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <Card className="w-full max-w-6xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            {mode === "create" ? "New Lead" : "Edit Lead"}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium mb-0.5">First Name</label>
            <Input
              type="text"
              className="cursor-pointer"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-0.5">Last Name</label>
            <Input
              type="text"
              className="cursor-pointer"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-0.5">Email</label>
            <Input
              type="email"
              className="cursor-pointer"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-0.5">Phone</label>
            <Input
              type="tel"
              className="cursor-pointer"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-0.5">Company</label>
            <Input
              type="text"
              className="cursor-pointer"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-0.5">City</label>
            <Input
              type="text"
              className="cursor-pointer"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-0.5">State</label>
            <Input
              type="text"
              className="cursor-pointer"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-0.5">Source</label>
            <select
              className="border rounded-lg p-2 w-full cursor-pointer"
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
            >
              <option value="website">Website</option>
              <option value="facebook_ads">Facebook Ads</option>
              <option value="google_ads">Google Ads</option>
              <option value="referral">Referral</option>
              <option value="events">Events</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium mb-0.5">Status</label>
            <select
              className="border rounded-lg p-2 w-full cursor-pointer"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
              <option value="won">Won</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-0.5">Score</label>
            <Input
              type="number"
              className="cursor-pointer"
              value={form.score}
              onChange={(e) => setForm({ ...form, score: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-0.5">Lead Value</label>
            <Input
              type="number"
              className="cursor-pointer"
              value={form.lead_value}
              onChange={(e) => setForm({ ...form, lead_value: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-0.5">Last Activity</label>
            <Input
              type="date"
              className="cursor-pointer"
              value={form.last_activity_at ? form.last_activity_at.split("T")[0] : ""}
              onChange={(e) => setForm({ ...form, last_activity_at: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2 col-span-2">
            <input
              type="checkbox"
              className="cursor-pointer text-6xl"
              checked={form.is_qualified}
              onChange={(e) => setForm({ ...form, is_qualified: e.target.checked })}
            />
            <label className="text-sm font-medium">Qualified</label>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            className="ml-auto w-fit bg-purple-800 hover:bg-purple-900 text-white cursor-pointer"
          >
            <PlusCircle className="mr-2 h-5 w-5" />{" "}
            {mode === "create" ? "Create Lead" : "Update Lead"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LeadForm;
