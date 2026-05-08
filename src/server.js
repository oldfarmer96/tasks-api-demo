import app from "./app.js";
import { env } from "./config/env.js";
import { initDatabase } from "./db/database.js";

await initDatabase();

app.listen(env.port, () => {
  console.log(`API running on port ${env.port} (${env.nodeEnv})`);
});
