import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  {
    languageOptions: { globals: globals.browser },
    rules: {
      // Indentation rule: 2 spaces
      indent: ["error", 2],
      // Space before function parenthesis
      "space-before-function-paren": ["error", "always"],
      // No space inside parentheses
      "space-in-parens": ["error", "never"],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
