/**
 * Created by Vizards on 16/4/23.
 * File: routes/account.js
 */

var express = require('express');
var passport = require('passport');
var crypto = require('crypto');
var path = require('path');
var fs = require('fs');

var config = require('../config');
var User = require('../models/user');
var Post = require('../models/post');
var mailer = require('../utils/mailer');

var router = express.Router();

router.route('/register')
    // Return to register page
    .get(function (req,res) {
        res.render('account/register.hbs',{title: '注册'});
    })
    // Accept users' form
    .post(function (req,res,next) {
        User.register(new User({username: req.body.username}),req.body.password,
            function (err,user) {
                if (err) return res.status(400).send(err.message || '未知原因');
                // Generating 20-bit activation code
                // "crypto" is a default mode in NodeJS
                crypto.randomBytes(20,function (err,buf) {
                    // Ensure the activation code won't be repeated
                    user.activeToken = user._id + buf.toString('hex');

                    // Set time-out = 24 hours
                    user.activeExpires = Date.now() + 24 * 3600 * 1000;
                        var link = config.schema + config.outerHost + ':' + config.outerPort + '/account/active/' + user.activeToken;

                        // Send activation mail
                        mailer.send({
                            to: req.body.username,
                            subject: '欢迎注册HBS博客',
                            html: '请点击<a href="' + link + '">此处</a>激活.'
                        });

                        // Save user object
                        user.save(function (err,user) {
                            if (err) return next(err);
                            res.send('已发送邮件至' + user.username + ',请在24小时之内按照邮件提示激活');
                        });
                });
            });
    });

router.get('/active/:activeToken', function (req,res,next) {
    User.findOne({
        activeToken: req.params.activeToken,
        activeExpires: {$gt: Date.now()}
    }, function (err,user) {
        if (err) return next(err);
        if (!user) {
            return res.render('message.hbs', {
                title: '激活失败',
                content: '您的激活链接无效,请重新<a href="/account/register">注册</a>'
            });
        }

        user.active = true;
        user.save(function (err,user) {
            if (err) return next(err);

            fs.readFile(process.cwd() + '/data/demo.md', function (err,data) {
                if (err) return next(err);
                Post.create({
                    title: '欢迎使用TMD博客',
                    content: data,
                    author: user.id
                });
            });

            res.render('message.hbs',{
                title: '激活成功',
                content: user.username + '已经成功激活,请前往<a href="/account/login">登录</a>'
            });
        });
    });
});

router.route('/forgot')
    .get(function (req,res) {
        res.render('account/forgot.hbs',{title:'忘记密码'});
    })
    .post(function (req,res,next) {
        User.findOne({username:req.body.username}, function (err,user) {
            if (err) return next(err);
            if (!user) return res.render('message.hbs',{
                title: '重置密码失败',
                content: '未找到用户名:' + req.body.username
            });

            crypto.randomBytes(20, function (err,buf) {
                user.resetPasswordToken = buf.toString('hex');
                user.resetPasswordExpires = Date.now() + 360000; // 1hour

                var link = config.schema + config.outerHost + ':' + config.outerPort + '/account/reset/' + user.resetPasswordToken;
                user.save(function (err,user) {
                    if (err) return next(err);
                    mailer.send({
                        to: req.body.username,
                        subject: '重置您的密码',
                        html: '请在一小时内点击<a href="' + link + '">此处</a> 完成重置'
                    });
                    res.render('message.hbs',{
                        title: '已经发送密码重置邮件',
                        content: '已发送密码重置邮件至:' + user.username + ',请按照邮件提示重置密码'
                    });
                });
            });
        });
    });

router.route('/reset/:token')
    .get(function (req,res) {
        User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {$gt: Date.now()}
        }, function (err,user) {
            if (err) return next(err);
            if (!user) {
                return res.render('message.hbs',{
                    title: '重置密码失败',
                    content: '重置链接无效或已经过期'
                });
            }
            res.render('account/reset.hbs', {
                title: '重置您的密码',
                user: user
            });
        });
    })
    .post(function (req,res) {
        User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {$gt: Date.now()}
        }, function (err,user) {
            if (err) return next(err);
            if (!user)
                return res.render('message.hbs',{
                    title: '重置密码失败',
                    content: '重置链接无效或已经过期'
                });

            user.setPassword(req.body.password, function (err,user) {
                if (err) return next(err);
                user.save(function (err,user) {
                    if (err) return next(err);
                    res.render('message.hbs',{
                        title: '重置密码成功',
                        content: user.username + '的密码已经成功重置,请前往<a href="' +
                        config.schema + config.outerHost + ':' + config.outerPort + '/account/login">登录</a>'
                    });
                });
            });
        });
    });

router.route('/login')
    .get(function (req,res) {
        res.render('account/login.hbs',{title:'登录'});
    })
    .post(passport.authenticate('local'), function (req,res,next) {
        if (!req.user.active) {
            req.logout(); // delete req.user & clear login session
            res.status(400);
            return res.send('Unactived');
        }
        res.end();
    });

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/account/login');
});

module.exports = router;
