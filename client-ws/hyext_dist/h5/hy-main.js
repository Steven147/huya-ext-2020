
//Runtime环境下面需要先加载adapter_base.js
console.log('navigator.userAgent:',navigator.userAgent);
if (window['navigator'] == undefined || window['navigator'] == null || navigator.userAgent.toLowerCase().indexOf('huya') >=0 ) {
    require('hy-adapter/adapter_base.js');
}

    
//加载资源
hyAdapterLoader.loadImages([]);
        
//加载脚本
hyAdapterLoader.loadScripts(["./pixi/pixi.min.js", "./src/main.js", "js/total.js"]);
        