/*
* @Author: Zihao Tao
* @Date:   2018-11-14 21:24:53
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-14 22:56:45
*/

'use strict';
require('./index.css');
var _mm                 = require('util/mm.js');
var templatePagination  = require('./index.string');

var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    };
    // click event
    $(document).on('click', '.pg-item', function(){
        var $this = $(this);
        // no reaction to active and disabled buttons
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
        typeof _this.option.onSelectPage === 'function' 
            ? _this.option.onSelectPage($this.data('value')) : null;
    });
};
// render pagination
// Prototypal inheritance, like extension
Pagination.prototype.render = function(userOption){
    // combination
    // put defaultOption into {}, then put userOption into {}
    this.option = $.extend({}, this.defaultOption, userOption);
    // if object is jquery
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    // if has 1 page
    if(this.option.pages <= 1){
        return;
    }
    // put pagination into html
    this.option.container.html(this.getPaginationHtml());
};
// get pagination html, |last page| 2 3 4 =5= 6 7 8|next page|  5/9
Pagination.prototype.getPaginationHtml = function(){
    var html = '',
        option  = this.option,
        pageArray = [],
        start = option.pageNum - option.pageRange > 0 
            ? option.pageNum - option.pageRange : 1,
        end = option.pageNum + option.pageRange < option.pages
            ? option.pageNum + option.pageRange : option.pages;
    // last page
    pageArray.push({
        name: 'Last Page',
        value: this.option.prePage,
        disabled: !this.option.hasPreviousPage
    });
    for(var i = start; i <= end; i++){
        pageArray.push({
            name: i,
            value: i,
            active: (i === option.pageNum)
        });
    };
    // next page
    pageArray.push({
        name: 'Next Page',
        value: this.option.nextPage,
        disabled: !this.option.hasNextPage
    });
    html = _mm.renderHtml(templatePagination, {
        pageArray: pageArray,
        pageNum: option.pageNum,
        pages: option.pages
    });
    return html;
};

module.exports = Pagination;