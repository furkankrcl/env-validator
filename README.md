# env-validator

**env-validator** is a CLI tool that helps you validate `.env` files against a specified `config` file. It can check the presence, types, and values (regex and enum) of variables and report missing or misconfigured variables.

## 📖 Available Translations

- [Türkçe (README.tr.md)](README.tr.md)

## 🚀 Features

- Can check multiple `.env` files.
- According to the rules set by the developer:
  - Checks the presence of variables.
  - Validates variable types (`string`, `number`, `boolean`, `enum`).
  - Applies regex and enum rules.
  - Reports variables that are present in one `.env` file but missing in another.
  - Reports variables that are present in a `.env` file but not defined in the `<config>.json` file.
- Easy CLI usage.

## 🛠️ Installation

### **Install via NPM**:

Install the package globally with the following command:

```bash
npm install -g env-validator
```

#### Verify Installation:

To verify that the installation was successful:

```bash
env-validator --help
```

## 📂 Configuration (Config File)

The tool requires a config file to operate. You can create the config file in JSON, TS, or JS format.

### Features

- `envPath`:
  - Specifies the directory where the .env files are located.
  - Defaults to pwd (the current working directory where the command is run).
- `envFiles`:
  - An array specifying the names of the .env files to be checked.
  - Defaults to `[".env"]`.
- `variables`:
  - Contains definitions of the variables that should be present in the .env files.
  - For each variable:
    - `required`: Specifies whether the variable is required (true or false).
    - `type`: The type of the variable (string, number, boolean, enum).
    - `regex`: A regular expression that the variable's value must match (optional).
    - `enum`: A list of values that the variable can take (should be used when type is enum).

**Example Config File** (config.json):

```json
{
  "envPath": "./envs",
  "envFiles": [".env", ".env.production"],
  "variables": {
    "API_KEY": { "required": true, "type": "string" },
    "DB_PORT": { "required": true, "type": "number" },
    "ENV_MODE": {
      "required": false,
      "type": "enum",
      "enum": ["development", "staging", "production"]
    },
    "EMAIL": {
      "required": false,
      "type": "string",
      "regex": "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
    }
  }
}
```

## 🔧 Usage

### Command:

You can run the tool by specifying the path to your config file:

```bash
env-validator --config=path/to/config.json
```

### Example Outputs:

1. If all variables are correct:

   ```bash
   All environment variables are valid.
   ```

2. If there are missing or incorrect variables:

   ```bash
   Missing required variable: API_KEY in .env.production
   Invalid type for DB_PORT in .env: Expected number, got string
   ```

## 📜 License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license. For more information, see the [`LICENSE`](./LICENSE) file.

## 🤝 Contributing

If you would like to contribute, please send a pull request or open an issue.
