import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";

export const generateResponse = asyncHandler(async (req, res) => {
  const { messages } = req.body;

  if (!messages) {
    const error = new Error("Messages are required");
    error.status = 400;
    throw error;
  }

  const response = await axios.post(
    "http://127.0.0.1:11434/api/chat",
    {
      model: "llama3",
      messages,
      stream: false,
    }
  );

  res.json({
    success: true,
    reply:
      response.data.message?.content ||
      response.data.response,
  });
});