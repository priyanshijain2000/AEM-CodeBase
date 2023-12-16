var epnProductAriaLabel = ''; 
var epnCountryAriaLabel = ''; 
$(function () {
	var selectedCountry = '';
	var selectedProduct = 'All Products and Services';
	var globalList;


	function filterData(obj, arr, parameter) {
		var filtered = obj.filter(function (item) {
			return arr == item[parameter];
		});
		obj = filtered;
		return obj;
	}
	function filterContainsData(obj, arr, parameter) {

		var filtered = obj.filter(function (item) {
			if (item[parameter])
			return item[parameter].includes(arr);
		});
		obj = filtered;
		return obj;
	}



	function updateCards(list) {
		$("#disclaimer").text('');
		$('#titleEpn').text('');
		if (list.length == 0) {
			
			var noresult = '<div class="result"><div class="result-title">' + selectedCountry + ' - ' +  $(".epn-product-dropdown option:selected").text() + '</div><div class="result-desc">There is no ETS preferred network office for <span>' + $(".epn-product-dropdown option:selected").text() + '</span> in ' + selectedCountry + '.</div><div class="result-contactinfo">For information about <span>' +  $(".epn-product-dropdown option:selected").text() + '</span>, please contact us at <a href="mailto:contact-emea@etsglobal.org">contact-emea@etsglobal.org</a></div> </div>';
			$('#titleEpn').append(noresult);
		}
		else {
			$('#contact-epn-table').empty();
			var row = '<thead><tr><th>City</th><th>Product & Service </th><th>Office</th></tr></thead><tbody>';
			$(row).appendTo("#contact-epn-table");
			var noresult = '<div class="result"><div class="result-title">' + selectedCountry + ' - ' +  $(".epn-product-dropdown option:selected").text() + '</div></div>';
			$('#titleEpn').append(noresult);
			
			list.reverse().forEach(element => {
				var newrow = "";
				
				$("#disclaimer").append(element['Disclaimer__c']);
				newrow += '<tr><td>' + element["prol_City__c"];
				if (element["prol_Supported_Product_Groups__c"] != null) {
				var productGroup = element["prol_Supported_Product_Groups__c"].split(';');
				var productlink = element["prol_Supported_Products__c"].split(';');
				var productSet = productlink.reduce(function (productSet, field, index) {
					if (!productSet[productGroup[index].trim()]) {
						productSet[productGroup[index].trim()] = [];
					}
					productSet[productGroup[index].trim()].push(field);
					return productSet;
				}, {})
				newrow += '</td><td class="productDesc">';
				for (const key in productSet) {
					if (key == selectedProduct || selectedProduct == 'All Products and Services') {
						var newkey=key.replace(/toeic|toefl|ets|ell/gi, function (x) {
				return x.toUpperCase();
			})
						newrow += '<span class="productTitle">'+newkey+'</span><ul>';
						productSet[key].forEach(element => {
							newrow += '<li>' + element + '</li>';

						})
						newrow += '</ul>';
					}
				}
				} else {
                    newrow += '</td> <td>';
                }
				var phone = '';
				if (element["prol_Phone_1__c"]) {
					phone = '<div><span class="bold">Phone: </span>' + element["prol_Phone_1__c"] + '</div>';
				}
				if (element['prol_Phone_2__c']) {
					if (element['prol_Phone_2_Label__c']) {
						phone += '<div><span class="bold">' + element["prol_Phone_2_Label__c"] + ': </span>' + element["prol_Phone_2__c"] + '</div>';
					} else {
						phone += '<div>' + element["prol_Phone_2__c"] + '</div>';
					}

				}
				var email = '';
				if (element["prol_Email_1__c"]) {
					var email = '<div><span class="bold">Email: </span><a href="mailto:' + element["prol_Email_1__c"] + '">' + element["prol_Email_1__c"] + '</a></div>';
				}
				if (element['prol_Email_2__c']) {
					if (element['prol_Email_2_Label__c']) {
						email += '<div><span class="bold">' + element["prol_Email_2_Label__c"] + ': </span><a href="mailto:' + element["prol_Email_2__c"] + '">' + element["prol_Email_2__c"] + '</a></div>';
					} else {
						email += '<div><a href="mailto:' + element["prol_Email_2__c"] + '">' + element["prol_Email_2__c"] + '</a></div>';
					}

				}
				var fax = "";
				if (element["prol_Fax_1__c"]) {
					fax = '<div><span class="bold">Fax: </span>' + element["prol_Fax_1__c"] + '</div>';
				}
				if (element['prol_Fax_2__c']) {
					if (element['prol_Fax_2_Label__c']) {
						fax += '<div><span class="bold">' + element["prol_Fax_2_Label__c"] + ': </span>' + element["prol_Fax_2__c"] + '</div>';
					} else {
						fax += '<div>' + element["prol_Fax_2__c"] + '</div>';
					}

				}
				var website = '';
				if (element["prol_Website_1__c"]) {
					if (element["prol_Website_1__c"].indexOf("http://") == -1 && element["prol_Website_1__c"].indexOf("https://") == -1) {
						website = '<div><span class="bold">Website: </span><a aria-label="'+ element["Name"] +', Opens in a new window tab" href="https://' + element["prol_Website_1__c"] + '" target="_blank">' + element["prol_Website_1__c"] + '</a></div>';
					}else
					website = '<div><span class="bold">Website: </span><a aria-label="'+ element["Name"] +', Opens in a new window tab" href="' + element["prol_Website_1__c"] + '" target="_blank">' + element["prol_Website_1__c"] + '</a></div>';
					
				}
				if (element['prol_Website_2__c']) {
					if (element["prol_Website_2__c"].indexOf("http://") == -1 && element["prol_Website_2__c"].indexOf("https://") == -1) {
					website += '<div><a href="https://' + element["prol_Website_2__c"] + '" target="_blank">' + element["prol_Website_2__c"] + '</a></div>';
					}
					else
					website += '<div><a href="' + element["prol_Website_2__c"] + '" target="_blank">' + element["prol_Website_2__c"] + '</a></div>';
				}
				if (element['prol_Website_3__c']) {
					if (element["prol_Website_3__c"].indexOf("http://") == -1 && element["prol_Website_3__c"].indexOf("https://") == -1) {
					website += '<div><a href="https://' + element["prol_Website_3__c"] + '" target="_blank">' + element["prol_Website_3__c"] + '</a></div>';
					}
					else
					website += '<div><a href="' + element["prol_Website_3__c"] + '" target="_blank">' + element["prol_Website_3__c"] + '</a></div>';
				}
				newrow += '</td><td><span class="bold">' + element["Name"] + '</span><div>' + element["prol_Published_Address__c"] + '</div>' + phone + email + fax + website + '</td></tr>';
				var subheadCount = 0;
				$('.subHeading').each(function () {
					if ($(this).children('th').text().trim() == element["prol_Type__c"].trim()) {
						$(newrow).insertAfter($(this));
						subheadCount = 1;
					}
				});
				if (subheadCount == 0) {
					var subheading = '<tr class="subHeading"><th colspan=3>' + element["prol_Type__c"] + '</th></tr>' + newrow;
					$(subheading).appendTo("#contact-epn-table");
				}
			});


			$('</tbody>').appendTo("#contact-epn-table");

		}
	}

	function updateDropDown(data) {
		globalList = data;
		// console.log(globalList);
		var country = data.filter((value, index, self) => self.map(x => x['prol_Country_Name__c']).indexOf(value['prol_Country_Name__c']) == index);
		var fulllist = globalList;

		const values = fulllist.map(function (item) {
			if (item.prol_Supported_Product_Groups__c) {
				return item.prol_Supported_Product_Groups__c.split(';');
			}
		});
		const sets = new Set([].concat(...values));
		var newArray = [];
		sets.forEach(element => {
			if (element && newArray.indexOf(element.trim()) == '-1') {
				newArray.push(element.trim());
			}

		});
		// console.log(newArray);
		var product = [];
		product[0] = "All Products and Services";
		product = product.concat(Array.from(newArray));

		var ProductLabel = [];

		product.forEach(element => {
			ProductLabel.push(element.replace(/toeic|toefl|ets|ell/gi, function (x) {
				return x.toUpperCase();
			}))
		});


		function titleCase(str) {
			var splitStr = str.split(' ');
			for (var i = 0; i < splitStr.length; i++) {
				if (splitStr[i] != "and")
					splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
				
			}
			// Directly return the joined string
			return splitStr.join(' ');
		}

		for (var i = country.length - 1; i >= 0; i--) {
			if (country[i]['prol_Country_Name__c'] == '') {
				country.splice(i, 1);
			}
		}

		country.sort(function (a, b) {
			return a["prol_Country_Name__c"].localeCompare(b["prol_Country_Name__c"]);
		});

		$('.filter-epn-country .list-autocomplete').empty();
		country.forEach(function (value) {
			$('.filter-epn-country .list-autocomplete').append(' <button type="button" class="dropdown-item" value = "' + value['prol_Country_Name__c'] + '"><label>' + value['prol_Country_Name__c'] + '</label></button>');
		});
		$('.filter-epn-product .list-autocomplete').empty();
		product.forEach(function (value, index) {
			$('.filter-epn-product .list-autocomplete').append(' <button type="button" class="dropdown-item" value = "' + value + '"><label>' + titleCase(ProductLabel[index]) + '</label></button>')
		});
		country.forEach(function(value, index) {
            $('.epn-country-dropdown').append('<option>' +value['prol_Country_Name__c'] + '</option>');
			if(index == (country.length -1)) {
				$(".epn-country-dropdown").select2({
					placeholder: $(".epn-country-dropdown").data("placeholder"),
					//maximumSelectionLength: 2,
					selectionCssClass: "singleselect-withsearch",
					dropdownCssClass: "singleselect-withsearch",
				});
				epnCountryAriaLabel = $(".epn-country-dropdown").attr('aria-label');
				setTimeout(() => {
					var setEPNCountryAriaLabel = $('.epn-country-dropdown').next('.select2-container').find('.select2-selection');
					if($('.epn-country-dropdown').hasClass("select2-hidden-accessible") && setEPNCountryAriaLabel.length == 1) {
						$('.epn-country-dropdown').removeAttr("aria-label");
						setEPNCountryAriaLabel.removeAttr('aria-labelledby');
						setEPNCountryAriaLabel.attr('aria-label', epnCountryAriaLabel);
					}
				}, 3000);
			}
        });
		product.forEach(function (value, index) {
			$('.epn-product-dropdown').append('<option value = "'+value+'">' +titleCase(ProductLabel[index]) + '</option>');
			if(index == (product.length -1)) {
				$(".epn-product-dropdown").select2({
					placeholder: $(".epn-product-dropdown").data("placeholder"),
					minimumResultsForSearch: Infinity,
					selectionCssClass: "singleselect-withoutsearch",
					dropdownCssClass: "singleselect-withoutsearch"
				});
				epnProductAriaLabel = $(".epn-product-dropdown").attr('aria-label');
				setTimeout(() => {
					var setEPNProductAriaLabel = $('.epn-product-dropdown').next('.select2-container').find('.select2-selection');
					if($('.epn-product-dropdown').hasClass("select2-hidden-accessible") && setEPNProductAriaLabel.length == 1) {
						$('.epn-product-dropdown').removeAttr("aria-label");
						setEPNProductAriaLabel.removeAttr('aria-labelledby');
						setEPNProductAriaLabel.attr('aria-label', epnProductAriaLabel);
					}
				}, 3000);
			}
		});
		// $(".epn-country-dropdown").select2({
		// 	placeholder: $(".epn-country-dropdown").data("placeholder"),
		// 	//maximumSelectionLength: 2,
		// 	selectionCssClass: "singleselect-withsearch",
        //     dropdownCssClass: "singleselect-withsearch",
		// });
		// setTimeout(() => {
		// 	var epnCountryAriaLabel = $(".epn-country-dropdown").attr('aria-label');
		// 	var setEPNCountryAriaLabel = $('.epn-country-dropdown').next('.select2-container').find('.select2-selection');
		// 	if($('.epn-country-dropdown').hasClass("select2-hidden-accessible") && setEPNCountryAriaLabel.length == 1) {
		// 		$('.epn-country-dropdown').removeAttr("aria-label");
		// 		setEPNCountryAriaLabel.attr('aria-label', epnCountryAriaLabel);
		// 	}
		// }, 3000);
		//  $(".epn-product-dropdown").select2({
		// 	placeholder: $(".epn-product-dropdown").data("placeholder"),
		// 	minimumResultsForSearch: Infinity,
		// 	selectionCssClass: "singleselect-withoutsearch",
        //     dropdownCssClass: "singleselect-withoutsearch"
		// });
		// epnProductAriaLabel = $(".epn-product-dropdown").attr('aria-label');
		// setTimeout(() => {
		// 	var setEPNProductAriaLabel = $('.epn-product-dropdown').next('.select2-container').find('.select2-selection');
		// 	if($('.epn-product-dropdown').hasClass("select2-hidden-accessible") && setEPNProductAriaLabel.length == 1) {
		// 		$('.epn-product-dropdown').removeAttr("aria-label");
		// 		setEPNProductAriaLabel.attr('aria-label', epnProductAriaLabel);
		// 	}
		// }, 3000);
		// $(document).on('select2:open', () => {
		// 	document.querySelector('.select2-search__field').focus();
		//   });

		if ($(".contact-epn")[0]) {
			$('.epn-country-dropdown').on('change', function() {	
				selectedCountry = $(".epn-country-dropdown option:selected").text();
				var list = filterData(globalList, selectedCountry, 'prol_Country_Name__c');
				$('#contact-epn-table').empty();
				selectedProduct = "All Products and Services";
				//updateCards(list);
				$(".epn-product-dropdown").select2({
					placeholder: $(".epn-product-dropdown").data("placeholder"),
					minimumResultsForSearch: Infinity,
					selectionCssClass: "singleselect-withoutsearch",
					dropdownCssClass: "singleselect-withoutsearch",
				}).val("All Products and Services").trigger("change");		
				setTimeout(() => {
					$('.epn-product-dropdown').next('.select2-container').find('.select2-selection').attr('aria-label', epnProductAriaLabel);	
					$('.epn-product-dropdown').next('.select2-container').find('.select2-selection').removeAttr('aria-labelledby');
				}, 2000);
			});

			$('.epn-product-dropdown').on('change', function () {
				selectedProduct = $(".epn-product-dropdown option:selected").val();
				var list = filterData(globalList, selectedCountry, 'prol_Country_Name__c');
				if (selectedProduct != "All Products and Services")
					list = filterContainsData(list, selectedProduct, 'prol_Supported_Product_Groups__c');
				$('#contact-epn-table').empty();
				updateCards(list);
			});
			

		}
	}

	if ($(".contact-epn")[0]) {
		var dataPath = $("#contact-epn-table").data('contact-epn-path');
		//var dataPath = '/src/main/webpack/components/js/contactEPN.json';
		$.getJSON(dataPath, function (collection) {
			var data = collection.records;
			// console.log(data);
			updateDropDown(data);
		});
	} else {
		// Do something if class does not exist
	}
	// $('.jAuto').on('focus', function () {
	// 	$('.dropdown-menu').removeClass('show');
	// 	$('.dropdown').removeClass('active-dropdown');
	// })

	// $('.filter-epn-country').on('focus', '.dropdown-item', function () {
	// 	var element = $(this);
	// 	var categoryElement = element[0];
	// 	$('.filter-epn-country .jAuto').val($(categoryElement).val());
	// 	var selectedCountry = $(categoryElement).val();
	// 	var onloadCountrydata = filterData(globalList, selectedCountry, 'prol_Country_Name__c');
	// 	$(".filter-epn-product .jAuto").val("All Products and Services");
	// 	selectedProduct = "All Products and Services";
	// 	$(".filter-epn-product .dropdown").removeClass('disable');
	// 	$(".filter-epn-product .jAuto").attr('tabindex', '0');
	// 	$('.contact-epn-table').empty();
	// 	updateCards(onloadCountrydata);
	// });
	// $('.filter-epn-product').on('focus', '.dropdown-item', function () {
	// 	var element = $(this);
	// 	var categoryElement = element[0];
	// 	$('.filter-epn-product .jAuto').val($(categoryElement).val());
	// 	selectedProduct = $(categoryElement).val();
	// 	var list = filterData(globalList, selectedCountry, 'prol_Country_Name__c');
	// 	if (selectedProduct != "All Products and Services")
	// 		list = filterContainsData(list, selectedProduct, 'prol_Supported_Product_Groups__c');
	// 	$('#contact-epn-table').empty();
	// 	updateCards(list);
	// });
	// $('.filter-epn-product .jAuto').keypress(function (event) {
	// 	var keycode = (event.keyCode ? event.keyCode : event.which);
	// 	if (keycode == '13') {
	// 		$('.filter-epn-product .dropdown-menu').addClass('show');
	// 		$('.filter-epn-product .dropdown').addClass('active-dropdown');

	// 	}
	// 	event.stopPropagation();
	// });
	// $('.filter-epn-product .dropdown-menu').keypress(function (event) {
	// 	var keycode = (event.keyCode ? event.keyCode : event.which);
	// 	if (keycode == '13') {
	// 		$('.filter-epn-product .dropdown-menu').removeClass('show');
	// 		$('.filter-epn-product .dropdown').removeClass('active-dropdown');

	// 	}
	// 	event.stopPropagation();
	// });
	// $(".filter-epn-product .jAuto").on("keyup", function (e) {
	// 	var keycode = (e.keyCode ? e.keyCode : e.which);
	// 	if (keycode != '13' && keycode != '9') {
	// 		$(this).parent('.dropdown-toggle').siblings('.dropdown-menu').addClass('show');
	// 	}
	// 	input = $(this).val();
	// 	console.log(input);
	// 	var filter = input.toUpperCase();
	// 	var dropdown = $(this).parent('.dropdown-toggle').siblings('.dropdown-menu');
	// 	var dropdownItem = $(dropdown).find('.dropdown-item');
	// 	for (i = 0; i < dropdownItem.length; i++) {
	// 		txtValue = $(dropdownItem[i]).val();
	// 		if (txtValue.toUpperCase().indexOf(filter) > -1) {
	// 			dropdownItem[i].style.display = "";
	// 		} else {
	// 			dropdownItem[i].style.display = "none";
	// 		}

	// 	}
	// });




	// $('.filter-epn-country .jAuto').keypress(function (event) {
	// 	var keycode = (event.keyCode ? event.keyCode : event.which);
	// 	if (keycode == '13') {
	// 		$('.filter-epn-country .dropdown-menu').addClass('show');
	// 		$('.filter-epn-country .dropdown').addClass('active-dropdown');

	// 	}
	// 	event.stopPropagation();
	// });
	// $('.filter-epn-country .dropdown-menu').keypress(function (event) {
	// 	var keycode = (event.keyCode ? event.keyCode : event.which);
	// 	if (keycode == '13') {
	// 		$('.filter-epn-country .dropdown-menu').removeClass('show');
	// 		$('.filter-epn-country .dropdown').removeClass('active-dropdown');

	// 	}
	// 	event.stopPropagation();
	// });
	// $(".filter-epn-country .jAuto").on("keyup", function (e) {
	// 	var keycode = (e.keyCode ? e.keyCode : e.which);
	// 	if (keycode != '13' && keycode != '9') {
	// 		$(this).parent('.dropdown-toggle').siblings('.dropdown-menu').addClass('show');
	// 	}
	// 	input = $(this).val();
	// 	console.log(input);
	// 	var filter = input.toUpperCase();
	// 	var dropdown = $(this).parent('.dropdown-toggle').siblings('.dropdown-menu');
	// 	var dropdownItem = $(dropdown).find('.dropdown-item');
	// 	for (i = 0; i < dropdownItem.length; i++) {
	// 		txtValue = $(dropdownItem[i]).val();
	// 		if (txtValue.toUpperCase().indexOf(filter) > -1) {
	// 			dropdownItem[i].style.display = "";
	// 		} else {
	// 			dropdownItem[i].style.display = "none";
	// 		}

	// 	}
	// });
	// $(document).on('focus', '#contact-epn-table a', function () {

	// 	$('.filter-epn-product .dropdown-menu').removeClass('show');
	// 	$('.filter-epn-product .dropdown').removeClass('active-dropdown');

	// });

});


