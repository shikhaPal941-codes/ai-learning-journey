import express from "express";
import { generateResponse } from "../controllers/ai.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateBody } from "../middleware/validate.middleware.js";

const router = express.Router();

router.post("/chat", validateBody(["messages"]), asyncHandler(generateResponse));

export default router;