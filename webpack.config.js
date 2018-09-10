/* eslint "flowtype/require-valid-file-annotation": 0 */
/* eslint "import/no-commonjs": 0 */

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/"
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  devServer: {
    contentBase: "public/",
    historyApiFallback: true,
    port: 8080,
    hot: true,
    before(app) {
      const bodyParser = require("body-parser");
      app.use(bodyParser());

      require("./serverapi/Wannatags")(app);
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: "url-loader"
      }
    ]
  }
};
