/*
* @Author: Zihao Tao
* @Date:   2018-10-31 23:36:11
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-05-08 11:42:02
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
        dots:true
    });
    //event listener
    $('.banner-con .banner-arrow').click(function() {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    })
    var cw = $('.floor-item').width();
    $('.floor-item').css({'height':cw+'px'});

    if(window.innerWidth > 1000) {
        var bw = $('.banner-img').width();
        $('.banner-img').css({'height':2.4 * cw+'px'});
        $('.dots').css({'top':cw+'px'});
    } else {
        var bw = $('.banner-img').width();
        $('.banner-img').css({'height':1.4* cw+'px'});
        $('.dots').css({'top':0.6 * cw+'px'});
    }
    
});
