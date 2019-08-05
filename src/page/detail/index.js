/*
* @Author: Zihao Tao
* @Date:   2018-11-14 23:22:34
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-04 00:58:28
*/

'user strict'
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header-white/index.js');
var _cart = require('service/cart-service.js');
var _product = require('service/product-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
var template = require('./detail.string');

let page = {
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
          let _this = this;
          // pic preview
          // can not bind event when loading
          $(document).on('mouseenter', '.p-img-item', function() {
              let imageUrl = $(this).find('.p-img').attr('src');
              $('.main-img').attr('src', imageUrl);
          });
          // count
          $(document).on('click', '.p-count-btn', function() {
              let type = $(this).hasClass('plus') ? 'plus' : 'minus',
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


          let count = 1;
          $(document).on('click', '.up', function(event) {
              if(count > 1) {
                count--;
              }
              $('.active').removeClass('active');
              $('.slideDiv > div:nth-child(' + count + ')').addClass('active');
              let bg = $('.active').find('img').attr('src');
              $('.right').find('img').attr('src',bg);
              event.stopPropagation();
          });

          $(document).on('click', '.down', function(event) {
            let len = $(".slideDiv").children().length;
            if(count < len) {
              count++;
            }
            $('.active').removeClass('active');
            $('.slideDiv > div:nth-child(' + count + ')').addClass('active');
            let bg = $('.active').find('img').attr('src');
            $('.right').find('img').attr('src',bg);
            event.stopPropagation();
          });

          $(document).on('hover', '.slide', function(event) {
            let _this = this;
            count = $('.slide').index(_this) + 1;
            $('.active').removeClass('active');
            $('.slideDiv > div:nth-child(' + count + ')').addClass('active');
            let bg = $('.active').find('img').attr('src');
            $('.right').find('img').attr('src',bg);
            event.stopPropagation();
          });


          $(document).on('click', '.description', function(event) {
            $('.select').removeClass('select');
            $('.description').addClass('select');
            $('.description-con').show();
            $('.detail-con').hide();
            $('.delivery-con').hide();
            event.stopPropagation(); 
          });

          $(document).on('click', '.detail', function(event) {
            $('.select').removeClass('select');
            $('.detail').addClass('select');
            $('.description-con').hide();
            $('.detail-con').show();
            $('.delivery-con').hide();
            event.stopPropagation(); 
          });

          $(document).on('click', '.delivery', function(event) {
            $('.select').removeClass('select');
            $('.delivery').addClass('select');
            $('.description-con').hide();
            $('.detail-con').hide();
            $('.delivery-con').show();
            event.stopPropagation(); 
          });
      },
      // load detail
      loadDetail: function() {
          let _this = this;
          let html = '';
          // loading
          let $pageWrap = $('.page-wrap');
          $pageWrap.html('<div class="loading"></div>');
          // reqire detail info
          _product.getProductDetail(this.data.productId, function(res) {
              _this.filter(res);
              // keep res info
              _this.data.detailInfo = res;
              // render
              html = _mm.renderHtml(templateIndex, res);
              $pageWrap.html(html);
              let arr = res.color.split("_");
              for(let i = 0; i < arr.length; i++) {
                let d = document.createElement('div');
                d.classList.add('colors-item');
                d.classList.add('color' + arr[i]);
                $('.color-selector').append(d);
              }

              let ar = res.sizeRange.split("_");
              for(let i = 0; i < ar.length; i++) {
                let o = document.createElement('div');
                o.classList.add('size-item');
                o.innerText = ar[i];
                $('.size-select').append(o);
              }
              _this.loadList(res.categoryId);
          }, function(errMsg) {
              $pageWrap.html('<p class="err-tip"> Cannot find this product. </p>');
          });
      },
      loadList: function(categoryId) {
          let _this = this,
          listHtml = '',
          listParam = {
            categoryId: categoryId
          }
          _product.getProductList(listParam, function(res) {
            
              let arr = res.list;
              let result = [];
              for(let i = 0; i < arr.length; i++) {
                if(arr[i].id != _this.data.productId && result.length < 4) {
                  result.push(arr[i]);
                }
              }
              
              listHtml = _mm.renderHtml(template, {
                  list: result
              });
              $('.youMayLike').html(listHtml);


              let cw = $('.p-img-con').width();
              $('.p-img-con').css("height", cw);
          }, function(errMsg) {
              _mm.errorTips(errMsg);
          });
          
      }, 
      filter: function(data) {
          if(data.subImages){
              data.subImages = data.subImages.split(',');
          }
      }
    };

$(function() {
    page.init();
})