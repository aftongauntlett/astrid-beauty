/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    es2022: true,
    browser: true,
    node: true,
  },
  ignorePatterns: [
    "dist/",
    "node_modules/",
    ".astro/",
    ".vscode/",
    "coverage/",
  ],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      plugins: ["astro"],
      extends: [
        "plugin:astro/recommended",
        "plugin:astro/jsx-a11y-recommended",
      ],
    },
    {
      files: ["**/*.{ts,tsx,js,mjs,cjs}"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      plugins: ["@typescript-eslint", "jsx-a11y"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { prefer: "type-imports", fixStyle: "inline-type-imports" },
        ],
        "@typescript-eslint/no-explicit-any": "warn",
      },
    },
  ],
};
