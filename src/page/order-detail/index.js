/*
* @Author: Zihao Tao
* @Date:   2018-11-19 00:15:40
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-19 01:27:46
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _order = require('service/order-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

// logic of page
var page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function() {
        this.onload();
        this.bindEvent();
    },
    onload: function() {
        // initiate left menu
        navSide.init({
            name: 'order-list'
        });
        this.loadDetail();
    },
    bindEvent: function() {
        var _this = this;
        $(document).on('click', '.order-cancel', function() {
            if(window.confirm('Are you sure to cancel this order?')) {
                _order.cancelOrder(_this.data.orderNumber, function(res) {
                    _mm.successTips('Your order has been successfully canceled');
                    _this.loadDetail();
                }, function(errMsg) {
                    _mm.errTips(errMsg);
                });
            }
        });
    },
    loadDetail: function() {
        var _this = this,
            orderDetailHtml = '',
            $content = $('.content');
            $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber, function(res) {
            _this.dataFilter(res);
            orderDetailHtml = _mm.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
        }, function(errMsg) {
            $content.html('<p class="err-tips">' + errMsg + '</p>');
        });
    },
    dataFilter: function(data) {
        data.needPay = data.status == 10;
        data.isCancelable = data.status == 10;
    }
};

$(function() {
    page.init();
});