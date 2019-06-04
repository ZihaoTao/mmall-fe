/*
* @Author: Zihao Tao
* @Date:   2018-10-31 23:51:49
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-04 00:12:13
*/

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

// environment variables config: dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
// method to get index of html-webpack-plugin
var getHtmlConfig = function(name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        favicon: './favicon.ico',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
}
//webpack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'list': ['./src/page/list/index.js'],
        'detail': ['./src/page/detail/index.js'],
        'cart': ['./src/page/cart/index.js'],
        'order-confirm': ['./src/page/order-confirm/index.js'],
        'order-list': ['./src/page/order-list/index.js'],
        'order-detail': ['./src/page/order-detail/index.js'],
        'payment': ['./src/page/payment/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
        'result': ['./src/page/result/index.js'],
        'about': ['./src/page/about/index.js']
    },
    output: {
        path: __dirname + '/dist/',
        publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '//s.taozihao.xyz/mmall-fe/dist/',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
            {
                test: /\.string$/, 
                loader: 'html-loader',
                query: {
                    minimize: true,
                    removeAttributeQuotes: false
                } 
            }
        ]
    },
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
    plugins: [
        //independent common modules to /js.base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // package css into file
        new ExtractTextPlugin("css/[name].css"),
        // deal with html template
        new HtmlWebpackPlugin(getHtmlConfig('index', 'Home')),
        new HtmlWebpackPlugin(getHtmlConfig('list', 'Category List')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', 'Cart')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', 'Order Confirmation')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', 'Order List')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', 'Order Detail')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', 'Order Payment')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', 'Product Detail')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', 'Log in')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', 'Register')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', 'Reset Password')),
        new HtmlWebpackPlugin(getHtmlConfig('result', 'Result')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', 'User Center')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', 'Change profile')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', 'Change password')),
        new HtmlWebpackPlugin(getHtmlConfig('about', 'About'))
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;