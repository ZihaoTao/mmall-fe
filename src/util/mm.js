/*
* @Author: Zihao Tao
* @Date:   2018-11-06 14:28:19
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-14 14:42:00
*/
'use strict';

var Hogan = require('hogan.js');
var conf = {
    serverHost: ''
}
var _mm = {
    // reques
    request : function(param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function(res) {
                // request seccess
                if(0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // need to log in
                else if(10 === res.status) {
                    _this.doLogin();
                }
                // request failed
                else if(1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function(err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    // get server address
    getServerUrl : function(path) {
        return conf.serverHost + path;
    },
    // get url param
    getUrlParam: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // html rendering template
    renderHtml: function(htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate);
        var result = template.render(data);
        return result;
    },
    // remind success
    successTips: function(msg) {
        alert(msg || 'Operation successful');
    },
    // remind success
    errorTips: function(msg) {
        alert(msg || 'Operation failed');
    },
    // validation, support if null, mobile number, email address
    validate: function(value, type) {
        var value = $.trim(value);
        // if null validation
        if('require' === type){
            return !!value;
        }
        // mobile validation
        // Regular Expression
        if('phone' === type) {
            return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(value);
        }
        // email validation
        // Regular Expression
        if('email' === type) {
            return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value);
        }
    },
    // login
    doLogin : function() {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome: function() {
        window.location.href = './index.html';
    }
};

module.exports = _mm;