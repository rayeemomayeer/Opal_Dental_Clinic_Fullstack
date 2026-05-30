import { createApp } from "./app";
import { env } from "./env";

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`🦷 Opal API listening on http://localhost:${env.PORT} (${env.NODE_ENV})`);
});

// Graceful shutdown
for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    console.log(`\n${signal} received, shutting down…`);
    server.close(() => process.exit(0));
  });
}
