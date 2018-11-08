/*
* @Author: Zihao Tao
* @Date:   2018-11-07 13:38:06
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-07 19:37:22
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

// Error reminder of table

var usernameError = {
    show : function(errMsg) {
        $('#error-username').show().find('.err-msg').text(errMsg);
    },
    hide: function() {
        $('#error-username').hide().find('.err-msg').text('');
    }
};

var passwordError = {
    show : function(errMsg) {
        $('#error-password').show().find('.err-msg').text(errMsg);
    },
    hide: function() {
        $('#error-password').hide().find('.err-msg').text('');
    }
};

var passwordConfirmError = {
    show : function(errMsg) {
        $('#error-password-confirm').show().find('.err-msg').text(errMsg);
    },
    hide: function() {
        $('#error-password-confirm').hide().find('.err-msg').text('');
    }
};

// logic of page
var page = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        // verify username
        $('#username').blur(function() {
            var username = $.trim($(this).val());
            // if username is blank, no validation
            if(!username) {
                return;
            }
            _user.checkUsername(username, function(res) {
                usernameError.hide();
            }, function(errMsg) {
                usernameError.show(errMsg);
            });
        });
        // verify password
        $('#password').blur(function() {
            var password = $.trim($(this).val());
            var passwordConfirm = $.trim($('#password-confirm').val());
            if(password.length < 6) {
                passwordError.show('Password is too short.'); 
            } else {
                passwordError.hide();
            }
            if(passwordConfirm.length > 0) {
                if(password === passwordConfirm) {
                    passwordConfirmError.hide();
                } else {
                    passwordConfirmError.show('Must match the previous entry');
                }
            }
        });
        // verify password confirmation
        $('#password-confirm').blur(function() {
            var password = $.trim($('#password').val());
            var passwordConfirm = $.trim($(this).val());
            if(password === passwordConfirm) {
                passwordConfirmError.hide();
            } else {
                passwordConfirmError.show('Must match the previous entry');
            }
        });
        // click sign up
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
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        },
        // result of table validation
        validateResult = this.formValidate(formData);
        // return seccess
        if(validateResult.status) {
            _user.register(formData, function(res) {
                window.location.href = './result.html?type=register';
            }, function(errMsg) {
                usernameError.show(errMsg);
            });
        } else {
            // error reminder
            usernameError.show(validateResult.msg);
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
        if(formData.password.length < 6) {
            result.msg = 'Password is too short.';
            return result;
        }
        if(formData.password !== formData.passwordConfirm) {
            result.msg = 'Confirmation does not match password.';
            return result;
        }
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