#!/usr/bin/env node
import { validateEnvFiles } from "./validator";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { loadConfig } from "./configLoader";

(async () => {
  const argv = yargs(hideBin(process.argv))
    .options({
      config: {
        type: "string",
        demandOption: true,
        describe: "Path to the config file (JSON/TS/JS)",
      },
    })
    .parseSync();

  try {
    const configPath = argv.config;
    const config = loadConfig(configPath);
    const report = validateEnvFiles(config);

    console.log("Validation Report:\n", report);
  } catch (error) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : "An unknown error occurred."
    );
  }
})();
