const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');

module.exports = () => {
  return {
    mode: 'production', // Switched to 'production' for deployment
    entry: {
      main: path.resolve(__dirname, 'src/js/index.js'),
      install: path.resolve(__dirname, 'src/js/install.js'),
    },
    output: {
      filename: '[name].[contenthash].js', // Updated for cache busting
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/', // Ensure this matches your deployment path
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'), // Ensure correct path
        title: 'JATE',
      }),
      new InjectManifest({
        swSrc: path.resolve(__dirname, 'src-sw.js'),
        swDest: 'service-worker.js',
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor that works offline!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve(__dirname, 'src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // Ensure these sizes match your icons
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
