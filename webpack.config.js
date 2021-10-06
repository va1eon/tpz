const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const {
  CleanWebpackPlugin
} = require(`clean-webpack-plugin`);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPLugin = require(`optimize-css-assets-webpack-plugin`);
const TerserWebpackPlugin = require(`terser-webpack-plugin`);

const isDev = process.env.NODE_ENV === `development`;
const isProd = !isDev;

const filename = (ext) => isDev ? `[name]${ext}` : `[name].[contenthash]${ext}`;

const optimization = () => {
  const configObj = {
    splitChunks: {
      chunks: `all`
    }
  };
  if (isProd) {
    configObj.minimizer = [
      new OptimizeCssAssetsWebpackPLugin(),
      new TerserWebpackPlugin()
    ]
  }

  return configObj
}

module.exports = {
  context: path.resolve(__dirname, `src`),
  mode: `development`,
  entry: `./js/main.js`,
  output: {
    filename: `./js/${filename('.js')}`,
    path: path.resolve(__dirname, `app`),
    publicPath: ''
  },

  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, `app`),
    },
    open: true,
    compress: true,
    hot: true,
    port: 3000
  },

  optimization: optimization(),

  plugins: [

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `src/index.html`),
      filename: `index.html`,
      minify: {
        collapseWhitespace: isProd
      }
    }),
    /* new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `src/blog.html`),
      filename: `blog.html`,
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `src/text.html`),
      filename: `text.html`,
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `src/text2.html`),
      filename: `text2.html`,
      minify: {
        collapseWhitespace: isProd
      }
    }), */

    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `./css/${filename('.css')}`,
    })
  ],

  devtool: isProd ? false : `source-map`,

  module: {
    rules: [{
        test: /\.html$/i,
        loader: `html-loader`
      },
      {
        test: /\.css$/i,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev
            }
          },
          `css-loader`,
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resuorcePath, context) => {
                return path.relative(path.dirname(resuorcePath), context) + '/';
              }
            }
          },
          `css-loader`,
          'postcss-loader',
          'sass-loader',
          
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: `babel-loader`,
        }]
      },
      {
        test: /\.(?:|gif|png|jpg|jpeg|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: `./[path]${filename('[ext]')}`
        }
      },
      {
        test: /\.(?:|woff2|woff)$/,
        type: 'asset/resource',
        generator: {
          filename: `./[path]${filename('[ext]')}`
        }
      }
    ]
  }
}