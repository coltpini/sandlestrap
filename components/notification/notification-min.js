var ssNotification=function(){};ssNotification.config={tag:"ss-notification",template:"<content></content>",init:function(a){console.debug("Notification Init"),a.notify=new Notify(a)}},sandlestrap.register(ssNotification);var Notify=function(a){this.container=a.find("content")};Notify.prototype.showMessage=function(a,b,c){var d=fw("<ss-notice>");d.setAttribute("heading",a),d.setAttribute("type",c),d.innerHTML=b,this.container.appendChild(d),this.hideMessage(d);var e=fw.styleProp("transition");e.is&&(d.style[e.prop]="all 200ms ease-out");var f=this;return setTimeout(function(){f.unhideMessage(d)},1),d},Notify.prototype.unhideMessage=function(a){a.opacity(1),a.style.right=0,a.removeClass("hidden")},Notify.prototype.hideMessage=function(a){a.opacity(0),a.style.right=-1*a.offsetWidth+"px",a.addClass("hidden")},Notify.prototype.removeMessage=function(a){this.hideMessage(a),setTimeout(function(){a.parentNode.removeChild(a)},500)},Notify.prototype.handler=function(a,b,c,d){b&&b(c),this.hideMessage(a);var e=this;setTimeout(function(){e.removeMessage(a)},100),d&&clearTimeout(d)},Notify.prototype.alert=function(a,b,c,d){"undefined"==typeof d&&(d=function(a){return a});var e,f=this.showMessage(a,b,"alert"),g=this;"boolean"==typeof c&&c===!0?e=setTimeout(function(){g.removeMessage(f),d()},5e3):"number"==typeof c&&(e=setTimeout(function(){g.removeMessage(f),d()},c)),f.addListener("click",function(a){a.target===f.find(".noticeAction button.yes")&&this.handler(f,d,!0,e)},!1,this)},Notify.prototype.prompt=function(a,b,c){"undefined"==typeof c&&(c=function(a){return a});var d=this.showMessage(a,b,"prompt");d.addListener("click",function(a){if(a.target===d.find(".noticeAction button.yes")){var b=d.find("section input");this.handler(d,c,b.value)}else a.target===d.find(".noticeAction button.no")&&this.handler(d,c,!1)},!1,this)},Notify.prototype.confirm=function(a,b,c){"undefined"==typeof c&&(c=function(a){return a});var d=this.showMessage(a,b,"confirm");d.addListener("click",function(a){a.target===d.find(".noticeAction button.yes")?this.handler(d,c,!0):a.target===d.find(".noticeAction button.no")&&this.handler(d,c,!1)},!1,this)};