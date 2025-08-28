// eslint.config.cjs
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            parser: tsParser, // <-- must be the parser object, not string
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: "module",
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            "no-unused-vars": "error",
            "no-unused-expressions": "error",
            "prefer-const": "error",
            "no-console": "off",
            "no-undef": "off",

        },
        ignores: ["dist/", "node_modules/"],
    },
];
