const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");

const HtmlCompiler = require("./webpack/html-compiler.js");

const dev = process.env.NODE_ENV !== "production";

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "out/static"),
        publicPath: "static/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /magnon.components\/.+?\.html$/, loader: "wc-loader" },
            { test: /src\/.*?\.html$/, loader: "html-loader" }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["out"]),
        new HtmlCompiler({
            outPath: "../html",
            template: "src/template.html",
            metaTest: /src\/pages\/(\w+?)\/meta\.json/,
            indexMeta: {
                title: "Magnon"
            }
        })
    ],
    watch: process.env.WEBPACK_WATCH === "true"
};