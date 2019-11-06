/*
* @Author: Zihao Tao
* @Date:   2018-11-19 15:15:57
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-19 15:16:35
*/
'user strict' 

require('page/common/header/index.js');
require('page/common/nav/index.js');

var navSide = require('page/common/nav-side/index.js');

// logic of page
var page = {
    init: function() {
        this.onload();
    },
    onload: function() {
        // initiate left menu
        navSide.init({
            name: 'about'
        });
    }
};

$(function() {
    page.init();
});
