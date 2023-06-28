const path = require('path')
function resolve(dir) {
	return path.join(__dirname, dir)
}
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
	chainWebpack: config => {
		config.plugin('polyfills').use(NodePolyfillPlugin)
		config.resolve.alias.set('#', resolve('/src/assets/js/game'))
		config.module
			.rule('xlsx')
			.test(/\.xlsx$/)
			.use('webpack-xlsx-loader')
			.loader('webpack-xlsx-loader')
			.end()
	}
}
