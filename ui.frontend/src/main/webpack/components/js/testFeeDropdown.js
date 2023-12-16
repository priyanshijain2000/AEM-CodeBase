var testFeeList = [];
$(function() {
    function filterData(obj, arr, parameter) {
        var filtered = obj.filter(function(item) {
            return arr.replace(/&nbsp;/g, '').replace(/\s+/g, '') == item[parameter].replace(/&nbsp;/g, '').replace(/\s+/g, '');
        });
        obj = filtered;
        return obj;
    }

    function updateCards(list) {
         $('.test-fee-filter__table').css('display','table');
        
       
            var row = '<tr><td>' + list[0]['country'] + '</td><td>' + list[0]['fee'] + '</td></tr>';
            $(row).appendTo(".test-fee-filter__table__content");
 
    }

    function updateDropDown(data) {

        var Country = data.filter((value, index, self) => self.map(x => x['country']).indexOf(value['country']) == index);
        for (var i = Country.length - 1; i >= 0; i--) {
            if (Country[i]['country'] == '') {
                Country.splice(i, 1);
            }
        }

        Country.sort(function(a, b) {
            return a['country'].localeCompare(b['country']);
        });

        Country.forEach(function(value) {
            $('.test-fee-dropdown').append('<option>' +  value['country'] + '</option>')
        });
        $(".test-fee-dropdown").select2({
			placeholder: $(".test-fee-dropdown").data("placeholder"),
			//maximumSelectionLength: 2,
			selectionCssClass: "singleselect-withsearch",
            dropdownCssClass: "singleselect-withsearch",
		});
        var testfeeAriaLabel = $(".test-fee-dropdown").attr('aria-label');
        setTimeout(() => {
            var settestfeeAriaLabel = $('.test-fee-dropdown').next('.select2-container').find('.select2-selection');
            if($('.test-fee-dropdown').hasClass("select2-hidden-accessible") && settestfeeAriaLabel.length == 1) {
                $('.test-fee-dropdown').removeAttr("aria-label");
                settestfeeAriaLabel.removeAttr('aria-labelledby');
                settestfeeAriaLabel.attr('aria-label', testfeeAriaLabel);
            }
        }, 2500);

         if ($(".test-fee-dropdown")[0]) {

            $('.test-fee-dropdown').on('change', function() {
                var Country =  $(".test-fee-dropdown option:selected").text();
                var onloadCountrydata = filterData(data, Country, 'country');
                $('.test-fee-filter__table__content').find("tr:gt(0)").remove();
                updateCards(onloadCountrydata);
            });
        }
    }
    if ($(".test-fee-filter")[0]) {
        $('.test-fee-filter__table').css('display','none');
        var dataPath = $("#test-fee").data('test-fee-path');
        $.getJSON(dataPath, function(data) {
            var filterdropDown = data["fees"];
            testFeeList = filterdropDown;
            updateDropDown(filterdropDown);
           // updateCards(filterdropDown);
        });
    }
});