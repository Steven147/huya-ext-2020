
var require = function (src) {
    var s = document.createElement('script');
    s.async = false;
    s.src = src;
    s.addEventListener('load', function () {
        s.parentNode.removeChild(s);
        s.removeEventListener('load', arguments.callee, false);
    }, false);
    document.body.prepend(s);
};

require('hy-adapter/adapter_base.js');
    