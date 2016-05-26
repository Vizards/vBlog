/**
 * Created by Vizards on 16/5/3.
 */

marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    },
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});