/* eslint "flowtype/require-valid-file-annotation": 0 */
/* eslint "import/no-commonjs": 0 */

const path = require("path");
const webpack = require("webpack");
const LicenseWebpackPlugin = require("license-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const firebaseConfig = require("firebase-tools/lib/config").load({
  cwd: process.cwd()
});

const BASE_PLUGINS = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
  })
];

module.exports = {
  entry:
    process.env.NODE_ENV === "production"
      ? ["babel-polyfill", "./src/index.js"]
      : [
          "babel-polyfill",
          "react-hot-loader/patch",
          "webpack-dev-server/client?http://localhost:8080",
          "webpack/hot/only-dev-server",
          "./src/index.js"
        ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/"
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
      require("./serverapi/WannatagsFeed")(app);
      app.use(require("superstatic")({ config: firebaseConfig.data.hosting }));
    }
  },
  plugins:
    process.env.NODE_ENV === "production"
      ? BASE_PLUGINS.concat([
          // new webpack.optimize.UglifyJsPlugin({
          //   minimize: true,
          //   sourceMap: false,
          //   compressor: {
          //     warnings: false
          //   },
          //   output: {
          //     comments: false
          //   }
          // })
        ])
      : BASE_PLUGINS.concat([
          new webpack.NamedModulesPlugin(),
          new webpack.NoEmitOnErrorsPlugin(),
          new webpack.HotModuleReplacementPlugin(),
          new HtmlWebpackPlugin({
            template: "public/index.html"
          })
        ]),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: [
          "style-loader",
          "css-loader?modules&importLoaders=1",
          "postcss-loader?sourceMap=inline"
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "node_modules"), "node_modules"]
  }
};
