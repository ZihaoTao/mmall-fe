/*
* @Author: Zihao Tao
* @Date:   2018-11-17 21:47:18
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-11-18 18:12:14
*/

'user strict';

var _address = require('service/address-service.js');
var _mm = require('util/mm.js');
var templateAddressModel = require('./address-model.string');
var _cities = require('state-cities');

var addressModel = {
    show: function(option) {
        this.option = option;
        this.option.data = option.data || {};
        this.$modelWrap = $('.model-wrap');
        this.loadModel();
        this.bindEvent();
    },
    loadModel: function() {
        var addressModelHtml = _mm.renderHtml(templateAddressModel, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });
        this.$modelWrap.html(addressModelHtml);
        // load states
        this.loadState();
    },
    loadState: function() {
        var states = _cities.getStates() || [],
            $StateSelect = this.$modelWrap.find('#receiver-state');
        $StateSelect.html(this.getSelectOption(states));
        if(this.option.isUpdate && this.option.data.receiverProvince) {
            $StateSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    // param: array
    // return: html
    getSelectOption: function(optionArray) {
        var html = '<option value="">--Please select--</option>';
        for(var i = 0, length = optionArray.length; i < length; i++) {
            html += '<option value="'+ optionArray[i] +'">'+ optionArray[i] +'</option>';
        }
        return html;
    },
    loadCities: function(stateName) {
        var cities = _cities.getCities(stateName) || [],
            $citySelect = this.$modelWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities)); 
        if(this.option.isUpdate && this.option.data.receiverCity) {
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    getReceiverInfo: function() {
        var receiverInfo = {},
            result = {
                status: false
            };
        receiverInfo.receiverName = $.trim(this.$modelWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = this.$modelWrap.find('#receiver-state').val();
        receiverInfo.receiverCity = this.$modelWrap.find('#receiver-city').val();
        receiverInfo.receiverPhone = $.trim(this.$modelWrap.find('#receiver-phone').val());
        receiverInfo.receiverAddress = $.trim(this.$modelWrap.find('#receiver-address').val());
        receiverInfo.receiverZip = $.trim(this.$modelWrap.find('#receiver-zip').val());
        if(this.option.isUpdate) {
            receiverInfo.id = this.$modelWrap.find('#receiver-id').val();
        }
        // verification
        if(!receiverInfo.receiverName) {
            result.errMsg = 'Please input receiver name';
        } else if(!receiverInfo.receiverProvince) {
            result.errMsg = 'Please input receiver state';
        } else if(!receiverInfo.receiverCity) {
            result.errMsg = 'Please input receiver city';
        } else if(!receiverInfo.receiverAddress) {
            result.errMsg = 'Please input receiver address';
        } else if(!receiverInfo.receiverPhone) {
            result.errMsg = 'Please input receiver phone';
        } else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    },
    bindEvent: function() {
        var _this = this;
        this.$modelWrap.find('#receiver-state').change(function() {
            var selectedState = $(this).val();
            _this.loadCities(selectedState);
        });
        this.$modelWrap.find('.address-btn').click(function() {
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate;
                // add new address and pass verification
                if(!isUpdate && receiverInfo.status) {
                    _address.save(receiverInfo.data, function(res){
                        _mm.successTips('Your address has been added successfully.');
                        _this.hide();
                        typeof _this.option.onSuccess === 'function' 
                            && _this.option.onSuccess(res);
                    }, function(errMsg) {
                        _mm.errorTips(errMsg);
                    })
                    // update address and pass verification
                } else if(isUpdate && receiverInfo.status) {
                    _address.update(receiverInfo.data, function(res){
                        _mm.successTips('Your address has been updated successfully.');
                        _this.hide();
                        typeof _this.option.onSuccess === 'function' 
                            && _this.option.onSuccess(res);
                    }, function(errMsg) {
                        _mm.errorTips(errMsg);
                    })
                    // not pass verification
                } else {
                    _mm.errorTips(receiverInfo.errMsg || 'Something is wrong.');
                }
        });
        this.$modelWrap.find('.model-container').click(function(e) {
            e.stopPropagation();
        });
        this.$modelWrap.find('.close').click(function() {
            _this.hide();
        });
    }, 
    hide: function() {
        this.$modelWrap.empty();
    }
};

module.exports = addressModel;
