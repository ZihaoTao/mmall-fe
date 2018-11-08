/*
* @Author: Zihao Tao
* @Date:   2018-11-06 23:33:20
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-07 00:19:47
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function() {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    // show reminder depend on its type
    $element.show();
})