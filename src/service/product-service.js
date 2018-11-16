/*
* @Author: Zihao Tao
* @Date:   2018-11-14 17:44:16
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-14 23:12:59
*/

'use strict';

var _mm = require('util/mm.js');

var _product = {
    getProductList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    getProductDetail : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;