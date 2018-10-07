const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const config = require('dotenv/config');
const devMode = process.env.NODE_ENV !== 'prod';

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const outputPath = path.resolve(__dirname, './dist');

module.exports = {
    entry:{
        app: [
            path.resolve(__dirname, './frontend/index.js')
        ]
    },

  output: {
    path: outputPath,
    filename: '[name].js',
    publicPath: "/"
  },
  
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  
  module: {
    rules:[
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        },
        {
            test: /\.(css|scss|)$/,
            exclude: /node_modules/,
            use:[
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        modules: 'true',
                        localIdentName: '[path][name]__[local]--[hash:base:64:5]'
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        modules: 'true',
                        localIdentName: '[path][name]__[local]--[hash:base:64:5]'
                    }
                }
            ]
        },
        {
            test:/\.(gif|png|jpg|jpeg|svg)/,
            exclude: /node_modules/,
            include: path.resolve(__dirname, './src/assets'),
            use: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext]'
        },
        {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
        }

    ]
  },

  plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './frontend/index.html'),
        alwaysWriteToDisk: true,
        path: outputPath
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new HtmlWebpackHarddiskPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
          SERVER_HOSTNAME: JSON.stringify((process.env.NODE_ENV === 'prod') ? process.env.PUBLIC_API_URL : process.env.APP_HOST),
          SERVER_PORT: JSON.stringify((process.env.NODE_ENV === 'prod') ? '' : process.env.APP_PORT),
          SERVER_COOKIE_NAME: JSON.stringify(process.env.COOKIE_NAME)
      })

  ],

    devServer: {
      historyApiFallback: true,
      contentBase: outputPath,
      inline: true,
      hot: true,
      compress:true,
      publicPath: '/'
    }

};
