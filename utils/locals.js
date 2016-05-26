/**
 * Created by Vizards on 16/5/2.
 * File: utils/local.js
 */

var cfg = require('../config');

module.exports = function (req,res,next) {
    res.locals.req = req;
    res.locals.res = res;
    res.locals.config = cfg;

    next();
};