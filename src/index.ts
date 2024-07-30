import express from "express";
import cors from "cors";

import jobsRouter from "./api/jobs";
import { connectDB } from "./infrastructure/db";
import jobApplicationRouter from "./api/jobApplication";
import GlobalErrorHandlingMiddleware from "./api/middleware/global-error-handler";

const app = express();
app.use(express.json()); // retrive the req json body

// app.use(cors());

app.use(
  cors({
    origin: "https://hirelyai-chamod.netlify.app", // Allow this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);

connectDB();

// middleware
// app.use((req, res, next) => {
//   console.log("Log from a middleware which sits bitween request and respons");
//   next();
// });

app.use("/jobs", jobsRouter);
app.use("/jobApplications", jobApplicationRouter);

app.use(GlobalErrorHandlingMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
