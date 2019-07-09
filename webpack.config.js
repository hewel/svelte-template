const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

const pathToMainJs = path.join(__dirname, "src", "main.js");
const pathToIndexHtml = path.join(__dirname, "public", "/index.html");
const pathToFavicon = path.join(__dirname, "./public/favicon.png");

module.exports = {
  entry: [pathToMainJs],
  resolve: {
    extensions: [".mjs", ".js", ".svelte"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    // publicPath: "build/",
    filename: "[chunkhash].bundle.js",
    chunkFilename: "[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "babel-loader",
          },
        ],
        enforce: "pre",
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "svelte-loader",
            options: {
              emitCss: true,
              hotReload: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: prod ? MiniCssExtractPlugin.loader : "style-loader",
            options: {
              hmr: !prod,
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: !prod,
            },
          },
          ...(prod ? ["postcss-loader"] : []),
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "[name]_[id].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: pathToIndexHtml,
    }),
    new ManifestPlugin(),
    new FaviconsWebpackPlugin({
      logo: pathToFavicon,
      prefix: "[name]/",
      emitStats: prod,
      statsFilename: "stats-[name].json",
      background: "#fafafa",
      icons: {
        android: prod,
        appleIcon: prod,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
  ],
  devtool: prod ? "" : "cheap-module-eval-source-map",
  devServer: {
    port: 7453,
  },
};
