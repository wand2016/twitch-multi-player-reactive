const path = require("path");

module.exports = {
  entry: "./callback/src/index.ts",
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      "@bff": path.resolve(__dirname, "bff/src"),
      "@callback": path.resolve(__dirname, "callback/src"),
      "@lib": path.resolve(__dirname, "lib/src"),
    },
    extensions: [".ts", ".js", ".json"],
    fallback: {
      crypto: false,
    },
  },
  output: {
    filename: "callback.js",
    path: path.resolve(__dirname, "callback/dist"),
    libraryTarget: "commonjs2",
  },
};
