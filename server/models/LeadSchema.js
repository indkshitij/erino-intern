import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    company: { type: String },
    city: { type: String },
    state: { type: String },

    source: {
      type: String,
      enum: [
        "website",
        "facebook_ads",
        "google_ads",
        "referral",
        "events",
        "other",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost", "won"],
      default: "new",
    },

    score: { type: Number, min: 0, max: 100, default: 0 },
    lead_value: { type: Number, default: 0 },

    last_activity_at: { type: Date, default: null },
    is_qualified: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const LeadModel = mongoose.model("Lead", LeadSchema);

export default LeadModel;
