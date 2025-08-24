import React, { useEffect } from "react";
import LeadForm from "../components/LeadForm";

const NewLead = ({ mode }) => {
  useEffect(() => {
    if (mode == "create") {
      document.title = "Create Lead";
    } else {
      document.title = "Update Lead";
    }
  });
  return <LeadForm mode={mode} />;
};

export default NewLead;
