import { Router } from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controller/LeadController.js";

const leadRouter = Router();
leadRouter.use(authRequired);

leadRouter.post("/", createLead);
leadRouter.get("/", getLeads);
leadRouter.get("/:id", getLeadById);
leadRouter.put("/:id", updateLead);
leadRouter.delete("/:id", deleteLead);

export default leadRouter;
