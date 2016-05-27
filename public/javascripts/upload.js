/**
 * Created by Vizards on 16/5/27.
 */

String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var keys in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})","g");
                    result = result.replace(reg,args[key]);
                }
            }
        } else {
            for (var i=0; i<arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})","g");
                    result = result.replace(reg,arguments[i]);
                }
            }
        }
    }
    return result;
};

$(function () {
    $('#btnSub').on('click',function () {
        var fulAvatarVal = $('fulAvatar').val(),
            errorTip = '<div id="errorTip" class="alert alert-warning">{{0}}</div>'

        $("#errorTip,#alt_warning").remove();

        if (fulAvatarVal.length == 0) {
           $('#upload-container').prepend(errorTip.format('请选择要上传的文件'));

            return false;
        }

        var extName = fulAvatarVal.substring(fulAvatarVal.lastIndexOf('.'),fulAvatarVal.length).toLowerCase();

        if(extName != '.md') {
            $('#upload-container').prepend(errorTip.format('只支持md格式的文件'));

            return false;
        }

        return false;
    })
});
