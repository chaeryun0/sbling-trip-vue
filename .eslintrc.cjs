module.exports = {
	root: true,
	env: {
		node: true,
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-prettier',
	],
	plugins: ['vue', 'prettier'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 2,
				trailingComma: 'all',
				printWidth: 80,
				bracketSpacing: true,
				arrowParens: 'avoid',
				endOfLine: 'auto',
			},
		],
		'vue/multi-word-component-names': 'off',
	},
	ignorePatterns: ['dist'],
};
