const path = require("path");
const webpack = require("webpack");

const TerserPlugin = require("terser-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");

const locations = [
    path.resolve(__dirname, "lib"),
    path.resolve(__dirname, "tests"),
    path.resolve(__dirname, "server"),
];

const plugins = [
    new webpack.DefinePlugin({
        dirName: "__dirname",
    }),
    new NodemonPlugin({
        script: "./build/server.js",
        ignore: ["*.js.map"],
    }),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1, })
];

const common = (NODE_ENV) => ({
    devtool: NODE_ENV === "development" ? "eval-cheap-source-map" : undefined,

    watchOptions: {
        ignored: ["/node_modules/", "/build/"]
    },

    ignoreWarnings: [/^(?!CriticalDependenciesWarning$)/],
    stats: {
        children: false,
    },

    optimization: {
        minimize: NODE_ENV === "production",
        minimizer: [new TerserPlugin({ extractComments: false })],
        mangleWasmImports: NODE_ENV === "production",
        removeAvailableModules: NODE_ENV === "production",
        nodeEnv: NODE_ENV === "production" ? "production" : "development",

        splitChunks: {
            cacheGroups: {
                defaultVendors: false
            }
        }
    },
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],

        alias: {
            "@lib": path.resolve(__dirname, "lib"),
            "@tests": path.resolve(__dirname, "tests"),
        }
    },
    resolveLoader: {
        modules: ["node_modules"],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.js$/, /\.tsx?$/, /\.ts?$/],
                include: locations,
                loader: "babel-loader",
                options: { configFile: path.resolve(__dirname, "babel.config.js") },
            }
        ],
    }
});

const server = {
    entry: "./server/index.ts",
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        filename: "server.js",
        chunkFilename: "[name]-chunk.server.js",
        assetModuleFilename: "images/[name][ext][query]"
    },
    target: "node",
    plugins: plugins
};

module.exports = () => {
    const NODE_ENV = process.env.NODE_ENV || "development";
    const execCommon = common(NODE_ENV);

    return [
        Object.assign({}, execCommon, server),
    ];
};
