(function ($) {
	"use strict";

	$.litePagination = function (el, options) {

		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		// console.log(options);

		var base = this;

		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;

		// get input jQuery object
		base.$input = base.$el.find('input');

		// Add a reverse reference to the DOM object
		base.$el.data("litePagination", base);

		base.init = function () {

			base.options = $.extend({}, $.litePagination.defaultOptions, options);

			// if the user hasn't provided a max page number in the options try and find
			// the data attribute for it, if that cannot be found, use one as a max page number

			if (base.options.maxPage === null) {

				if (base.$input.data('max-page') !== undefined) {
					base.options.maxPage = base.$input.data('max-page');
				} else {
					base.options.maxPage = 1;
				}

			}

			// if the current-page data attribute is specified this takes priority
			// over the options passed in, so long as it's a number
			// if (base.$input.data('current-page') !== undefined && base.isNumber(base.$input.data('current-page'))) {
			// 	base.options.currentPage = base.$input.data('current-page');
			// }

			// remove the readonly attribute as JavaScript must be working by now ;-)
			// base.$input.removeAttr('readonly');

			// set the initial input value
			// pass true to prevent paged callback form being fired
			
			base.updateInput(true);
			
			// console.log(base.options.currentPage);


			 //***************
			// BIND EVENTS

			base.$input.on('focus.litePagination mouseup.litePagination', function (event) {

				// if event === focus, select all text...
				if (event.type === 'focus') {

					var currentPage	= parseInt(base.options.currentPage, 10);

					$(this).val(currentPage).select();

				}

				// if event === mouse up, return false. Fixes Chrome bug
				if (event.type === 'mouseup') {
					return false;
				}

			});

			base.$input.keypress(function(event){
				if(event.which !=8 && isNaN(String.fromCharCode(event.which))){
					event.preventDefault();
				}
			});


			base.$input.on('blur.litePagination keydown.litePagination', function (event) {

				var $self			= $(this),
					currentPage	= parseInt(base.options.currentPage, 10);
				

				// if the user hits escape revert the input back to the original value
				if (event.keyCode === 27) {
					$self.val(currentPage);
					$self.blur();
				}

				// if the user hits enter, trigger blur event but DO NOT set the page value
				// if (event.keyCode > 95 && event.keyCode < 106 ) {
				// 	console.log('if');
				// 	// $self.blur();
				// } else {
				// 	console.log('else');
				// 	return false;
				// }

				// if the user hits enter, trigger blur event but DO NOT set the page value
				if (event.keyCode === 13) {
					$self.blur();
				}

				// only set the page is the event is focusout.. aka blur
				if (event.type === 'blur') {
					base.setPage($self.val());
				}

			});

			base.$el.on('click.litePagination', 'a', function (event) {

				var $self = $(this);

				// we don't want to do anything if we've clicked a disabled link
				// return false so we stop normal link action btu also drop out of this event

				if ($self.hasClass('disabled')) {
					return false;
				}

				// for mac + windows (read: other), maintain the cmd + ctrl click for new tab
				if (!event.metaKey && !event.ctrlKey) {
					event.preventDefault();
					base.setPage($self.data('action'));
				}

			});

		};

		// base.options.currentPage = 1;

		base.setPage = function (page, prevent_paged) {
			// console.log(page, base.options.currentPage);
			// return currentPage value if getting instead of setting
			if (page === undefined) {
				return base.options.currentPage;
			}

			var currentPage	= parseInt(base.options.currentPage, 10),
				maxPage		= parseInt(base.options.maxPage, 10);
			
				// console.log(currentPage);

			if (isNaN(parseInt(page, 10))) {

				switch (page) {

					case 'first':
						page = 1;
						break;

					case 'prev':
					case 'previous':
						page = currentPage - 1;
						break;

					case 'next':
						page = currentPage + 1;
						break;

					case 'last':
						page = maxPage;
						break;

				}

			}

			page = parseInt(page, 10);

			// reject any invalid page requests
			if (isNaN(page) || page < 1 || page > maxPage) {

				// update the input element
				base.setInputValue(currentPage);

				return false;

			}

			// update current page options
			base.options.currentPage = page;
			base.$input.data('current-page', page);

			// update the input element
			base.updateInput( prevent_paged );

		};

		base.setMaxPage = function (maxPage, prevent_paged) {

			// return the maxPage value if getting instead of setting
			if (maxPage === undefined) {
				return base.options.maxPage;
			}

			// ignore if maxPage is not a number
			if (!base.isNumber(maxPage)) {
				console.error('litePagination: maxPage is not a number');
				return false;
			}

			// ignore if maxPage is less than the currentPage
			if (maxPage < base.options.currentPage) {
				console.error('litePagination: maxPage lower than currentPage');
				return false;
			}

			// set maxPage options
			base.options.maxPage = maxPage;
			base.$input.data('max-page', maxPage);

			// update the input element
			base.updateInput( prevent_paged );

		};

		// ATTN this isn't really the correct name is it?
		base.updateInput = function (prevent_paged) {

			var currentPage = parseInt(base.options.currentPage, 10);

			// set the input value
			base.setInputValue(currentPage);

			// set the link href attributes
			base.setLinks(currentPage);

			// we may want to prevent the paged callback from being fired
			if (prevent_paged !== true) {

				// fire the callback function with the current page
				base.options.paged(currentPage);

			}

		};

		base.setInputValue = function (page) {

			var pageString	= base.options.pageString,
				maxPage	= base.options.maxPage;

			// this looks horrible :-(
			pageString = pageString
				.replace("{currentPage}", page)
				.replace("{maxPage}", maxPage);

			base.$input.val(pageString);

			base.$el.find('.current-page').html(page);
			base.$el.find('.max-page').html(maxPage);
			

		};

		base.isNumber = function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		};

		base.setLinks = function (page) {

			// var link_string		= base.options.link_string,
			var	currentPage	= parseInt(base.options.currentPage, 10),
				maxPage		= parseInt(base.options.maxPage, 10);

			// if (link_string !== '') {

			// 	// set initial page numbers + make sure the page numbers aren't out of range

			// 	var previous = currentPage - 1;
			// 	if (previous < 1) {
			// 		previous = 1;
			// 	}

			// 	var next = currentPage + 1;
			// 	if (next > maxPage) {
			// 		next = maxPage;
			// 	}

			// 	// apply each page number to the link string, set it back to the element href attribute
			// 	base.$el.find('a.first').attr('href', link_string.replace('{page_number}', '1'));
			// 	base.$el.find('a.prev, a.previous').attr('href', link_string.replace('{page_number}', previous));
			// 	base.$el.find('a.next').attr('href', link_string.replace('{page_number}', next));
			// 	base.$el.find('a.last').attr('href', link_string.replace('{page_number}', maxPage));

			// }

			// set disable class on appropriate links
			base.$el.find('a').removeClass('disabled');
			base.$el.find('a').removeAttr('tabindex');

			if (currentPage === maxPage) {
				base.$el.find('.next, .last').addClass('disabled').attr('tabindex', -1);
			}

			if (currentPage === 1) {
				base.$el.find('.previous, .first').addClass('disabled').attr('tabindex', -1);
			}

		};

		base.callMethod = function (method, key, value) {

			switch (method.toLowerCase()) {

				case 'option':

					// if we're getting, immediately return the value
					if ( value === undefined && typeof key !== "object" ) {
						return base.options[key];
					}

					// set default object to trigger the paged event (legacy opperation)
					var options = {'trigger': true},
					result = false;

					// if the key passed in is an object
					if($.isPlainObject(key) && !value){
						$.extend(options, key)
					}
					else{ // make the key value pair part of the default object
						options[key] = value;
					}

					var prevent_paged = (options.trigger === false);

					// if currentPage property is set call setPage
					if(options.currentPage !== undefined){
						result = base.setPage(options.currentPage, prevent_paged);
					}

					// if maxPage property is set call setMaxPage
					if(options.maxPage !== undefined){
						result = base.setMaxPage(options.maxPage, prevent_paged);
					}

					// if we've not got a result fire an error and return false
					if( result === false ) console.error('litePagination: cannot get / set option ' + key);
					return result;

					break;

				case 'destroy':

					base.$el
						.off('.litePagination')
						.find('*')
							.off('.litePagination');

					break;

				default:

					// the function name must not exist
					console.error('litePagination: method "' + method + '" does not exist');
					return false;

			}

		};

		// Run initializer
		base.init();

	};

	$.litePagination.defaultOptions = {
		currentPage	: 1,
		// link_string		: '',
		maxPage		: null,
		pageString		: 'Page {currentPage} of {maxPage}',
		paged			: function () {}
	};

	$.fn.litePagination = function () {

		// get any function parameters
		var self = this,
			$self = $(self),
			args = Array.prototype.slice.call(arguments),
			result = false;

		// if the first argument is a string call the desired function
		// note: we can only do this to a single element, and not a collection of elements

		if (typeof args[0] === 'string') {

			// if we're getting, we can only get value for the first pagination element
			if (args[2] === undefined) {

				result = $self.first().data('litePagination').callMethod(args[0], args[1]);

			} else {

				// if we're setting, set values for all pagination elements
				$self.each(function(){
					result = $(this).data('litePagination').callMethod(args[0], args[1], args[2]);
				});

			}

			return result;
		}

		// if we're not dealing with a method, initialise plugin
		self.each(function () {
			(new $.litePagination(this, args[0]));
		});

	};

})(jQuery);

// // polyfill, provide a fallback if the console doesn't exist
// if (!console) {

// 	var console	= {},
// 		func	= function () { return false; };

// 	console.log		= func;
// 	console.info	= func;
// 	console.warn	= func;
// 	console.error	= func;

// }