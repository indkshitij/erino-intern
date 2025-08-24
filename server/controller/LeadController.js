import LeadModel from "../models/LeadSchema.js";

const buildFilters = (q) => {
  const f = {};
  const ok = (v) => v !== undefined && v !== null && v !== "";

  if (ok(q.searchEmail)) f.email = { $regex: q.searchEmail, $options: "i" };
  if (ok(q.searchCompany)) f.company = { $regex: q.searchCompany, $options: "i" };
  if (ok(q.searchCity)) f.city = { $regex: q.searchCity, $options: "i" };

  if (ok(q.status)) f.status = q.status;
  if (ok(q.source)) f.source = q.source;

  if (ok(q.qualified)) f.is_qualified = q.qualified === "true";

  if (ok(q.scoreMin) || ok(q.scoreMax)) {
    f.score = {};
    if (ok(q.scoreMin)) f.score.$gte = Number(q.scoreMin);
    if (ok(q.scoreMax)) f.score.$lte = Number(q.scoreMax);
  }

  if (ok(q.valueMin) || ok(q.valueMax)) {
    f.lead_value = {};
    if (ok(q.valueMin)) f.lead_value.$gte = Number(q.valueMin);
    if (ok(q.valueMax)) f.lead_value.$lte = Number(q.valueMax);
  }

  if (ok(q.lastAfter) || ok(q.lastBefore)) {
    f.last_activity_at = {};
    if (ok(q.lastAfter)) f.last_activity_at.$gte = new Date(q.lastAfter);
    if (ok(q.lastBefore)) f.last_activity_at.$lte = new Date(q.lastBefore);
  }

  return f;
};

export const getLeads = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const filters = buildFilters(req.query);

    const total = await LeadModel.countDocuments(filters);
    const data = await LeadModel.find(filters)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({
      success: true,
      message: "Leads fetched successfully",
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("getLeads error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch leads" });
  }
};

export const getLeadById = async (req, res) => {
  try {
    const lead = await LeadModel.findById(req.params.id).lean();
    if (!lead)
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    res.json({ success: true, message: "Lead fetched", data: lead });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching lead",
        error: err.message,
      });
  }
};

export const createLead = async (req, res) => {
  try {
    const lead = await LeadModel.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "Lead created", data: lead });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "Lead creation failed",
        error: err.message,
      });
  }
};

export const updateLead = async (req, res) => {
  try {
    const lead = await LeadModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!lead)
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    res.json({ success: true, message: "Lead updated", data: lead });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "Lead update failed",
        error: err.message,
      });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const lead = await LeadModel.findByIdAndDelete(req.params.id);
    if (!lead)
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    res.json({ success: true, message: "Lead deleted" });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Lead deletion failed",
        error: err.message,
      });
  }
};
