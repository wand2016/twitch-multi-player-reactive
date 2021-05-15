const path = require("path");

module.exports = {
  entry: {
    bff: "./src/bff/index.ts",
    callback: "./src/callback/index.ts",
  },
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
      "@bff": path.resolve(__dirname, "src/bff"),
      "@callback": path.resolve(__dirname, "src/callback"),
      "@lib": path.resolve(__dirname, "src/lib"),
    },
    extensions: [".ts", ".js", ".json"],
    fallback: {
      crypto: false,
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs2",
  },
};
