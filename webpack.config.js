const path = require("path");

module.exports = {
    entry: ["@babel/polyfill", "./src/index.js"],

    output: {
        filename: "app.js",
        path: path.resolve(__dirname + "public"),
        publicPath: "/"
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        compress: false,
        port: 8000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"],
            },
            {
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader",
            }]
        }]
    }
};