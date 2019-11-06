/*
* @Author: Zihao Tao
* @Date:   2018-10-31 23:36:11
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-04 17:05:27
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var templateBanner = require('./banner.string');

$(function() {
    // banner render
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // initilaize banner
    var $slider = $('.banner').unslider({
        speed: 1000,               //  The speed to animate each slide (in milliseconds)
        delay: 3500,              //  The delay between slide animations (in milliseconds)
        keys: true,               //  Enable keyboard (left, right) arrow shortcuts
        dots: false,               //  Display dot navigation
        fluid: true              //  Support responsive design. May break non-responsive designs
    });
    // //event listener
    // $('.banner-con .banner-arrow').click(function() {
    //     var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    //     $slider.data('unslider')[forward]();
    // });

    $('.floor-wrap .floor-list .floor-item').hover(function() {
        $('.floor-wrap .floor-list .floor-item').toggleClass('item_hover');
        $(this).toggleClass('item_hover');
    });
    
    $('.home-title').height($('.home-title').width() / 3.5);
      
});
