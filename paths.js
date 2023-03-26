const path = require('path');

const resolveSrc = (relativePath) => {
	return path.resolve(__dirname, relativePath);
};

const paths = {
	buildDirectory: resolveSrc('./demo/dist'),
	cacheDir: resolveSrc('./.cache'),
	buildIndexHtml: resolveSrc('./demo/dist/index.html'),
	env: resolveSrc('./env.json'),
	esLint: resolveSrc('./eslintrc.js'),
	indexHtml: resolveSrc('./demo/index.html'),
	indexTsx: resolveSrc('./demo/index.tsx'),
	mainBundleFileName: 'main.js',
	tsConfig: resolveSrc('./tsconfig.json'),
};

module.exports = paths;
