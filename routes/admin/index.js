/**
 * Created by Vizards on 16/4/28.
 * File: routes/admin/index.js
 */

var express = require('express');
var router = express.Router();

router.use('/profile',require('./profile'));
router.use('/password',require('./password'));
router.use('/post',require('./post'));

module.exports = router;
