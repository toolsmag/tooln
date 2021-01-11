/** external module */
const fs = require('fs');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/** Environment Variables */
const { NODE_ENV: environment } = process.env;
const isEnvProd = environment === 'production';
const chunksName = 'chunks';

/** HtmlWebpackPlugins  */
const HtmlWebpackPlugins = Object.entries({
  main: 'index.html',
  about: 'about.html',
  article: 'article.html',
}).map(
  ([key, value]) =>
    new HtmlWebpackPlugin({
      minify: false,
      template: `./app/${key}.html`,
      filename: value,
      chunks: [chunksName, key],
      HTML_PATH: path.resolve(__dirname, './app/src/templates/'),
    }),
);

/** Webpack Config */
module.exports = {
  mode: environment,
  entry: {
    main: './app/src/js/main.js',
    about: './app/src/js/about.js',
    article: './app/src/js/article.js',
  },
  output: {
    filename: 'src/js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        [chunksName]: { chunks: 'all', enforce: true, name: chunksName },
      },
    },
  },
  plugins: [
    ...(isEnvProd ? [new CleanWebpackPlugin()] : []),
    ...HtmlWebpackPlugins,
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'src/css/[name].[chunkhash:8].css',
      chunkFilename: 'src/css/[name].[chunkhash:8].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'app/src/json'),
          to: "src/json/",
        },
        {
          from: path.resolve(__dirname, 'app/src/img/article'),
          to: "src/img/article/",
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '../fonts',
            outputPath: 'src/fonts/',
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.(mp4|ogg)$/,
        use: {
          loader: 'file-loader',
          options: {
            // publicPath: '../fonts',
            outputPath: 'src/',
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              outputPath: 'src/img',
              name: (path) => {
                const regex = /(?<=(\/img\/))[a-zA-z\/0-9\!\@\#\$\%\^\&\\*\(\)\_\-\+\=\{\}\|\:\"\<\>\?\;\'\,\/\`\~]+/g;
                return `${path.match(regex)[0]}_[contenthash:8].[ext]`;
              },
              limit: 0,
            },
          },
        ],
      },
      {
        test: /\.(c|sa|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: isEnvProd
    ? {}
    : {
        port: 9999,
        open: true,
        overlay: true,
        host: '0.0.0.0',
        stats: 'errors-only',
      },
};
