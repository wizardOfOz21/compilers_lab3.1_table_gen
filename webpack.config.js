const path = require("path");

module.exports = {
    target: "node",
    entry: {
        program: "./src/index.ts",
        sandbox: "./src/sandbox.ts",
        calc: "./src/calc/index.ts",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};
