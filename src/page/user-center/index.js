/*
* @Author: Zihao Tao
* @Date:   2018-11-07 21:54:46
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-19 15:07:00
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

// logic of page
var page = {
    init: function() {
        this.onload();
    },
    onload: function() {
        // initiate left menu
        navSide.init({
            name: 'user-center'
        });
       this.loadUserInfo();
    },
    loadUserInfo: function() {
        var userHtml = '';
        _user.getUserInfo(function(res) {
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg) {
            _mm.errorTips(errMsg);
        });
    }
};

$(function() {
    page.init();
});