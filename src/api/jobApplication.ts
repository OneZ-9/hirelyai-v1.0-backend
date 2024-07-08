import express from "express";
import {
  createJobApplication,
  getJobApplicationById,
  getJobApplications,
} from "../application/jobApplication";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import AuthorizationMiddleware from "./middleware/authorization-middleware";
import { upload } from "./middleware/resume-upload";

const jobApplicationRouter = express.Router();

jobApplicationRouter
  .route("/")
  .get(ClerkExpressWithAuth({}), AuthorizationMiddleware, getJobApplications)
  .post(upload.single("resume"), createJobApplication);

jobApplicationRouter
  .route("/:applicationId")
  .get(
    ClerkExpressWithAuth({}),
    AuthorizationMiddleware,
    getJobApplicationById
  );

export default jobApplicationRouter;
