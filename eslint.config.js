import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
		plugins: { "@typescript-eslint": tseslint, js: js },
		extends: [
			"eslint:recommended",
			"plugin:@typescript-eslint/recommended",
			"plugin:js/recommended",
		],
		languageOptions: { globals: globals.node },
		rules: {},
	},
	tseslint.configs.recommended,
]);
