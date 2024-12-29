import { existsSync } from "fs";
import { resolve } from "path";

export interface VariableConfig {
  required: boolean;
  type: "string" | "number" | "boolean" | "enum";
  enum?: string[];
  regex?: string;
}

export interface ValidationConfig {
  envPath?: string;
  envFiles?: string[];
  variables: Record<string, VariableConfig>;
}

export const loadConfig = (configPath: string): ValidationConfig => {
  if (!existsSync(configPath)) {
    throw new Error(`Config file not found: ${configPath}`);
  }
  const absolutePath = resolve(configPath);
  const config = require(absolutePath);

  if (!config.envFiles || !config.variables) {
    throw new Error(
      'Invalid config format: "envFiles" and "variables" are required.'
    );
  }
  return config as ValidationConfig;
};
