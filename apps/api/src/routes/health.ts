import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "opal-api",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
