/**
 * Created by Vizards on 16/5/3.
 * File: public/
 */

function delPost(id) {
    $.ajax({
        url: '/admin/post/' + id,
        type: 'DELETE',
        success: function (result) {
            location.reload();
        }
    });
}
