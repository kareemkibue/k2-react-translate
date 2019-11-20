const path = require('path');

const resolveSrc = (relativePath) => {
	return path.resolve(__dirname, relativePath);
};

const paths = {
	buildDirectory: resolveSrc('../examples/dist'),
	cacheDir: resolveSrc('../.cache'),
	buildIndexHtml: resolveSrc('../examples/dist/index.html'),
	env: resolveSrc('../env.json'),
	esLint: resolveSrc('./eslintrc.js'),
	indexHtml: resolveSrc('../examples/index.html'),
	indexTsx: resolveSrc('../examples/index.tsx'),
	mainBundleFileName: 'main.js',
	tsConfig: resolveSrc('../tsconfig.json'),
};

module.exports = paths;
