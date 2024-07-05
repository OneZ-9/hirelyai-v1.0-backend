import express from "express";
import {
  createJobApplication,
  getJobApplicationById,
  getJobApplications,
} from "../application/jobApplication";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import AuthorizationMiddleware from "./middleware/authorization-middleware";

const jobApplicationRouter = express.Router();

jobApplicationRouter
  .route("/")
  .get(ClerkExpressWithAuth({}), AuthorizationMiddleware, getJobApplications)
  .post(createJobApplication);

jobApplicationRouter
  .route("/:applicationId")
  .get(
    ClerkExpressWithAuth({}),
    AuthorizationMiddleware,
    getJobApplicationById
  );

export default jobApplicationRouter;
