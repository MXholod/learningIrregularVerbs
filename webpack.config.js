const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	context: path.resolve(__dirname,"./public"),
	entry: {"style":["./scss/style.js"]},
	output:{
		path:path.resolve(__dirname,"./public/css"),
		filename:"[name].js"
	},
	resolve:{
		extensions:[".js",".scss"]
	},
	module:{
		rules:[
			{
				test:/\.(sass|scss)$/,
				use:ExtractTextPlugin.extract({
					publicPath:'./',
					fallback:'style-loader',
					use:['css-loader','sass-loader']
				})
			}
		]
	},
	plugins:[
		new ExtractTextPlugin("./[name].css")
	]
};