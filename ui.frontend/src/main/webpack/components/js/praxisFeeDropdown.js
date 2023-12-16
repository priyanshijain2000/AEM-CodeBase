var praxisFeeList = [];
$(function() {
    function filterData(obj, arr, parameter) {
        var filtered = obj.filter(function(item) {
            return arr.replace(/&nbsp;/g, '').replace(/\s+/g, '') == item[parameter].replace(/&nbsp;/g, '').replace(/\s+/g, '');
        });
        obj = filtered;
        return obj;
    }

    function updateCards(list) {
         $('.praxis-fee-filter__table').css('display','table');
        
       
            var row = '<tr><td>' + list[0]['Test Code'] + '</td><td>' + list[0]['Test Title'] + '</td><td>' + list[0]['Fee'] + '</td><tr/>';
            $(row).appendTo(".praxis-fee-filter__table__content");
 
    }

    function updateDropDown(data) {

        var Country = data.filter((value, index, self) => self.map(x => x['Test Title']).indexOf(value['Test Title']) == index);
        for (var i = Country.length - 1; i >= 0; i--) {
            if (Country[i]['Test Title'] == '') {
                Country.splice(i, 1);
            }
        }

        Country.sort(function(a, b) {
            return a['Test Title'].localeCompare(b['Test Title']);
        });

        Country.forEach(function(value) {
            $('.praxis-fee-dropdown').append('<option value=' + value['Test Code'] + '>' +  value['Test Title'] + ' (' + value['Test Code'] + ')' + '</option>')
        });
        /*function formatState(state) {
            if (!state.id) {
                return state.text;
            }
           
            var $state = $(
                '<span style="width:100%">' + state.text + ' (' + state.element.value + ')' + '</span>'
            );
            return $state;
        };*/
        $(".praxis-fee-dropdown").select2({
			placeholder: $(".praxis-fee-dropdown").data("placeholder"),
			//maximumSelectionLength: 2,
			selectionCssClass: "singleselect-withsearch",
            dropdownCssClass: "singleselect-withsearch",
            //templateResult: formatState
		});
        var praxisfeeAriaLabel = $(".praxis-fee-dropdown").attr('aria-label');
        setTimeout(() => {
            var setpraxisfeeAriaLabel = $(".praxis-fee-dropdown").next('.select2-container').find('.select2-selection');
            if($(".praxis-fee-dropdown").hasClass("select2-hidden-accessible") && setpraxisfeeAriaLabel.length == 1) {
              $(".praxis-fee-dropdown").removeAttr("aria-label");
              setpraxisfeeAriaLabel.removeAttr('aria-labelledby');
              setpraxisfeeAriaLabel.attr('aria-label', praxisfeeAriaLabel);
            }
          }, 2000);

         if ($(".praxis-fee-dropdown")[0]) {

            $('.praxis-fee-dropdown').on('change', function() {
                var Country =  $(".praxis-fee-dropdown option:selected").text();
                Country = Country.substr(0, Country.lastIndexOf('('));
                var onloadCountrydata = filterData(data, Country, 'Test Title');
                $('.praxis-fee-filter__table__content').find("tr:gt(0)").remove();
                updateCards(onloadCountrydata);
            });
        }
    }
    if ($(".praxis-fee-filter")[0]) {
        $('.praxis-fee-filter__table').css('display','none');
        var dataPath = $("#praxis-fee").data('praxis-fee-path');
        $.getJSON(dataPath, function(data) {
            var filterdropDown = data["PRAXIS_fees"];
            praxisFeeList = filterdropDown;
            updateDropDown(filterdropDown);
           // updateCards(filterdropDown);
        });
    }
});