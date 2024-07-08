import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  resume: {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    originalName: { type: String, required: true },
  },
  submitted: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
  },
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
export default JobApplication;
