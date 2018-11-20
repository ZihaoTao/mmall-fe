/*
* @Author: Zihao Tao
* @Date:   2018-11-17 20:48:09
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-18 18:27:09
*/
'use strict';

var _mm = require('util/mm.js');

var _address = {
    getAddressList : function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/list.do'),
            data: {
                pageSize : 50
            },
            success : resolve,
            error   : reject
        });
    },
    // add new address
    save: function(addressInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // update address
    update: function(addressInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success : resolve,
            error   : reject
        });   
    },
    // delete address
    deleteAddress: function(shippingId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/del.do'),
            data: {
                shippingId: shippingId
            },
            success : resolve,
            error   : reject
        });   
    },
    // get an address info
    getAddress: function(shippingId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/select.do'),
            data: {
                shippingId: shippingId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _address;