import cors from "cors";
import express from "express";
import { ApiError } from "./lib/errors.js";
import v1 from "./routes/v1.js";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "nft-api", ts: Date.now() });
  });

  app.use("/v1", v1);

  app.use((_req, res) => {
    res.status(404).json({ error: { code: "NOT_FOUND", message: "Unknown route" } });
  });

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err instanceof ApiError) {
      res.status(err.status).json({ error: { code: err.code, message: err.message } });
      return;
    }
    console.error(err);
    res.status(500).json({ error: { code: "INTERNAL", message: "Unexpected error" } });
  });

  return app;
}
