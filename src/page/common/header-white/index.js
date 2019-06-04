/*
* @Author: Zihao Tao
* @Date:   2018-11-06 21:04:25
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-06-04 00:55:23
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
// headerWhite
var headerWhite = {
    init : function(){
        this.bindEvent();
        this.onload();
    },
    onload: function() {
        var keyword= _mm.getUrlParam('keyword');
        // if keyword exists, fill input
        if(keyword) {
            $('#search-input').val(keyword);
        };
    },
    bindEvent : function(){
        var _this = this;
        // click search btn, submit searching
        $('#search-btn').click(function() {
            _this.searchSubmit();
        });
        // input enter, submit search
        $('#search-input').keyup(function(e) {
            // 13 is keyCode of enter
            if(e.keyCode === 13) {
                _this.searchSubmit();
            }
        });
    },
    // submit search
    searchSubmit: function() {
        var keyword = $.trim($('#search-input').val());
        // if there is keyword in submittion, jump to list website
        if(keyword) {
            window.location.href = './list.html?keyword=' + keyword;
            // if there is no keyword in submittion, jump to home
        } else {
            _mm.goHome();
        }
    }
};
headerWhite.init();