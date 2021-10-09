const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const baseConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      examples: path.resolve(__dirname, 'src/examples'),
      lib: path.resolve(__dirname, 'src/lib'),
    },
  },
}

const copy = new CopyWebpackPlugin({
  patterns: [
    {
      from: './public',
    },
  ],
})

module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    historyApiFallback: true,
    hot: true,
    open: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [copy],
  ...baseConfig,
}
