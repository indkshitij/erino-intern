import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ViewDialog = ({ open, lead, onClose }) => {
  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-700">
            Lead Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-sm">
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Personal Info</h3>
            <Separator />
            <p>
              <span className="font-medium">Name:</span> {lead.first_name}{" "}
              {lead.last_name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {lead.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {lead.phone || "N/A"}
            </p>
            <p>
              <span className="font-medium">Company:</span>{" "}
              {lead.company || "N/A"}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Location</h3>
            <Separator />
            <p>
              <span className="font-medium">City:</span> {lead.city}
            </p>
            <p>
              <span className="font-medium">State:</span> {lead.state}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Lead Status</h3>
            <Separator />
            <p>
              <span className="font-medium">Source:</span>{" "}
              <Badge variant="outline" className="ml-2">
                {lead.source}
              </Badge>
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <Badge className="ml-2">{lead.status}</Badge>
            </p>
            <p>
              <span className="font-medium">Qualified:</span>{" "}
              {lead.is_qualified ? (
                <Badge className="bg-green-600">Yes</Badge>
              ) : (
                <Badge className="bg-red-600">No</Badge>
              )}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Metrics</h3>
            <Separator />
            <p>
              <span className="font-medium">Score:</span> {lead.score}
            </p>
            <p>
              <span className="font-medium">Lead Value:</span>{" "}
              <span className="text-purple-700 font-semibold">
                ${lead.lead_value}
              </span>
            </p>
            <p>
              <span className="font-medium">Last Activity:</span>{" "}
              {new Date(lead.last_activity_at).toLocaleDateString()}
            </p>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-3">
            <h3 className="font-semibold text-gray-900">Timestamps</h3>
            <Separator />
            <p>
              <span className="font-medium">Created At:</span>{" "}
              {new Date(lead.created_at).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Updated At:</span>{" "}
              {new Date(lead.updated_at).toLocaleString()}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDialog;
