/*
* @Author: Zihao Tao
* @Date:   2018-11-14 23:22:34
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-03-01 16:42:15
*/

'user strict'
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _cart = require('service/cart-service.js');
var _product = require('service/product-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var page = {
    data: {
            productId: _mm.getUrlParam('productId') || ''
    },
    init: function() {
        this.obload();
        this.bindEvent();
    },
    obload: function() {
        // if no product id, go home
        if(!this.data.productId) {
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        // pic preview
        // can not bind event when loading
        $(document).on('mouseenter', '.p-img-item', function() {
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // count
        $(document).on('click', '.p-count-btn', function() {
            var type = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount = $('.p-count'),
                currCount = parseInt($pCount.val()),
                minCount = 1,
                maxCount = _this.data.detailInfo.stock || 1;
            if(type === 'plus') {
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            } else if (type === 'minus') {
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        // add to cart
        $(document).on('click', '.cart-add', function() {
            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            }, function(res) {
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg) {
                _mm.errorTips(errMsg);
            });
        });
    },
    // load detail
    loadDetail: function() {
        var _this = this;
        var html = '';
        // loading
        $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        // reqire detail info
        _product.getProductDetail(this.data.productId, function(res) {
            _this.filter(res);
            // keep res info
            _this.data.detailInfo = res;
            // render
            html = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
            var cw = $('.p-img-item').width();
            $('.p-img-item').css({'height':cw+'px'});
            var w = $('.p-img-con').width();
            $('.p-img-con').css({'height':w + cw + 10 +'px'});
        }, function(errMsg) {
            $pageWrap.html('<p class="err-tip"> Cannot find this product. </p>');
        });
    },
    filter: function(data) {
        data.subImages = data.subImages.split(',');
    }
};

$(function() {
    page.init();
})