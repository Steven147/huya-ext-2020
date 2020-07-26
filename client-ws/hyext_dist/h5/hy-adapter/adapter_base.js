

// 加载器
// 浏览器及Runtime环境都要先加载
// 浏览器环境下:<script src="adapter_base.js"></script>

(function (window) {
    var loader = {};

    //创建一个element
    var baseCreate = function (objType, id) {
        var obj = document.createElement(objType);
        obj.id = id;
        document.body.appendChild(obj);
        return obj;
    };

    //创建image
    loader.createImage = function (src, id) {
        var img = baseCreate("img", id);
        img.src = src;
        img.style.display = 'none';
        return img;
    };

    //创建canvas
    loader.createCanvas = function (id, width, height) {
        var obj = baseCreate("canvas", id);
        if (width != undefined && width != null) {
            obj.width = width
        }
        if (height != undefined  && height != null) {
            obj.height = height
        }
        return obj;
    };

    //创建文本内容
    loader.createTextContent = function (id, content) {
        var obj = baseCreate("title", id);
        obj.text = content;
        return obj;
    };

    //加载图片资源
    loader.loadImages = function (images) {
        if (images == null || images.length <= 0) {
            return;
        }
        for (var i = 0; i < images.length; i++) {
            loader.createImage(images[i].src, images[i].id);
        }
    };

    //加载脚本
    loader.loadScripts = function (scripts) {
        if (scripts == null || scripts.length <= 0) {
            return;
        }
        for (var i = 0; i < scripts.length; i++) {
            require(scripts[i]);
        }
    };

     //创建div
    loader.createDiv = function (attributes) {
        var obj = document.createElement('div');
        if(attributes!=null){
            for(var key in attributes){
               obj.setAttribute(key, attributes[key]);
            }
        }
        document.body.appendChild(obj);
        return obj;
    };

    // Expose
window.hyAdapterLoader = loader;

})(window);
    
    