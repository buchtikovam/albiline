/** @type { import("eslint").Linter.Config } */
import ts from 'typescript-eslint';

module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
		svelteFeatures: {
			experimentalGenerics: true,
		},
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				svelteFeatures: {
					experimentalGenerics: true,
				},
			}
		}
	],
	rules: {
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-any": "off"
	},
};
