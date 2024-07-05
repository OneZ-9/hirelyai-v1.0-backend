import JobApplication from "../infrastructure/schemas/jobApplicatonSchema";
import { NextFunction, Request, Response } from "express";
import { generateRating } from "./rating";

export const createJobApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobApplication = req.body;
    const createdJobApplication = await JobApplication.create(jobApplication);
    // console.log(jobApplication);

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
    // console.log(applicationId);

    const jobApplication = await JobApplication.findById(applicationId);

    return res.status(200).json(jobApplication);
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
