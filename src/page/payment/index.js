/*
* @Author: Zihao Tao
* @Date:   2018-11-19 10:51:52
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-19 11:22:25
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _payment = require('service/payment-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

// logic of page
var page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function() {
        this.onload();
    },
    onload: function() {
        this.loadPaymentInfo();
    },
    loadPaymentInfo: function() {
        var _this = this,
            paymentHtml = '',
            $pageWrap = $('.page-wrap');
            $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber, function(res) {
            paymentHtml = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        }, function(errMsg) {
            $pageWrap.html('<p class="err-tips">' + errMsg + '</p>');
        });
    },
    listenOrderStatus: function() {
        var _this = this;
        this.paymentTimer = window.setInterval(function() {
            _payment.getPaymentStatus(_this.orderNumber, function(res) {
                if(res == true) {
                    window.location.href 
                        = './result.html?type=payment&orderNumber=' + _this.orderNumber;
                }
            }, function() {

            });
        }, 5000);
    }
};

$(function() {
    page.init();
});