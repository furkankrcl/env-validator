import { validateEnvFiles } from "./validator";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import path from "path";

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

  const configPath = path.resolve(argv.config);

  try {
    // Dinamik olarak config.ts dosyasını yükle
    const { config } = await import(configPath);
    const report = validateEnvFiles(config);

    console.log("Validation Report:\n", report);
  } catch (error) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : "An unknown error occurred."
    );
  }
})();
