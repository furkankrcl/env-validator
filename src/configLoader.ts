import fs from "fs";

export interface VariableConfig {
  required: boolean;
  type?: "string" | "number" | "boolean";
  enum?: string[];
  regex?: string;
}

export interface ValidationConfig {
  envPath?: string;
  envFiles?: string[];
  variables: Record<string, VariableConfig>;
}

export const loadConfig = (configPath: string): ValidationConfig => {
  if (!fs.existsSync(configPath)) {
    throw new Error(`Config file not found: ${configPath}`);
  }

  return JSON.parse(fs.readFileSync(configPath, "utf-8")) as ValidationConfig;
};
