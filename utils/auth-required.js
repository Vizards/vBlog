/**
 * Created by Vizards on 16/4/27.
 * File: utils/auth-required.js
 */

module.exports = function (req,res,next) {
    if (req.user && req.user.active) return next();
    return res.redirect('/account/login?next=' + req.originalUrl);
};

