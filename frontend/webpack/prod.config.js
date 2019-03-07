const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = () => {
  const outputDir = path.join(__dirname, "..", "..", "backend", "public");

  return {
    target: "web",

    entry: ["babel-polyfill", "./src/index.jsx"],

    resolve: { extensions: [".js", ".jsx"] },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: /src/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["env", "react", "stage-0", "flow"],
                plugins: [
                  [
                    "react-css-modules",
                    {
                      generateScopedName:
                        "[path][name]__[local]--[hash:base64:5]",
                      filetypes: {
                        ".less": {
                          syntax: "postcss-less"
                        }
                      }
                    }
                  ],
                  [
                    "import",
                    {
                      libraryName: "antd",
                      libraryDirectory: "es",
                      style: "css"
                    }
                  ]
                ]
              }
            }
          ]
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  localIdentName: "[path][name]__[local]--[hash:base64:5]",
                  importLoaders: 2,
                  sourceMap: false,
                  minimize: true
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  sourceMap: false,
                  path: path.join(__dirname, "/postcss.config.js")
                }
              },
              {
                loader: "less-loader",
                options: {
                  sourceMap: false
                }
              }
            ]
          })
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: ["css-loader?minimize"]
          })
        }
      ]
    },

    output: {
      path: path.join(outputDir),
      filename: path.join("js", "bundle.js")
    },

    plugins: [
      new ExtractTextPlugin(path.join("css", "styles.css")),
      new webpack.ContextReplacementPlugin(
        /\.\/locale$/,
        "empty-module",
        false,
        /js$/
      )
    ].concat(
      [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new UglifyJSPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip"
        }),
        new webpack.HotModuleReplacementPlugin()
      ]
    )
  };
};
