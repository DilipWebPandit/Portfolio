import mongoose from "mongoose";
/***
 * title
 * schreenshort
 * technologis
 * frontend
 * backend
 * project description in short
 */

const adminProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  webImage: { type: String, default: "" },
  frontEnd: { type: [String], required: true },
  backend: { type: [String], required: true },
  projDescription: { type: String, required: true },
});

const adminProjectModel = mongoose.model("adminProject", adminProjectSchema);

export default adminProjectModel;
