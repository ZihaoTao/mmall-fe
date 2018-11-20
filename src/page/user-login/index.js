/*
* @Author: Zihao Tao
* @Date:   2018-10-31 23:56:05
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-07 02:25:56
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

// Error reminder of table
var formError = {
    show : function(errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function() {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// logic of page
var page = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        // click log in
        $('#submit').click(function() {
            _this.submit();
        });
        // if click enter, submit
        $('.user-content').keyup(function(e) {
            // 13 is enter's keyCode
            if(e.keyCode === 13) {
                 _this.submit();
            }
        });
    },
    // submit table 
    submit: function() {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        },
        // result of table validation
        validateResult = this.formValidate(formData);
        // return seccess
        if(validateResult.status) {
            _user.login(formData, function(res) {
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function(errMsg) {
                formError.show(errMsg);
            });
        } else {
            // error reminder
            formError.show(validateResult.msg);
        }
    },
    // table validation
    formValidate: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        if(!_mm.validate(formData.username, 'require')) {
            result.msg = 'Username cannot be blank.';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')) {
            result.msg = 'Password cannot be blank.';
            return result;
        }
        result.status = true;
        result.msg = 'Verified';
        return result;
    }
};

$(function() {
    page.init();
});