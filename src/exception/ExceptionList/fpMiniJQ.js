(function(d,f){var e=function(g,h){return new c.prototype.init(g,h)};var c=function(){};c.prototype={constructor:e,init:function(g,h){if(!g){return[]}if(g.nodeType===1){this.context=[g]}else{if(g instanceof Array){this.context=g}else{if(typeof g=="object"&&g.hasOwnProperty("context")&&g.context instanceof Array){this.context=g.context}else{this.context=b(g,h)}}}this.length=this.context.length;return this},get:function(g){return this.context[g]},eq:function(g){return e(this.get(g))},each:function(g){this.context.forEach(function(i,h){g.call(i,h,i)});return this},bind:function(i,h,g){this.context.forEach(function(j){a.addEvent(j,i,h,g)});return this},click:function(h,g){return this.bind("click",h,g)},css:function(g,i){if(g===f||this.length===0){return this}if(i===f&&typeof g==="string"){return this.context[0].currentStyle?this.context[0].currentStyle[g]:d.getComputedStyle(this.context[0],null)[g]}if(typeof g==="string"&&(i||i===0)){i=i+((Number(i)||i==0)?"px":"");g=="float"&&(g=this.context[0].style.cssFloat!==f?"cssFloat":"styleFloat");this.context.forEach(function(j){j.style[g]=i})}else{if(typeof g==="object"){var h;for(h in g){this.css(h,g[h])}}}return this},attr:function(g,i){if(g===f||this.length===0){return this}if(g==="class"){g="className"}if(g==="for"){g="htmlFor"}if(i===f&&typeof g==="string"){return this.context[0].getAttribute(g)||f}i=i+"";if(typeof g==="string"){this.context.forEach(function(j){j.setAttribute(g,i)})}else{if(typeof g==="object"){var h;for(h in g){this.attr(h,g[h])}}}return this},removeAttr:function(h,k){if(typeof h==="string"){if(h==="class"){h="className"}if(h==="for"){h="htmlFor"}this.context.forEach(function(i){i.removeAttribute(h);if(typeof k=="function"){k.call(i)}})}else{if(h instanceof Array){var j=0,g=h.length;for(;j<g;j+=1){this.removeAttr(h[j],k)}}}return this},html:function(g){if(g===f){return this.length?this.context[0].innerHTML:""}else{this.context.forEach(function(h){h.innerHTML=g})}return this},data:function(h,l){if(l===f){if(typeof h=="object"){var k;for(k in h){this.data(k,h[k])}}else{if(this.length===0||!this.context[0]._data){return null}return this.context[0]._data[h]}}else{if(/^string|number$/.test(typeof h)){this.context.forEach(function(i){i._data=i._data||{};i._data[h]=l})}else{if(h instanceof Array){var j=0,g=h.length;for(;j<g;j+=1){this.data(h[j],l)}}}}return this},show:function(g){this.context.forEach(function(h){g=g||e(h).data("_oldDisplay")||"block";h.style.display=g});return this},hide:function(){this.context.forEach(function(g){var h=e(g).css("display");e(g).css("display","none").data("_oldDisplay",h)});return this},hasClass:function(g){var h=true;this.context.forEach(function(i){if(h===true&&(" "+i.className+" ").replace(/[\t\r\n]/g," ").indexOf(" "+g+" ")===-1){h=false}});return h},addClass:function(g){this.context.forEach(function(h){if(e(h).hasClass(g)==false){/\s+$/.test(h.className)?(h.className+=g):(h.className=h.className+" "+g)}});return this},removeClass:function(g){this.context.forEach(function(h){if(e(h).hasClass(g)){var i=h.className.split(" ");i.forEach(function(j,k){if(j&&j===g){i[k]=""}});h.className=i.join(" ")}});return this},val:function(g){if(g==f){if(this.length){return this.context[0].value}}else{this.context.forEach(function(h){h.value=g})}return this},append:function(h){var g=typeof h;if(h!==f){this.context.forEach(function(i){if(g==="string"){i.innerHTML=i.innerHTML+h}else{if(g==="object"){if(h.nodeType===1){i.appendChild(h)}else{if(h.context&&h.length){h.context.forEach(function(j){i.appendChild(j)})}}}}})}return this},extend:function(h){var g;if(typeof h==="object"&&!(h instanceof Array)){for(g in h){c.prototype[g]=h[g]}}return this}};e.fn=c.prototype.init.prototype=c.prototype;e.extend=function(){var j=arguments.length,l=arguments[0]||{},h=1;if(j===1){l=e;--h}for(;h<j;h+=1){var g,k=arguments[h];if(typeof k==="object"){for(g in k){l[g]=k[g]}}}return l};e.extend({type:function(g){return typeof g},isFunction:function(g){e.type(g)=="function"},isArray:function(g){return toString.call(g)==="[object Array]"}});if(![].forEach){Array.prototype.forEach=function(j){var h,g;if(typeof j==="function"){h=0,g=this.length;for(;h<g;h+=1){j(this[h],h)}}return f}}if(!"".trim){String.prototype.trim=function(){return this.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,"")}}if(!function(){}.bind){Function.prototype.bind=function(h){var j=this,i=Array.prototype.slice,g=i.call(arguments,1);return function(){return j.apply(h,g.concat(i.call(arguments)))}}}var b=(function(){var h=/(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,m=/^(?:[\w\-_]+)?\.([\w\-_]+)/,l=/^(?:[\w\-_]+)?#([\w\-_]+)/,p=/^([\w\*\-_]+)/,n=[null,null];function j(u,s){s=s||document;var q=/^[\w\-_#]+$/.test(u);if(!q&&s.querySelectorAll){return i(s.querySelectorAll(u))}if(u.indexOf(",")>-1){var B=u.split(/,/g),z=[],y=0,x=B.length;for(;y<x;++y){z=z.concat(j(B[y],s))}return k(z)}var v=u.match(h),t=v.pop(),r=(t.match(l)||n)[1],A=!r&&(t.match(m)||n)[1],C=!r&&(t.match(p)||n)[1],w;if(A&&!C&&s.getElementsByClassName){w=i(s.getElementsByClassName(A))}else{w=!r&&i(s.getElementsByTagName(C||"*"));if(A){w=o(w,"className",RegExp("(^|\\s)"+A+"(\\s|$)"))}if(r){var D=s.getElementById(r);return D?[D]:[]}}return v[0]&&w[0]?g(v,w):w}function i(u){try{return Array.prototype.slice.call(u)}catch(t){var r=[],s=0,q=u.length;for(;s<q;++s){r[s]=u[s]}return r}}function g(C,w,u){var x=C.pop();if(x===">"){return g(C,w,true)}var y=[],q=-1,s=(x.match(l)||n)[1],z=!s&&(x.match(m)||n)[1],B=!s&&(x.match(p)||n)[1],A=-1,t,D,v;B=B&&B.toLowerCase();while((t=w[++A])){D=t.parentNode;do{v=!B||B==="*"||B===D.nodeName.toLowerCase();v=v&&(!s||D.id===s);v=v&&(!z||RegExp("(^|\\s)"+z+"(\\s|$)").test(D.className));if(u||v){break}}while((D=D.parentNode));if(v){y[++q]=t}}return C[0]&&y[0]?g(C,y):y}var k=(function(){var q=+new Date();var r=(function(){var s=1;return function(v){var u=v[q],t=s++;if(!u){v[q]=t;return true}return false}})();return function(s){var x=s.length,t=[],w=-1,u=0,v;for(;u<x;++u){v=s[u];if(r(v)){t[++w]=v}}q+=1;return t}})();function o(x,q,w){var t=-1,v,u=-1,s=[];while((v=x[++t])){if(w.test(v[q])){s[++u]=v}}return s}return j})();var a=(function(){return{addEvent:(function(){if(d.addEventListener){return function(j,i,h,g){j.addEventListener(i,h,g);var k=document.createEvent("HTMLEvents");k.initEvent(i,g||false,false);if(!j["ev"+i]){j["ev"+i]=k}}}else{if(d.attachEvent){return function(j,i,h,g){j.attachEvent("on"+i,function(l){h.call(j,l)});if(isNaN(j["cu"+i])){j["cu"+i]=0}var k=function(l){if(l.propertyName=="cu"+i){h.call(j)}};j.attachEvent("onpropertychange",k);if(!j["ev"+i]){j["ev"+i]=[k]}else{j["ev"+i].push(k)}}}}return function(){}})(),fireEvent:(function(){if(document.dispatchEvent){return function(h,g){if(typeof g==="string"&&h["ev"+g]){h.dispatchEvent(h["ev"+g])}}}else{if(document.attachEvent){return function(h,g){if(typeof g==="string"){h["cu"+g]++}}}}return function(){}})(),removeEvent:(function(){if(d.removeEventListener){return function(j,i,h,g){j.removeEventListener(i,h,g||false)}}else{if(document.attachEvent){return function(m,l,k,h){m.detachEvent("on"+l,k);var g=m["ev"+l];if(g instanceof Array){for(var j=0;j<g.length;j+=1){m.detachEvent("onpropertychange",g[j])}}}}}return function(){}})()}})(d);d.$=e})(window);
