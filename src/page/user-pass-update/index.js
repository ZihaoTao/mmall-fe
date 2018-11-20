/*
* @Author: Zihao Tao
* @Date:   2018-11-08 11:52:32
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-08 14:54:31
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

// logic of page
var page = {
    init: function() {
        this.onload();
        this.bindEvent();
    },
    onload: function() {
        // initiate left menu
        navSide.init({
            name: 'user-pass-update'
        });
    },
    /* Event bubbling */
    bindEvent : function(){
        var _this = this;
        // event after click
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function(res, msg){
                    _mm.successTips(msg);
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    validateForm: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        if(!_mm.validate(formData.password, 'require')) {
            result.msg = 'The password cannot be blank.';
            return result;
        }
        if(!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = 'The new password must have more than 6 characters.';
            return result;
        }
        if(formData.passwordConfirm !== formData.passwordNew){
            result.msg = 'Confirmation does not match password.';
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