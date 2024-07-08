import multer from "multer";
import path from "path";

// Configure multer for memory storage
const storage = multer.memoryStorage(); // Store file in memory
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max file size
});
