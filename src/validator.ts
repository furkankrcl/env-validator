import fs from "fs";
import path from "path";
import { parse } from "dotenv";
import { ValidationConfig } from "./configLoader";

export const validateEnvFiles = (config: ValidationConfig): string => {
  const envPath = config.envPath || ".";
  const envFiles = config.envFiles || [".env"];
  const issues: string[] = [];

  const loadedEnvVars: Record<string, Record<string, string>> = {};

  // Dosyaları yükle
  envFiles.forEach((file) => {
    const fullPath = path.resolve(envPath, file);
    if (!fs.existsSync(fullPath)) {
      issues.push(`File not found: ${file}`);
      return;
    }

    loadedEnvVars[file] = parse(fs.readFileSync(fullPath));
  });

  // Config'te tanımlanmayan değişkenleri kontrol et
  Object.entries(loadedEnvVars).forEach(([file, vars]) => {
    Object.keys(vars).forEach((key) => {
      if (!config.variables[key]) {
        issues.push(`Variable ${key} in ${file} is not defined in config.`);
      }
    });
  });

  // Config'e göre değişkenleri kontrol et
  Object.entries(config.variables).forEach(([variable, rules]) => {
    envFiles.forEach((file) => {
      const vars = loadedEnvVars[file];
      const value = vars?.[variable];

      // Required kontrolü
      if (rules.required && !value) {
        issues.push(`Missing required variable: ${variable} in ${file}`);
        return;
      }

      if (value) {
        // Tip kontrolü
        if (rules.type === "number" && isNaN(Number(value))) {
          issues.push(
            `Invalid type for ${variable} in ${file}: Expected number, got string`
          );
        }

        // Enum kontrolü
        if (rules.enum && !rules.enum.includes(value)) {
          issues.push(
            `Invalid value for ${variable} in ${file}: Expected one of ${JSON.stringify(
              rules.enum
            )}, got '${value}'.`
          );
        }

        // Regex kontrolü
        if (rules.regex && !new RegExp(rules.regex).test(value)) {
          issues.push(
            `Invalid format for ${variable} in ${file}: Does not match regex ${rules.regex}`
          );
        }
      }
    });
  });

  return issues.length > 0
    ? issues.join("\n")
    : "All environment variables are valid.";
};
