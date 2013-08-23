var ssNotice = function(){};

ssNotice.templates = {
	alert:	"<header>{{heading}}</header>" +
			"<section>" +
				"<content></content>" +
			"</section>" +
			'<section class="noticeAction">' +
				'<button class="yes">yes</button>' +
			"</section>",

	prompt: "<header>{{heading}}</header>" +
			"<section>" +
				"<content></content>" +
				'<input type="text" />' +
			"</section>" +
			'<section class="noticeAction">' +
				'<button class="yes">yes</button>' +
				'<button class="no">no</button>' +
			"</section>",

	confirm:	"<header>{{heading}}</header>" +
				"<section>" +
					"<content></content>" +
				"</section>" +
				'<section class="noticeAction">' +
					'<button class="yes">yes</button>' +
					'<button class="no">no</button>' +
				"</section>",
};

ssNotice.config = {
	tag: "ss-notice",
	template:	ssNotice.templates.alert,
	attributes: ["heading", "type"]
};

sandlestrap.register(ssNotice);