var fw=function(a){var b;return"object"==typeof a?new FW(a):0===a.indexOf("<")?(b=document.createElement(a.replace(/^</,"").replace(/>$/,"")),FW(b)):fw.find(document,a)};fw.find=function(a,b){var c;if(0===b.indexOf("[")?(c=a.querySelectorAll(b.replace(/^\[/,"").replace(/\]$/,"")),c.forceArray=!0):c=0===b.indexOf("^[")?a.querySelectorAll(b.substring(1)):a.querySelectorAll(b),1===c.length&&!c.forceArray)return FW(c[0]);if(c.length>1||c.forceArray){c.forceArray&&(c.forceArray=void 0);for(var d=[],e=0;e<c.length;e++)d.push(FW(c[e]));return d.forEach||(d.forEach=function(a){for(var b=0;b<this.length;b++)a(this[b],b,this)}),d}return void 0},fw.loadScript=function(a,b){var c=document,d="script",e=c.createElement(d),f=c.getElementsByTagName(d)[0];e.async=!0,e.src=a,e.onload=e.onreadystatechange=function(){var a=this.readyState;a&&"complete"!=a&&"loaded"!=a||b&&b()},f.parentNode.insertBefore(e,f)},fw.extend=function(a,b){for(var c in b)a[c]=b[c];return a},fw.topics={},fw.subUid=-1,fw.publish=function(a,b){return fw.topics[a]?(setTimeout(function(){for(var c=fw.topics[a],d=c?c.length:0;d--;)c[d].func(b,a)},0),!0):!1},fw.subscribe=function(a,b){fw.topics[a]||(fw.topics[a]=[]);var c=(++fw.subUid).toString();return fw.topics[a].push({token:c,func:b}),c},fw.unsubscribe=function(a){for(var b in fw.topics)if(fw.topics[b])for(var c=0,d=fw.topics[b].length;d>c;c++)if(fw.topics[b][c].token===a)return fw.topics[b].splice(c,1),!0;return!1},fw.stop=function(a){a=a||window.event,a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},fw.cancel=function(a){a=a||window.event,a.preventDefault?a.preventDefault():a.returnValue=!1},fw.stopCancel=function(a){this.stop(a),this.cancel(a)},fw.key=function(a){a=a||window.event;var b=a.keyCode||a.which||void 0,c=String.fromCharCode(b);return{code:b,"char":c}},fw.button=function(a){var b="undefined"!=typeof a.buttons?a.buttons:"undefined"!=typeof a.which?a.which:a.button;return b},fw.pointerOffset=function(a){var b=a.currentTarget,c=0,d=0;do{c+=b.offsetLeft,d+=b.offsetTop;var e;e=""!==b.style.position?b.style.position:fw.cssStyle(b,"position"),fixed="fixed"===e}while(b=b.offsetParent);return this.pointerPosition(a,d,c,fixed)},fw.pointerPosition=function(a,b,c,d){var e=a.currentTarget;if(b=b||0,c=c||0,a.touches){for(var f={x:0,y:0,points:[]},g=0,h=0,i=0;i<a.touches.length;i++){var j=a.touches.item(i);g+=j.clientX,h+=j.clientY,f.points.push({x:j.clientX-c,y:j.clientY-b})}return f.x=g/i-c,f.y=h/i-b,f}if(d)return{x:a.clientX-e.offsetLeft,y:a.clientY-e.offsetTop};var k=a.pageX,l=a.pageY;return void 0===k&&null!==a.clientX&&(edoc=a.target.ownerDocument||document,doc=edoc.documentElement,body=edoc.body,k=a.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0),l=a.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0)),k-=c,l-=b,{x:k,y:l}},fw.mouseWheel=function(a){var b,c=0;a.wheelDelta&&(b=a.wheelDelta/120),a.detail&&(b=-a.detail/3);var d=b;return void 0!==a.axis&&a.axis===a.HORIZONTAL_AXIS&&(d=0,c=-1*b),void 0!==a.wheelDeltaY&&(d=a.wheelDeltaY/120),void 0!==a.wheelDeltaX&&(c=-1*a.wheelDeltaX/120),void 0!==a.deltaY&&(d=a.deltaY/30),void 0!==a.deltaX&&(c=-1*a.deltaX/30),{x:c,y:d}},fw.ajax=function(a){function b(){if(4===e.readyState){var a={val:f(e.responseText,d.container),raw:e.responseText,status:e.status,statusText:e.statusText};d.success&&a.status>=200&&a.status<300?d.success(a):d.failure&&(a.status<200||a.status>=300)&&d.failure(a),d.complete&&d.complete(a)}}var c=function(){},d={type:a.type||"GET",url:a.url,data:a.data||null,success:a.success||c,failure:a.failure||c,complete:a.complete||c,container:a.container||"body"},e=new XMLHttpRequest;e.onreadystatechange=b,e.open(d.type,d.url,!0),e.send(d.data);var f=function(a,b){if(b)try{a=a.match(/<body.*?>[\w\W]+<\/body>/)[0].replace(/<body.*?>/,"").replace(/<\/body>/,"");var c=fw("body").createChild("iframe");c.style.display="none";var d=c.document||c.contentDocument||c.contentWindow.document;d.body.innerHTML=a,a=fw.find(d,b).innerHTML,c.removeSelf()}catch(e){}return a}},fw.jsonp=function(a){var b=function(){},c={url:a.url,success:a.success||b,cb:a.callback||"callback"},d=this.randomString(10),e=c.url.indexOf("?")>-1?"&":"?";window[d]=function(a){c.success(a),this[d]=void 0},fw.loadScript(c.url+e+c.cb+"="+d)},fw.randomString=function(a,b){for(var c="",d=function(){var a=Math.random(),c=Math.floor(122*a);return c>0&&10>c&&b?c:91>c?String.fromCharCode(c>64?c:65+Math.floor(26*a)):c>90?String.fromCharCode(c>96&&123>c?c:97+Math.floor(26*a)):void 0};c.length<a;)c+=d();return c},fw.qs=function(a){for(var b=window.location.search.substring(1),c=b.split("&"),d={val:"",arr:[]},e=0;e<c.length;e++){var f=c[e].split("=");f[0]===a&&(d.val=f[1],d.arr.push(f[1]))}return d.val=decodeURIComponent(d.val).replace("<","").replace(">",""),d},fw.proxy=function(a,b,c){return a.bind?a.bind(b):function(){return c&&arguments[0].srcElement&&"undefined"==typeof arguments[0].currentTarget&&(arguments[0].currentTarget=c,arguments[0].target=arguments[0].srcElement),a.apply(b,arguments)}},fw.cssStyle=function(a,b){return"undefined"!=typeof getComputedStyle?getComputedStyle(a)[b]:a.currentStyle[b]},fw.styleProp=function(a){for(var b=["","chrome","safari","firefox","opera","ie",""],c={},d=a.charAt(0).toUpperCase()+a.slice(1),e=0;e<b.length&&(c=this.checkCssPropSupport(d,b[e]),!c.is);e++);return c},fw.checkCssPropSupport=function(a,b){var c,d={is:!0,prop:a};switch(el=document.createElement("div"),b){case"chrome":c="webkit";break;case"safari":c="webkit";break;case"firefox":c="Moz";break;case"opera":c="O";break;case"ie":c="ms";break;default:c="",a=a.charAt(0).toLowerCase()+a.slice(1)}return d.is="undefined"!=typeof el.style[c+a],d.prop=c+a,el=null,d},fw.cookie={set:function(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+1e3*60*60*24*c),d="; expires="+e.toGMTString()}document.cookie=a+"="+b+d+"; path=/"},get:function(a){for(var b=a+"=",c="",d=document.cookie.split(";"),e=0;e<d.length;e++){for(var f=d[e];" "===f.charAt(0);)f=f.substring(1,f.length);0===f.indexOf(b)&&(c=f.substring(b.length,f.length))}return encodeURIComponent(c)},remove:function(a){this.set(a,"",-1)}},fw.extendElement=function(a,b){this.extendObject[a]=b,Element.prototype[a]=b},fw.extendObject={};var FW=function(a){if(a.isFW)return a;a.isFW=!0,a.createChild=function(a){return elem=document.createElement(a.replace(/^</,"").replace(/>$/,"")),this.appendChild(elem),elem},a.find=function(a){return fw.find(this,a)},a.removeSelf=function(){this.parentNode.removeChild(this)},a.addClass=function(a){if(this.classList)this.classList.add(a);else{var b=this.getAttribute("class"),c=!1;if(b){for(var d=b.split(" "),e=0;e<d.length;e++)d[e]===a&&(c=!0);c||this.setAttribute("class",b+" "+a)}else this.setAttribute("class",a)}return this},a.removeClass=function(a){if(this.classList)this.classList.remove(a);else{var b=this.getAttribute("class"),c="";if(b){for(var d=b.split(" "),e=0;e<d.length;e++){var f=0===e?"":" ";d[e]!==a&&(c+=f+d[e])}this.setAttribute("class",c)}}return this},a.toggleClass=function(a){return this.classList?this.classList.toggle(a):this.containsClass(a)?this.removeClass(a):this.addClass(a),this},a.containsClass=function(a){if(this.classList)return this.classList.contains(a);var b=this.getAttribute("class");if(b)for(var c=b.split(" "),d=0;d<c.length;d++)if(c[d]===a)return!0;return!1},a.addListener=window.addListener=function(a,b,c,d){var e="undefined"!=typeof c?c:!1;("wheel"===a||"mousewheel"===a)&&(a="onwheel"in window?"wheel":"mousewheel"),b.p||(b.p=[]);var f={element:this,proxy:fw.proxy(b,d),type:a};return"undefined"!=typeof d?(this.addEventListener?this.addEventListener(a,f.proxy,e):(f={element:this,proxy:fw.proxy(b,d,this),type:a},this.attachEvent("on"+a,f.proxy)),b.p.push(f)):this.addEventListener?this.addEventListener(a,b,e):(f={element:this,proxy:fw.proxy(b,this,this),type:a},b.p.push(f),this.attachEvent("on"+a,f.proxy)),this},a.removeListener=window.removeListener=function(a,b,c){var d="undefined"!=typeof c?c:!1,e=b;if(b.p)for(var f=0;f<b.p.length;f++)this===b.p[f].element&&a===b.p[f].type&&(e=b.p[f].proxy,b.p.splice(f,1));return this.removeEventListener?this.removeEventListener(a,e,d):this.detachEvent("on"+a,e),this},a.simulateEvent=function(a){if(this.fireEvent)this.fireEvent("on"+a);else{var b=document.createEvent("Events");b.initEvent(a,!0,!1),this.dispatchEvent(b)}},a.opacity=function(a){this.style&&"undefined"==typeof this.style.opacity?this.style.filter="alpha(opacity:"+100*a+")":this.style.opacity=a};for(var b in fw.extendObject)a[b]=fw.extendObject[b];return a};FW(Element.prototype);