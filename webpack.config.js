
const path = require('path');
const fs = require('fs');

const config = require('./package.json');//增加的

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname,
    'ant-theme-vars.less'), 'utf8'));


const htmlwebpackincludeassetsplugin = require('html-webpack-include-assets-plugin');

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpackConfig = module.exports = {};
const isProduction = process.env.NODE_ENV === 'production';
const isUpload = process.env.NODE_ENV === 'upload';


const curDate = new Date();
const curTime = curDate.getFullYear() + '/' + (curDate.getMonth() + 1) + '/' + curDate.getDate() + ' ' + curDate.getHours() + ':' + curDate.getMinutes() + ':' + curDate.getSeconds();
const bannerTxt = config.name + ' ' + config.version + ' ' + curTime; //构建出的文件顶部banner(注释)内容




module.exports = {
    mode: 'development',
    entry: {
        exception: path.join(path.resolve(__dirname, 'src'), 'exception', 'index.js'),
        // exceptionShow: path.join(path.resolve(__dirname, 'src'), 'exceptionShow', 'index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },

    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        lodash: '_',
        moment: 'moment',
        'moment/locale/zh-cn': 'moment.locale'
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 抽取node_modules中的第三方库
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /(\.css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'style-loader',
                    }],
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                            },
                        },
                    ],
                }),
            },
            {
                test: /(\.less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'style-loader',
                    }],
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                modifyVars: themeVariables,
                                javascriptEnabled: true
                            }
                        }
                    ],
                }),
            },
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({
            filename: 'exception.html',
            title: '异常情况管理',
            favicon: path.join(path.resolve(__dirname, 'public'), 'favicon.ico'),
            template: path.join(path.resolve(__dirname, 'public'), 'index.html'),
            chunks: ['exception', 'vendors']
        }),

        // new HtmlWebpackPlugin({
        //     filename: 'exceptionShow.html',
        //     title: '异常情况查询',
        //     favicon: path.join(path.resolve(__dirname, 'public'), 'favicon.ico'),
        //     template: path.join(path.resolve(__dirname, 'public'), 'index.html'),
        //     chunks: ['exceptionShow', 'vendors']
        // }),


        new ExtractTextPlugin('[name].css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        // new BundleAnalyzerPlugin()
    ],
    devServer: {
        port: 3002,
        host: '0.0.0.0',
        historyApiFallback: true
    }
};

webpackConfig.devServer = {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true, //gzip压缩
    historyApiFallback: true,
};
