var SandleStrap=function(){this.elementTypes=[],this.elements={}};SandleStrap.prototype.register=function(a){document.createElement(a.config.tag),this.elementTypes.push(a.config.tag),this.elements[a.config.tag]=a,this.updateStyle()},SandleStrap.prototype.updateStyle=function(){var a=fw("#insertedStyle"),b=" { animation-duration: 0.001s;-o-animation-duration: 0.001s;-ms-animation-duration: 0.001s;-moz-animation-duration: 0.001s;-webkit-animation-duration: 0.001s;animation-name: nodeInserted;-o-animation-name: nodeInserted;-ms-animation-name: nodeInserted;-moz-animation-name: nodeInserted;-webkit-animation-name: nodeInserted;}",c="{opacity: 0}",d="{display:block}",e="";if("undefined"==typeof a){a=document.createElement("style"),a.setAttribute("id","insertedStyle");var f=document.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f)}for(var g=this.elementTypes.length;g--;)e+=this.elementTypes[g]+", ";e=e.substring(0,e.lastIndexOf(", ")),a.appendChild(document.createTextNode(e+b)),a.appendChild(document.createTextNode(e+c)),a.appendChild(document.createTextNode(e+d))},SandleStrap.prototype.inserted=function(a){if("nodeInserted"==a.animationName){var b=a.target;this.inject(b),a.target.addClass("rendered")}},SandleStrap.prototype.ssChangeAttribute=function(a,b){var c="."+this.tagName.toLowerCase()+"-"+a;if("undefined"!=typeof this.find(c)){this.setAttribute(a,b);var d=this.find(c);d.innerHTML=b}else console.error('There is no bound attribute "'+a+'" for this element.')},SandleStrap.prototype.ssInnerHTML=function(a){var b=this.find("content");"object"==typeof b&&"undefined"==typeof b.length?(console.debug(b,a),b.innerHTML=a):console.error("There needs to be one <content> in this control in order to use the ssInnerHTML function.")},SandleStrap.prototype.inject=function(a){if(!a.containsClass("rendered")){var b=a.tagName.toLowerCase(),c=this.elements[b],d=a.innerHTML;a.ssChangeAttribute=this.ssChangeAttribute,a.ssInnerHTML=this.ssInnerHTML;var e=c.config.template,f=e.match(/\{\{.*?\}\}/g);if(console.debug(f),f){for(var g=f.length;g--;){var h=f[g].replace(/\{/g,"").replace(/\}/g,""),i=new RegExp("{{"+h+"}}");e=e.replace(i,'<span class="'+b+"-"+h+'">'+a.getAttribute(h)+"</span>")}console.debug(e)}a.innerHTML=e,e.indexOf("<content>")>=0&&a.ssInnerHTML(d)}};var sandlestrap=new SandleStrap;document.addEventListener("animationstart",fw.proxy(sandlestrap.inserted,sandlestrap),!1),document.addEventListener("MSAnimationStart",fw.proxy(sandlestrap.inserted,sandlestrap),!1),document.addEventListener("webkitAnimationStart",fw.proxy(sandlestrap.inserted,sandlestrap),!1),document.createElement("content");