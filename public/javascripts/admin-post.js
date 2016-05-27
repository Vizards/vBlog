/**
 * Created by Vizards on 16/4/28.
 * File: public/javascripts/admin-posts.js
 */

function save(){
    // validation
    if($('#title').val().trim()==='')
        return $('.alert-danger').html('标题不能为空').show();
    $('form').submit();
}

$(function(){
    if($('body#edit').length === 0) return;

    $('#content').bind('input propertychange', function(){
        $('#preview').html(marked($('#content').val()));
    });
    $('#content').trigger('input');
});
