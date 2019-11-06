/*
* @Author: Zihao Tao
* @Date:   2018-11-18 19:58:59
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-18 23:56:24
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var Pagination = require('util/pagination/index.js');
var _order = require('service/order-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

// logic of page
var page = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 10
        }
    },
    init: function() {
        this.onload();
    },
    onload: function() {
        this.loadOrderList();
        // initiate left menu
        navSide.init({
            name: 'order-list'
        });
    },
    loadOrderList: function() {
        var _this = this,
            orderListHtml = '',
            $listCon = $('.order-list-con');
            $listCon.html('<div class="loading"></div>');
        _order.getOrderList(_this.data.listParam, function(res) {
            orderListHtml = _mm.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function(errMsg) {
            $listCon.html('<p class="err-tips">Cannot load order, please reload the page.</p>');
            window.location.hash = "http://www.taozihao.xyz/user-login.html?redirect=http%3A%2F%2Fwww.taozihao.xyz%2Forder-list.html";
        });
    },
    loadPagination: function(pageInfo) {
        var _this = this;
        this.pagination ? '' : this.pagination = new Pagination();
        this.pagination.render($.extend({}, pageInfo, {
            container:$('.pagination'), 
            onSelectPage: function(pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};

$(function() {
    page.init();
});