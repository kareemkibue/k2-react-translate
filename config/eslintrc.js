module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: ['plugin:jsx-a11y/recommended', 'eslint:recommended', 'plugin:react/recommended'],
	plugins: ['typescript', '@typescript-eslint', 'import', 'jsx-a11y', 'react-hooks'],
	rules: {
		'import/exports-last': ['off'],
		'import/first': ['off'],
		'import/group-exports': ['off'],
		'import/newline-after-import': ['off'],
		'import/no-named-default': ['off'],
		'import/no-self-import': ['off'],
		'import/no-unassigned-import': ['off'],
		'import/no-unresolved': ['off'],
		'jsx-quotes': ['warn', 'prefer-double'],
		'no-console': [
			'warn',
			{
				allow: ['clear', 'error'],
			},
		],
		'no-undef': ['off'],
		'no-empty-pattern': ['off'],
		'no-sequences': ['off'],
		'no-use-before-define': ['off'],
		'no-unsafe-finally': ['off'], // TODO restore
		'no-unused-vars': [
			'warn',
			{
				vars: 'all',
				args: 'after-used',
				ignoreRestSiblings: false,
			},
		],

		quotes: ['off'],
		semi: 2,
		'sort-imports': ['off'],
		'react/display-name': 0,
		'react/prop-types': 0,
		'no-prototype-builtins': 0,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
