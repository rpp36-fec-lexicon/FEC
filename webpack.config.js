var path = require('path');
var src_dir = path.join(__dirname, "/client/src");
var dist_dir = path.join(__dirname, "/client/public");
module.exports = {
  entry: `${src_dir}/App.jsx`,
  output: {
    filename: 'bundle.js',
    path: dist_dir
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  }
};