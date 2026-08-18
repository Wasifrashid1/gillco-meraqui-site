import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Route handler for storage assets
  app.get("/manus-storage/*", (req, res, next) => {
    const key = req.params[0] || "";

    if (key.includes("meraqui-hero-atmosphere_3f359ec9")) {
      return res.redirect(307, "/meraqui-hero-atmosphere_3f359ec9.webp");
    }
    if (key.includes("meraqui-pool-courtyard_c9f3cb09")) {
      return res.redirect(307, "/meraqui-pool-courtyard_c9f3cb09.webp");
    }

    next();
  });

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
