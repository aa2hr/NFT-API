import { createApp } from "./app.js";
import { config } from "./config.js";

const app = createApp();

app.listen(config.port, () => {
  console.log(`nft-api listening on :${config.port} (${config.env})`);
});
