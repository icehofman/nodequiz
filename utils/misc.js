/**
 * Miscellaneous utilities.
 * Author: GP.
 * Version: 1.2
 * Release Date: 24-Apr-2014
 */

/**
 * Module dependencies.
 */

var config = require('../config/config');

/**
 * Find max of a 2D array by column.
 * A dict needs to be passed to this function, of the form
 * dict = {
 *          'key1': [[..],[..],...],
 *          'key2': [[..],[..],...],
 *          ...
 * }
 *
 * @param {String} 'max' or 'min'.
 * @param {Object} dictionary of arrays to be sorted.
 * @param {Number} column in array based on which max/min needs to be calculated.
 * @param {Function} callback.
 * @api public
 */

var getMaxOrMinofArray = function(maxormin, array_dict, column, fn) {
    var array = Object.keys(array_dict).map(function(key) {
        return array_dict[key];
    });
    var max = array.reduce(function(previousVal, currentItem, array, arr) {
        if (maxormin == 'max') {
            return Math.max(previousVal, currentItem[column]);
        } else {
            return Math.min(previousVal, currentItem[column]);
        }
    }, Number.NEGATIVE_INFINITY);

    fn(null, array.filter(function(i) {
        return (null, i[1] == max);
    }));
}

/**
 * Gets starting day of this week and returns a Date() object for that day.
 *
 * @param {Function} callback.
 * @api public
 */

var getMonday = function(fn) {
    var today = new Date();
    var day = today.getDay(),
        diff = today.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    fn(null, new Date(today.setDate(diff)));
}

var validateSignUpForm = function(request_body, fn) {
    var username = request_body.username;
    var password = request_body.first_password;
    var password1 = request_body.second_password;
    var security_question = request_body.security_question;
    var security_answer = request_body.security_answer;

    if (username && password && password1 && security_question && security_answer) {
        if (password === password1) {
            return fn(null, true);
        } else {
            return fn(config.ERR_SIGNUP_PASSWORD_MISMATCH, false);
        }
    } else {
        return fn(config.ERR_SIGNUP_DATA_MISSING, false);
    }
}

/**
 * Module exports.
 */

module.exports = {
    getMaxOrMinofArray: getMaxOrMinofArray,
    getMonday: getMonday,
    validateSignUpForm: validateSignUpForm
}