/**
 * Created by Vizards on 16/4/27.
 * File: utils/mailer.js
 */

// Import lodash & nodemailer
var nodemailer = require('nodemailer');
var _ = require('lodash');
var config = require('../config');

// Create SMTP client object
var transporter = nodemailer.createTransport(config.smtp);

// Create a default mail model object
var defaultMail = {
    // Sender
    from: 'TMY博客 <' + config.smtp.auth.user + '>',
    // subject
    // subject: '邮件模块正常工作通知',
    // Receiver
    // to: '1429005143@qq.com',
    // Mail content, HTML
    // text: '当你收到这封邮件时,邮件模块已经在126邮箱上正常运行了'
};

function sendMail(mail) {
    mail = _.merge({},defaultMail,mail);

    transporter.sendMail(mail, function (error,info) {
        if (error) return console.log('mail sent error',config.smtp,mail,error);
        console.log('Message sent:' + info.response);
    });
}

module.exports = {
    send: sendMail
};