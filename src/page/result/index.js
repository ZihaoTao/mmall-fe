/*
* @Author: Zihao Tao
* @Date:   2018-11-06 23:33:20
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-19 11:32:41
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function() {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    if(type = 'payment') {
        var orderNumber = _mm.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }

    // show reminder depend on its type
    $element.show();
})