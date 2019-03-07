const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = env => {
  const host = env && env.host ? env.host : "localhost";
  const port = env && env.port ? env.port : "9000";

  const devClient = `webpack-dev-server/client?http://${host}:${port}`;

  const outputDir = path.join(__dirname, "..", "..", "backend", "public");
  const srcDir = path.join(__dirname, "..", "src");

  return {
    target: "web",

    devtool: "inline-cheap-module-source-map",

    entry: ["babel-polyfill", devClient, "./src/index.jsx"],

    resolve: { extensions: [".js", ".jsx"] },

    devServer: {
      hot: true,
      open: true,
      noInfo: false,
      disableHostCheck: true,
      publicPath: "/",
      host,
      port,
      contentBase: outputDir,
      headers: {
        "X-Frame-Options": "SAMEORIGIN"
      },
      proxy: [
        {
          context: ["/api"],
          target: env.proxyTarget,
        }
      ],
      historyApiFallback: {
        rewrites: [
          {
            from: /^\/assets\/.*$/,
            to(context) {
              const regex = /\/assets(.*)/g;

              return context.parsedUrl.pathname.replace(regex, "$1");
            }
          }
        ]
      },
      overlay: {
        warnings: true,
        errors: true
      }
    },

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
                  sourceMap: true,
                  minimize: false
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  sourceMap: true,
                  path: path.join(__dirname, "/postcss.config.js")
                }
              },
              {
                loader: "less-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: ["css-loader"]
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
      ),
    ].concat(
      [
        new webpack.SourceMapDevToolPlugin({
          filename: "[file].map",
          moduleFilenameTemplate: path.relative(srcDir, "[resourcePath]")
        }),
        new webpack.HotModuleReplacementPlugin()
      ]
    )
  };
};
