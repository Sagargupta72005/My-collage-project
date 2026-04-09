import express from "express";
import { handleAI, handleGemini } from "../controllers/aiController.js";

const router = express.Router();

// Define your endpoints
router.post("/openai", handleAI);
router.post("/gemini", handleGemini);

export default router;