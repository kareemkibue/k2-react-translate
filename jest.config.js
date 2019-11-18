module.exports = {
	roots: ['<rootDir>/tests'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	cacheDirectory: `.cache/jest`,
	clearMocks: true,
	coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
	globals: {
		'ts-jest': {
			// stringifyContentPathRegex: true,
			// compiler: 'typescript',
			diagnostics: true,
			tsConfig: './tsconfig.json',
			// babelConfig: true,
		},
	},
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transformIgnorePatterns: ['\\\\node_modules\\\\'],
	verbose: true,
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	// snapshotSerializers: ['enzyme-to-json/serializer'],
	setupFilesAfterEnv: ['<rootDir>/test.config.ts'],
};
