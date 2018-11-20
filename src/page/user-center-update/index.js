/*
* @Author: Zihao Tao
* @Date:   2018-11-07 22:04:49
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-08 01:35:33
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
        this.bindEvent();
    },
    onload: function() {
        // initiate left menu
        navSide.init({
            name: 'user-center'
        });
       this.loadUserInfo();
    },
    /* Event bubbling */
    bindEvent : function(){
        var _this = this;
        // event after click
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updateUserInfo(userInfo, function(res, msg){
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    loadUserInfo: function() {
        var userHtml = '';
        _user.getUserInfo(function(res) {
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg) {
            _mm.errorTips(errMsg);
        });
    }, 
    validateForm: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        if(!_mm.validate(formData.phone, 'phone')) {
            result.msg = 'The phone number does not look right.';
            return result;
        }
        if(!_mm.validate(formData.email, 'email')) {
            result.msg = 'The email does not look right.';
            return result;
        }
        if(!_mm.validate(formData.question, 'require')){
            result.msg = 'Security quesiton cannot be blank.';
            return result;
        }
        if(!_mm.validate(formData.answer, 'require')) {
            result.msg = 'Answer of security quesiton cannot be blank.';
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