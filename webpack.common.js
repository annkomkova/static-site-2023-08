const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js",
    theory: "./src/theory.js",
    adaptive: "./src/adaptive.js",
    slider: "./src/slider.js",
    dictionary: "./src/dictionary.js",
    jsbasic: "./src/jsbasic.js",
    adcgame: "./src/adcgame.js",
    select: "./src/select.js",
    select2: "./src/select2.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "docs"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        resourceQuery: /raw/,
        type: "asset/source",
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[hash][ext][query]",
        },
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/share/"),
          to: path.resolve(__dirname, "dev_build/share"),
        },
      ],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/share/"),
          to: path.resolve(__dirname, "docs/share"),
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),

    //Chunk select
    new HtmlWebpackPlugin({
      template: "./src/select.html",
      filename: "./select.html",
      chunks: ["select"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/select2.html",
      filename: "./select2.html",
      chunks: ["select2"],
    }),

    //Chunk jsbasic
    new HtmlWebpackPlugin({
      template: "./src/adcgame.html",
      filename: "./adcgame.html",
      chunks: ["adcgame"],
    }),

    //Chunk jsbasic
    new HtmlWebpackPlugin({
      template: "./src/jsbasic.html",
      filename: "./jsbasic.html",
      chunks: ["jsbasic"],
    }),

    //Chunk dictionary
    new HtmlWebpackPlugin({
      template: "./src/dictionary.html",
      filename: "./dictionary.html",
      chunks: ["dictionary"],
    }),

    //Chunk slider
    new HtmlWebpackPlugin({
      template: "./src/slider.html",
      filename: "./slider.html",
      chunks: ["slider"],
    }),

    //Chunk theory
    new HtmlWebpackPlugin({
      template: "./src/theory.html",
      filename: "./theory.html",
      chunks: ["theory"], // Дублируем имя Chunks в массив, чтоб он подгружал
    }),

    //Chunk adaptive
    new HtmlWebpackPlugin({
      template: "./src/adaptive.html",
      filename: "./adaptive.html",
      chunks: ["adaptive"], // Дублируем имя Chunks в массив, чтоб он подгружал
    }),

    // Index
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/about.html",
      filename: "./about.html",
      chunks: ["index"],
    }),

    //Section
    new HtmlWebpackPlugin({
      template: "./src/spaceobjects.html",
      filename: "./spaceobjects.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/spaceships.html",
      filename: "./spaceships.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/responsive-images.html",
      filename: "./responsive-images.html",
      chunks: ["index"],
    }),

    // Article
    new HtmlWebpackPlugin({
      template: "./src/spaceships/buran.html",
      filename: "./spaceships/buran.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/spaceobjects/moon.html",
      filename: "./spaceobjects/moon.html",
      chunks: ["index"],
    }),

    // Partials
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, "./src/partials/analytics.html"),
        location: "analytics",
        template_filename: "*",
        priority: "replace",
      },
    ]),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};
