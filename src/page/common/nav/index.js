/*
* @Author: Zihao Tao
* @Date:   2018-11-06 20:35:36
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-06 22:07:53
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
// nav
var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },

    bindEvent : function(){
        // login click event
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        // register click event
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        // logout click event
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },

    // load user info
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function(errMsg){
            // do nothing
        });
    },

    // load cart number
    loadCartCount : function(){
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
        }, function(errMsg){
            $('.nav .cart-count').text(0);
        });
    }
};

module.exports = nav.init();