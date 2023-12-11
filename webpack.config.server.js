const path = require("path");

module.exports = {
  mode: "production",
  entry: "./server/server.js",
  output: {
    filename: "server-bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  target: "node",
  node: {
    __dirname: "mock", // or 'eval-only'
  },
  externals: [require("webpack-node-externals")()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
