const path = require("path");
const projectName = require("./package.json").name;

function resolve(dir) {
    return path.join(__dirname, dir);
}


module.exports = {
    publicPath: './',
    outputDir: "dist",
    productionSourceMap: false,
    devServer: {
        historyApiFallback: true,
        host: "127.0.0.1",
        port: 8080,
        proxy: {
            "/": {
                target: "http://127.0.0.1:8081",
                changeOrigin: true,
                pathRewrite: {
                    "^/": "/"
                }
            }
        }
    },
    configureWebpack: {
        name: projectName,
        resolve: {
            alias: {
                "@": resolve("src"),
                "vue$": "vue/dist/vue.js"
            }
        }
    }
};
