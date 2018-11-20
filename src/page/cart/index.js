/*
* @Author: Zihao Tao
* @Date:   2018-11-15 20:24:33
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-16 11:58:40
*/

'user strict'
require('./index.css');
require('page/common/header/index.js');
var _cart = require('service/cart-service.js');
var _nav = require('page/common/nav/index.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var page = {
    data: {
            
    },
    init: function() {
        this.obload();
        this.bindEvent();
    },
    obload: function() {
        this.loadCart();
    },
    bindEvent : function(){
        var _this = this;
        // select / unselect product
        $(document).on('click', '.cart-select', function() {
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            // switch select / unselect
            if($this.is(':checked')) {
                _cart.selectProduct(productId, function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartError();
                });
            } else {
                _cart.unselectProduct(productId, function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartError();
                });
            }
        });
        // select / unselect all products
        $(document).on('click', '.cart-select-all', function() {
            var $this = $(this);
            // switch select / unselect all
            if($this.is(':checked')) {
                _cart.selectAllProduct(function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartError();
                });
            } else {
                _cart.unselectAllProduct(function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartError();
                });
            }
        });
        // quantity 
        $(document).on('click', '.count-btn', function() {
            var $this = $(this),
                $pCount = $this.siblings('.count-input'),
                currCount = parseInt($pCount.val()),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                minCount = 1,
                maxCount = parseInt($pCount.data('max')),
                newCount = 0;
            if(type === 'plus') {
                if(currCount >= maxCount) {
                    _mm.errorTips('Out of stock');
                    return;
                }
                newCount = currCount + 1;
            } else if (type === 'minus') {
                if(currCount <= minCount) {
                    return;
                }
                newCount = currCount - 1;
            }
            _cart.updateProduct({
                productId: productId,
                count: newCount
            }, function(res) {
                _this.renderCart(res);
            }, function(errMsg) {
                _this.showCartError();
            });
        });
        // delete single product
        $(document).on('click', '.cart-delete', function() {
            if(window.confirm('Are you sure you want to delete this item?')) {
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        // delete single product
        $(document).on('click', '.delete-selected', function() {
            if(window.confirm('Are you sure you want to delete all selected items?')) {
                var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked');
                for(var i = 0, iLength = $selectedItem.length; i < iLength; i++) {
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if(arrProductIds.length) {
                    _this.deleteCartProduct(arrProductIds.join(','));
                } else {
                    _mm.errorTips('No Selected Product.');
                }
            }
        });
        // check out
        $(document).on('click', '.btn-submit', function() {
            // total price > 0 
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = "./order-confirm.html";
            } else {
                _mm.errorTips('Please select products before checking out.');
            }
        });
    },
    // load cart
    loadCart: function() {
        var _this = this;
        _cart.getCartList(function(res) {
            _this.renderCart(res);
        }, function(errMsg) {
            _this.showCartError();
        })

    },
    renderCart: function(data) {
        this.filter(data);
        this.data.cartInfo = data;
        var cartHtml = _mm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
        // nav cart update
        _nav.loadCartCount();
    },
    // delete specified item, productive: colon splits productId
    deleteCartProduct: function(productIds) {
        var _this = this;
        _cart.deleteProduct(productIds, function(res) {
            _this.renderCart(res);
        }, function(errMsg) {
            _this.showCartError();
        });
    },
    filter: function(data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },
    showCartError: function() {
        $('.page-wrap').html('<p class="err-tips">Something is wrong. Please reload ths page.</p>');
    }
};

$(function() {
    page.init();
})