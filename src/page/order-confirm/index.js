/*
* @Author: Zihao Tao
* @Date:   2018-11-16 11:59:24
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-18 19:56:02
*/

'user strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var _mm = require('util/mm.js');
var templateProduct = require('./product-list.string');
var templateAddress = require('./address-list.string');
var addressModel = require('./address-model.js');

var page = {
    data: {
        selectedAddressId: null  
    },
    init: function() {
        this.obload();
        this.bindEvent();
    },
    obload: function() {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent : function(){
        var _this = this;
        // select address
        $(document).on('click', '.address-item', function() {
            $(this).addClass('active')
                .siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });
        // submit order
        $(document).on('click', '.order-submit', function() {
            var shippingId= _this.data.selectedAddressId;
            if(shippingId) {
                _order.createOrder({
                    shippingId: shippingId
                }, function(res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            } else {
                _mm.errorTips('Please select address first.');
            }
        });
        // add address
        $(document).on('click', '.address-add', function() {
            addressModel.show({
                isUpdate: false,
                onSuccess: function() {
                    _this.loadAddressList();
                }
            });
        });
        // edit address
        $(document).on('click', '.address-update', function(e) {
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function(res) {
                addressModel.show({
                    isUpdate: true,
                    data: res,
                    onSuccess: function() {
                        _this.loadAddressList();
                    }
                });
            }, function(errMsg) {
                _mm.errorTips(errMsg);
            });
        });
        // delete address
        $(document).on('click', '.address-delete', function(e) {
            e.stopPropagation();
            var id = $(this).parents('.address-item').data('id');
            if(window.confirm('Are you sure to delete this address?')) {
                _address.deleteAddress(id, function(res) {
                    _this.loadAddressList();
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                })
            }
        });
    },
    // load address list
    loadAddressList: function() {
        var _this = this;
        $('.address-con').html('<div class="loading"></div>');
        _address.getAddressList(function(res) {
            _this.addressFilter(res);
            var addressListHtml = _mm.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function(errMsg) {
            $('.address-con').html('<p class="err-tip">Cannot load address, please reload the page.</p>');
        });
    },
    // dea with selection status
    addressFilter: function(data) {
        if(this.data.selectedAddressId) {
            var selectedAddressFlag =false;
            for (var i = 0, length = data.list.length; i < length; i++) {
                if(data.list[i].id === this.data.selectedAddressId) {
                    data.list[i].isActive = true;
                    selectedAddressFlag = true;
                }
            }
            // if the selected address is invalid
            if(!selectedAddressFlag) {
                this.data.selectedAddressId = null;
            }
        }
    },
    // load product list
    loadProductList: function() {
        var _this = this;
        $('.product-con').html('<div class="loading"></div>');
        _order.getProductList(function(res) {
            var productListHtml = _mm.renderHtml(templateProduct, res);
            $('.product-con').html(productListHtml);
        }, function(errMsg) {
            $('.product-con').html('<p class="err-tip">Cannot load product list, please reload the page.</p>');
        });
    }
};

$(function() {
    page.init();
})