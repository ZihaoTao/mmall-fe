/*
* @Author: Zihao Tao
* @Date:   2019-07-24 16:20:25
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-07-24 16:24:02
*/
'use strict';

var _mm = require('util/mm.js');

var _category = {
    getCategoryList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/manage/category/get_category.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _category;