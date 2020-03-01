module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier/react'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react', 'prettier', 'react-hooks', 'eslint-plugin-import-helpers'],
	rules: {
		'prettier/prettier': 'error',
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'import/prefer-default-export': 'off',
		'react/state-in-constructor': [1, 'never'],
		'no-param-reassign': 'off',
		'no-console': ['error', { allow: ['tron'] }],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react/jsx-props-no-spreading': 'off',
		'no-underscore-dangle': ['error', { allow: ['_id'] }],
	},
	settings: {
		'import/resolver': {
			'babel-plugin-root-import': {
				rootPathSuffix: 'src',
			},
		},
	},
};
