var mailer = require('./utils/mailer');

mailer.send({
    to: '1429005143@qq.com',
    subject: '邮件模块化正常通知',
    text: '当你收到这封邮件时,说明邮件模块mailer.js已经被成功调用'
});