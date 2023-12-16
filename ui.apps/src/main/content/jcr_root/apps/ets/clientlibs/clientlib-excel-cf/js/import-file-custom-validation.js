(function($, Coral) {
	"use strict";

	var registry = $(window).adaptTo("foundation-registry");

	//validate file extension
	registry.register("foundation.validation.validator", {
		selector: "[data-validation=import-file-extension]",
		validate: function(element) {
			let el = $(element);
			let value = el.val();
			var extension = value.replace(/^.*\./, '');
			if (extension == "xls" || extension == "xlsx" || extension == "csv") {
				return;
			}
			else {
				return "Please upload .xls, .xlsx or .csv file formats";
			}
		}
	});
})(jQuery, Coral);
