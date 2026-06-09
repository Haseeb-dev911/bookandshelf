import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "dist",
    "node_modules",
    "**/*.{js,jsx}"]
  ),
  {
    files: [
      "src/app/**/*.{ts,tsx}",
      "src/config/**/*.{ts,tsx}",
      "src/features/**/*.{ts,tsx}",
      "src/services/**/*.{ts,tsx}",
      "src/shared/**/*.{ts,tsx}",
    ],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "no-unused-vars": "warn",
      "semi": ["error", "always"],
      "@typescript-eslint/no-explicit-any": "warn"
    },
  },
]);
