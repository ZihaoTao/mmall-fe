/*
* @Author: Zihao Tao
* @Date:   2018-11-14 17:39:47
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-04 12:55:47
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header-white/index.js');
var _product = require('service/product-service.js');
var _mm = require('util/mm.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        listParam: {
            keyword: _mm.getUrlParam('keyword') || '',
            categoryId: _mm.getUrlParam('categoryId') || '',
            orderBy: _mm.getUrlParam('orderBy') || 'default',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 5
        }
    },
    init: function() {
        this.obload();
        this.bindEvent();
    },
    obload: function() {
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        // sort event
        $('.sort-item').click(function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            // click sort by featured
            if($this.data('type') === 'default'){
                // active
                if($this.hasClass('active')) {
                    return;
                }
                // not active
                else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // sort by price
            else if($this.data('type') === 'price'){
                // active class 
                $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // reload list
            _this.loadList();
        });
    },
    // load list
    loadList: function() {
        var _this = this,
            listHtml = '',
            listParam = this.data.listParam;
        _product.getProductList(listParam, function(res) {
            listHtml = _mm.renderHtml(templateIndex, {
                list: res.list
            });
            $('.p-list-con').html(listHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function(errMsg) {
            _mm.errorTips(errMsg);
        });
    }, 
    // load pagination info
    loadPagination: function(pageInfo) {
        var _this = this;
        this.pagination ? '' : this.pagination = new Pagination();
        this.pagination.render($.extend({}, pageInfo, {
                container:$('.pagination'), 
                onSelectPage: function(pageNum) {
                    _this.data.listParam.pageNum = pageNum;
                    _this.loadList();
                }
            }));
    }
};
$(function() {
    $('.p-list-con .p-item .p-img-con').height($('.p-list-con .p-item .p-img-con').width());
    page.init();

})