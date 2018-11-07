/*
* @Author: Zihao Tao
* @Date:   2018-11-06 20:35:36
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-06 22:57:42
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
            {name: 'user-center', desc: 'user center', href: './user-ceneter.html'},
            {name: 'order-list', desc: 'My order', href: './oreder-list.html'},
            {name: 'pass-update', desc: 'Change password', href: './pass-update.html'},
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