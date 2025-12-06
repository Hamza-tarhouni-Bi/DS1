const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String },
  proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  statut: { type: String, default: "en cours" },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", projectSchema);