/*
* @Author: Zihao Tao
* @Date:   2018-11-06 20:35:36
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-19 15:11:05
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
// nav side
var navSide = {
    option: {
        name: '',
        navList: [
            {name: 'user-center', desc: 'User Center', href: './user-center.html'},
            {name: 'order-list', desc: 'My Order', href: './order-list.html'},
            {name: 'user-pass-update', desc: 'Change Password', href: './user-pass-update.html'},
            {name: 'about', desc: 'About', href: './about.html'}
        ]
    },
    init : function(option){
        // combine
        $.extend(this.option, option);
        this.renderNav();
    },
    // render nav
    renderNav: function() {
        // compute active data
        for (var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        };
        // render list data
        var navHtml = _mm.renderHtml(templateIndex, {
            navList: this.option.navList
        });
        // put html into container
        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;