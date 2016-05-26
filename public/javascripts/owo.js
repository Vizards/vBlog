/**
 * Created by Vizards on 16/5/7.
 * File: public/javascripts/owo.js
 */

var OwO_demo = new OwO({
    logo: '骚年不来一发表情包吗',
    container: document.getElementsByClassName('OwO')[0],
    target: document.getElementsByClassName('form-control')[0],
    api: '/lib/owo/OwO.json',
    position: 'down',
    width: '100%',
    maxHeight: '250px'
});