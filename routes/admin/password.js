/**
 * Created by Vizards on 16/4/28.
 * File: routes/admin/password.js
 */

var express = require('express');
var User = require('../../models/user.js');
var Post = require('../../models/post.js');
var router = express.Router();

router.route ('/')
    .get(function (req,res) {
        res.render('admin/password.hbs',{
            user: req.user,
            active_password: true,
            title: '更改密码'
        })
    })
    .post(function (req,res) {
        if (req.body.new != req.body.repeat) {
            res.render('admin/password.hbs',{
                user: req.user,
                active_password: true,
                error: '两次密码不一致'
            });
        } else {
            req.user.setPassword(req.body.new, function (err,cb) {
                if (err) return next(err);
                User.save(function (err,user) {
                    if (err) next(err);
                    res.render('admin/password.hbs', {
                        user: user,
                        active_password: true
                    });
                });
            });
        }
    });

module.exports = router;
