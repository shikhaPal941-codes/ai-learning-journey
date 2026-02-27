import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/ai", aiRoutes);

// Global error handler (must be last)
app.use(errorHandler);

export default app;