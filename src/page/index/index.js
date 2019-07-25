/*
* @Author: Zihao Tao
* @Date:   2018-10-31 23:36:11
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-07-24 18:24:55
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var _category = require('service/category-service.js');
var templateBanner = require('./banner.string');

let count = 0;

let templateCategory = `
  {{#list}}
      <li class="{{id}}">{{name}}</li>
  {{/list}}
`;

let templateIndex = `
  {{#list}}
      <li class="p-item">
          <div class="p-img-con">
              <a class="link" href="./detail?productId={{id}}" target="_blank">
                  <img class="p-img" src="{{imageHost}}{{mainImage}}" alt="{{name}}"/>
              </a>
          </div>
          <div class="p-name-con">
              <a class="p-name" href="./detail?productId={{id}}" target="_blank">{{name}}</a>
          </div>
      </li>
  {{/list}}
  {{^list}}
      <p class="err-tip"> Cannot find products matching this selection. </p>
  {{/list}}
`;

let templatePagination  = `<div class="pg-content">
    {{#pageArray}}
    {{#disabled}}
        <span class="pg-item disabled" data-value="{{value}}">{{name}}</span>
    {{/disabled}}
    {{^disabled}}
        {{#active}}
            <span class="pg-item active" data-value="{{value}}">{{name}}</span>
        {{/active}}
        {{^active}}
            <span class="pg-item" data-value="{{value}}">{{name}}</span>
        {{/active}}
    {{/disabled}}
    {{/pageArray}}
    <span class="pg-total">{{pageNum}} / {{pages}}</span>
</div>`;

(function(){
  window.addEventListener("load", initialize);

  function initialize(){

    var conf = {
        serverHost: ''
    };

    var page = {
        data: {
            listParam: {
                all: 0,
                keyword: _mm.getUrlParam('keyword') || '',
                categoryId: _mm.getUrlParam('categoryId') || '',
                orderBy: _mm.getUrlParam('orderBy') || 'default',
                pageNum: _mm.getUrlParam('pageNum') || 1,
                pageSize: _mm.getUrlParam('pageSize') || 6
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
            _category.getCategoryList(listParam, function(res) {
                listHtml = _mm.renderHtml(templateCategory, {
                    list: res
                }); 
                $('#Category-menubar').html(listHtml);
                $('#Category-menubar').children().each(function() {
                    $(this).click(function() {
                        var id = $(this).attr('class');                        _this.data.listParam.pageNum = 1;
                        _this.data.listParam.all = 1;
                        _this.data.listParam.categoryId = id;
                        _this.loadList();
                    });
                });
            });

            if(_this.data.listParam.all === 1) {
                _product.getProductList(listParam, function(res) {
                    listHtml = _mm.renderHtml(templateIndex, {
                        list: res.list
                    });
                    count = res.total;
                    $('.p-list-con').html(listHtml);
                    _this.loadPagination({
                        hasPreviousPage: res.hasPreviousPage,
                        prePage: res.prePage,
                        hasNextPage: res.hasNextPage,
                        nextPage: res.nextPage,
                        pageNum: res.pageNum,
                        pages: res.pages
                    });
                    document.getElementById('size').innerHTML = count + " items";
                    let cw = $('.p-img-con').width();
                    $('.p-item').css("height", 2* cw);
                    $('.p-img').css("height", 1.5 * cw);

                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            } else {
                _product.getAllProductList(listParam, function(res) {
                    listHtml = _mm.renderHtml(templateIndex, {
                        list: res.list
                    });
                    count = res.total;
                    $('.p-list-con').html(listHtml);
                    _this.loadPagination({
                        hasPreviousPage: res.hasPreviousPage,
                        prePage: res.prePage,
                        hasNextPage: res.hasNextPage,
                        nextPage: res.nextPage,
                        pageNum: res.pageNum,
                        pages: res.pages
                    });
                    document.getElementById('size').innerHTML = count + " items";
                    let cw = $('.p-img-con').width();
                    $('.p-item').css("height", 2* cw);
                    $('.p-img').css("height", 1.5 * cw);
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            }
        },
        // load pagination info
        loadPagination: function(pageInfo) {
            var _this = this;
            this.pagination ? '' : this.pagination = new Pagination();
            if(pageInfo.hasNextPage || pageInfo.hasPreviousPage) {
                $('.pagination').show();
                this.pagination.render($.extend({}, pageInfo, {
                        container:$('.pagination'),
                        onSelectPage: function(pageNum) {
                            _this.data.listParam.pageNum = pageNum;
                            _this.loadList();
                        }
                    }));
            } else {
                $('.pagination').hide();
            }
        }
    };

    page.init();
  };

})();
