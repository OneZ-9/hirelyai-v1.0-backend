import JobApplication from "../infrastructure/schemas/jobApplicatonSchema";
import { NextFunction, Request, Response } from "express";
import { generateRating } from "./rating";
import ValidationError from "../domain/errors/validation-error";

export const createJobApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, fullName, answers, job, submitted } = req.body;
    const resume = req.file; // Get the uploaded file from req.file

    if (!resume) {
      throw new ValidationError("Resume is required");
    }

    // Prepare the data to be saved to MongoDB
    const jobApplication = {
      userId,
      fullName,
      answers: JSON.parse(answers), // Parse answers from JSON string
      resume: {
        data: resume.buffer, // File data
        contentType: resume.mimetype, // MIME type
        originalName: resume.originalname, // Original file name
      },
      job,
      submitted,
    };

    const createdJobApplication = await JobApplication.create(jobApplication);

    // Once jobApplication created, call the method to update the created jobApplication with rating
    generateRating(createdJobApplication._id);

    return res.status(201).send();
  } catch (error) {
    next(error);
    // console.log(error);
    // return res.status(500).send();
  }
};

export const getJobApplicationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { applicationId } = req.params;

    // Fetch the job application details from the database
    const jobApplication = await JobApplication.findById(applicationId);

    if (!jobApplication) {
      return res.status(404).json({ error: "Job Application not found" });
    }

    // Prepare the response with both form data and the resume
    const response = {
      ...jobApplication.toObject(), // Convert Mongoose document to a plain JavaScript object
      resume: {
        data: jobApplication.resume?.data.toString("base64"),
        contentType: jobApplication.resume?.contentType,
        originalName: jobApplication.resume?.originalName,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getJobApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const jobId = req.query.jobId;
    const { jobId } = req.query;
    // console.log(jobId);

    if (!jobId) {
      const jobApplications = await JobApplication.find()
        .populate("job")
        .exec();

      return res.status(200).json(jobApplications);
    }

    const jobApplications = await JobApplication.find({ job: jobId });
    return res.status(200).json(jobApplications);
  } catch (error) {
    next(error);
  }
};
