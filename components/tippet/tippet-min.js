var ssTippet=function(){};ssTippet.config={tag:"ss-tippet",template:'<div class="tippetArrow"></div><heading>{{heading}}<span class="close">x</span></heading><content></content>',attributes:["heading"],init:function(a){a.find("heading .close").addListener("click",function(b){fw.stopCancel(b),a.tippet.hide()})}},sandlestrap.register(ssTippet);var Tippet=function(a,b){this.elem=a,this.options={position:"bottom",area:"after",arrow:!0,close:!0,heading:"",content:"",wide:!1,onShow:function(){}},fw.extend(this.options,b),this.elem.addClass("tippetElem"),("static"===this.elem.style.position||"static"===fw.cssStyle(this.elem,"position"))&&(this.elem.style.position="relative")};Tippet.prototype.show=function(){this.elem.find("[ss-tippet]").length<1&&this.render()},Tippet.prototype.hide=function(a){this.elem.removeChild(this.tippet),a&&fw.stopCancel(a)},Tippet.prototype.render=function(){this.tippet=fw("<ss-tippet>");var a=this.tippet;a.tippet=this,a.innerHTML=this.options.content,a.setAttribute("heading",this.options.heading),this.options.wide&&a.addClass("wide"),a.addClass(this.options.position).addClass(this.options.area),this.elem.appendChild(a),(fw.cssStyle(this.elem,!1)||"static"===this.elem.style.position)&&(this.elem.style.position="relative"),fw.proxy(this.options.onShow,a)()},Tippet.prototype.collision=function(){};