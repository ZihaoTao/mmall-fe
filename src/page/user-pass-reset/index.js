/*
* @Author: Zihao Tao
* @Date:   2018-11-07 19:55:23
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-07 21:45:15
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
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function() {
        this.onload();
        this.bindEvent();
    },
    onload: function(){
        this.loadStepUsername();
    },
    bindEvent: function() {
        var _this = this;
        // click after username input
        $('#submit-username').click(function() {
            var username = $.trim($('#username').val());
            // username exists
            if(username) {
                _user.getQuestion(username, function(res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg) {
                    formError.show(errMsg);
                });
                // username does not exist
            } else {
                formError.show('Please input user name');
            }
        });
        // click after scurity quesiton input
        $('#submit-question').click(function() {
            var answer = $.trim($('#answer').val());
            if(answer) {
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function(res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function(errMsg) {
                    formError.show(errMsg);
                });
                // username does not exist
            } else {
                formError.show('Please input the answer');
            }
        });
        $('#submit-password').click(function() {
            var password = $.trim($('#password').val());
            if(password && password.length >= 6) {
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function(res) {
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('Please input new password, your password must contain more than 6 characters');
            }
        });
    },
    // load the first step
    loadStepUsername: function() {
        $('.step-username').show();
    },
    // load the second step
    loadStepQuestion: function() {
        // clean error reminder
        formError.hide();
        // clean username input
        $('.step-username').hide()
        // show question input
        .siblings('.step-question')
        // show question
        .show().find('.question').text(this.data.question);
    },
    // load the third step
    loadStepPassword: function() {
        formError.hide();
        $('.step-question').hide().siblings('.step-password').show();
    }
};

$(function() {
    page.init();
});