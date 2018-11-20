/*
* @Author: Zihao Tao
* @Date:   2018-11-19 11:01:12
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-19 11:23:24
*/
'use strict';

var _mm = require('util/mm.js');

var _payment = {
    getPaymentInfo: function(orderNumber, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },
    getPaymentStatus: function(orderNumber, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    }
}
module.exports = _payment;