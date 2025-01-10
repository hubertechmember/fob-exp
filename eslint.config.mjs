import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin
    },
    rules: nextPlugin.configs.recommended.rules,
    settings: {
      next: {
        rootDir: "."
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error"
    }
  },
  {
    ignores: ["**/node_modules/**", "**/.next/**", "**/dist/**"]
  }
];
