var mbaProgramList = [];
$(function() {
    function filterData(obj, arr, parameter) {
        var filtered = obj.filter(function(item) {
            return arr.replace(/&nbsp;/g, '').replace(/\s+/g, '') == item[parameter].replace(/&nbsp;/g, '').replace(/\s+/g, '');
        });
        obj = filtered;
        return obj;
    }

    function updateCards(list) {
         $('.gre-mba-filter__table').css('display','table');
        list.sort(function(a, b) {
            return a["School"].localeCompare(b["School"]);
        });
        var Country = list.filter((value, index, self) => self.map(x => x['Country']).indexOf(value['Country']) == index);
        for (var i = Country.length - 1; i >= 0; i--) {
            if (Country[i]['Country'] == '') {
                Country.splice(i, 1);
            }
        }

        for (var i = 0; i <= Country.length - 1; i++) {
            var newList = filterData(list, Country[i]['Country'], 'Country');
            for (var j = newList.length - 1; j >= 0; j--) {
                if (newList[j]['School'] == '') {
                    newList.splice(j, 1);
                }
            }
            var row = '<tr><th rowspan=' + newList.length + '>' + newList[0]['Country'] + '</th><td>' + newList[0]['School'] + '</td></tr>';
            var column = row;
            for (var k = 1; k <= newList.length - 1; k++) {

                column += '<tr><td>' + newList[k]['School'] + '</td></tr>';

            }
            $(column).appendTo(".gre-mba-filter__table__content");
        }
    }

    function updateDropDown(data) {

        var Country = data.filter((value, index, self) => self.map(x => x['Country']).indexOf(value['Country']) == index);
        for (var i = Country.length - 1; i >= 0; i--) {
            if (Country[i]['Country'] == '') {
                Country.splice(i, 1);
            }
        }

        Country.sort(function(a, b) {
            return a["Country"].localeCompare(b["Country"]);
        });

        // $('.gre-mba-filter .list-autocomplete').empty();
        // Country.forEach(function(value) {
        //     $('.gre-mba-filter .list-autocomplete').append(' <button type="button" class="dropdown-item" value = "' + value['Country'] + '"><label>' + value['Country'] + '</label></button>')
        // });
        Country.forEach(function(value) {
            $('.gre-mba-dropdown').append('<option>' +  value['Country'] + '</option>')
        });
        $(".gre-mba-dropdown").select2({
			placeholder: $(".gre-mba-dropdown").data("placeholder"),
			//maximumSelectionLength: 2,
			selectionCssClass: "singleselect-withsearch",
            dropdownCssClass: "singleselect-withsearch",
		});
        var grembaAriaLabel = $(".gre-mba-dropdown").attr('aria-label');
        setTimeout(() => {
            var setgrembaAriaLabel = $('.gre-mba-dropdown').next('.select2-container').find('.select2-selection');
            if($('.gre-mba-dropdown').hasClass("select2-hidden-accessible") && setgrembaAriaLabel.length == 1) {
                $('.gre-mba-dropdown').removeAttr("aria-label");
                setgrembaAriaLabel.removeAttr('aria-labelledby');
                setgrembaAriaLabel.attr('aria-label', grembaAriaLabel);
            }
        }, 2500);

        // if ($(".gre-mba-filter")[0]) {

        //     $('.gre-mba-filter .dropdown-item').on('click', function() {
        //         var category = $(this).attr("searchData");
        //         console.log(category);
        //         $('.gre-mba-filter .jAuto').val($(this).children('label').html());
        //         var Country = $(this).children('label').html();

        //         var onloadCountrydata = filterData(data, Country, 'Country');
        //         onloadCountrydata.sort(function(a, b) {
        //             return a["School"].localeCompare(b["School"]);
        //         });
        //         $('.gre-mba-filter__table__content').empty();
        //         $('.gre-mba-filter__footnote').empty();
        //         updateCards(onloadCountrydata);
        //     });
        // }
         if ($(".gre-mba-dropdown")[0]) {

            $('.gre-mba-dropdown').on('change', function() {
                var Country =  $(".gre-mba-dropdown option:selected").text();
                var onloadCountrydata = filterData(data, Country, 'Country');
                onloadCountrydata.sort(function(a, b) {
                    return a["School"].localeCompare(b["School"]);
                });
                $('.gre-mba-filter__table__content').empty();
                $('.gre-mba-filter__footnote').empty();
                updateCards(onloadCountrydata);
            });
        }
    }
    if ($(".gre-mba-filter")[0]) {
        $('.gre-mba-filter__table').css('display','none');
        var dataPath = $("#gre-mba").data('gre-mba-path');
        $.getJSON(dataPath, function(data) {
            var filterdropDown = data["GRE_MBA_programs"];
            mbaProgramList = filterdropDown;
            updateDropDown(filterdropDown);
           // updateCards(filterdropDown);
        });
    } else {
        // Do something if class does not exist
    }
    // $(document).on('click', '.jAuto', function() {
    //     // in case input text already exists
    //     $(this).siblings('.dropdown-menu').addClass('show');
    //     $(this).parent('.dropdown').addClass('active-dropdown');
    // });
 /*   $('.gre-mba-filter__filter').on('focus', '.dropdown-item', function() {
        var element = $(this);
        var categoryElement = element[0];
        var category = $(categoryElement).attr("searchData");
        console.log(category);
        $('.gre-mba-filter .jAuto').val($(categoryElement).children('label').html());
        var Country = $(categoryElement).children('label').html();

        var onloadCountrydata = filterData(mbaProgramList, Country, 'Country');
        onloadCountrydata.sort(function(a, b) {
            return a["School"].localeCompare(b["School"]);
        });
        $('.gre-mba-filter__table__content').empty();
        $('.gre-mba-filter__footnote').empty();
        updateCards(onloadCountrydata);
    });
    // $(".gre-mba-filter__filter .dropdown").on(
    //     "hide.bs.dropdown",
    //     function() {
    //         $(this).child('.dropdown-menu').removeClass('show');
    //         $(this).removeClass('active-dropdown');;
    //     }
    // );
    // $('.dropdown').hover(function() {
    //         $(this).addClass('active-dropdown');
    //         $(this).siblings('.dropdown-menu').addClass('show');
    //     },
    //     function() {
    //         $(this).removeClass('active-dropdown');
    //         $(this).siblings('.dropdown-menu').removeClass('show');
    //     });

    //     $(document).on("click", function(event){

    //         var $trigger = $(".gre-mba-filter__filter .dropdown");
    
           
    
    //         if($trigger !== event.target && !$trigger.has(event.target).length){
    
    //             $('.gre-mba-filter__filter .dropdown-menu').removeClass('show');
    
    //             $('gre-mba-filter__filter .dropdown').removeClass('active-dropdown');
    
    //         }
    
           
    
    //     });
        $('.gre-mba-filter__filter .jAuto').keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
             $('.gre-mba-filter__filter .dropdown-menu').addClass('show');
            $('.gre-mba-filter__filter .dropdown').addClass('active-dropdown');
        
            }
            event.stopPropagation();
        });
        $('.gre-mba-filter__filter .dropdown-menu').keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
             $('.gre-mba-filter__filter .dropdown-menu').removeClass('show');
            $('.gre-mba-filter__filter .dropdown').removeClass('active-dropdown');
        
            }
            event.stopPropagation();
        });
    $(".gre-mba-filter__filter .jAuto").on("keyup", function(e) {
        $(this).siblings('.dropdown-menu').addClass('show');
        input = $(this).val();
        console.log(input);
        var filter = input.toUpperCase();
        var dropdown = $(this).siblings('.dropdown-menu');
        var dropdownItem = $(dropdown).find('.dropdown-item');
        for (i = 0; i < dropdownItem.length; i++) {
            txtValue = $(dropdownItem[i]).val();
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                dropdownItem[i].style.display = "";
            } else {
                dropdownItem[i].style.display = "none";
            }

        }
    });*/
});