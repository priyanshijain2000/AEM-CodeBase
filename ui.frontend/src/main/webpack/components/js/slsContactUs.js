var countryList = [];
$(function() {
    function filterData(obj, arr, parameter) {
        var filtered = obj.filter(function(item) {
            return arr.replace(/&nbsp;/g, '').replace(/\s+/g, '') == item[parameter].replace(/&nbsp;/g, '').replace(/\s+/g, '');
        });
        obj = filtered;
        return obj;
    }

    function updateCards(list) {

        var isTitle = 0;
        for (var i = 0; i <= list.length - 1; i++) {
            var row = "";
            if(list[i]['Title'] && isTitle!=1){
                isTitle = 1;
                row+='<tr><td colspan=2><h3>'+  list[i]['Title']+'</h3></td></tr>';
            }
            if(list[i]['Subtitle'])
                row+='<tr><td colspan=2><h4>'+  list[i]['Subtitle']+'</h4></td></tr>';
            if(list[i]['Note']){
                if(list[i]['Note URL']) {
                    row+='<tr><td colspan=2><a href="'+list[i]['Note URL']+'" alt="Note link" target="_blank">'+  list[i]['Note']+'</td></tr>';
                }
                else{
                    row+='<tr><td colspan=2>'+  list[i]['Note']+'</td></tr>';
                }
            }
               

            for (const key in list[i]) {
                if(key == 'Website Title' && list[i]['Website URL']){
                    row += '<tr><th>'+key+':</th> <td><a href="'+list[i]['Website URL']+'" alt="website link" target="_blank">' + list[i][key] + '</a></td></tr>';
                }
                if(key == 'Department' && list[i]['Department URL']){
                    row += '<tr><th>'+key+':</th> <td><a href="'+list[i]['Department URL']+'" alt="Department link" target="_blank">' + list[i][key] + '</a></td></tr>';
                }
                if(key == 'Email'){
                    var strEmail = list[i][key];
                    if (strEmail.indexOf('www.') == -1) {
                        row += '<tr><th>'+key+':</th> <td><a href="mailto:'+list[i][key]+'">' +list[i][key]+'</a></td></tr>';
                    } else {
                        row += '<tr><th>'+key+':</th> <td><a href="https://'+list[i][key]+'" target="_blank">' +list[i][key]+'</a></td></tr>';
                    }
                }
                if(key !='Title'&& key !='Subtitle'&& key !='Note'&& key !='Website URL'&& key !='Note URL' && key !='Website URL' && key !='Website Title'&& key !='Department URL' && key !='Department' && key != 'Email')
                row += '<tr><th>'+key+':</th> <td>' +list[i][key]+'</td></tr>';
              }
            $(row).appendTo(".sls-contactus-filter__table__content");
        }
    }

    function updateDropDown(data) {

        var Country = data.filter((value, index, self) => self.map(x => x['Title']).indexOf(value['Title']) == index);
        for (var i = Country.length - 1; i >= 0; i--) {
            if (Country[i]['Title'] == ''|| !Country[i]['Title'] || Object.keys(Country[i]).length == 1) {
                Country.splice(i, 1);
            }
        }

        Country.sort(function(a, b) {
            return a["Title"].localeCompare(b["Title"]);
        });

        // $('.sls-contactus-filter .list-autocomplete').empty();
        // Country.forEach(function(value) {
        //     $('.sls-contactus-filter .list-autocomplete').append('<button type="button" class="dropdown-item" value = "' + value['Title'] + '"><label>' + value['Title'] + '</label></button>')
        // });
        Country.forEach(function(value) {
            $('.sls-contactus-dropdown').append('<option>' + value['Title'] + '</option>')
        });
        $(".sls-contactus-dropdown").select2({
			placeholder: $(".sls-contactus-dropdown").data("placeholder"),
			//maximumSelectionLength: 2,
			selectionCssClass: "singleselect-withsearch",
            dropdownCssClass: "singleselect-withsearch",
		});
        // if ($(".sls-contactus-filter")[0]) {
        //     $('.sls-contactus-filter .dropdown-item').on('click', function() {
        //         var category = $(this).attr("searchData");
        //         console.log(category);
        //         $('.sls-contactus-filter .jAuto').val($(this).children('label').html());
        //         var Country = $(this).children('label').html();

        //         var onloadCountrydata = filterData(data, Country, 'Title');

        //         $('.sls-contactus-filter__table__content').empty();
        //         updateCards(onloadCountrydata);
        //     });
        // }
        if ($(".sls-contactus-dropdown")[0]) {

            $('.sls-contactus-dropdown').on('change', function() {
                var Country  = $(".sls-contactus-dropdown option:selected").text();
                var onloadCountrydata = filterData(data, Country, 'Title');
                $('.sls-contactus-filter__table__content').empty();
                updateCards(onloadCountrydata);
            });
        }

    }
    if ($(".sls-contactus-dropdown")[0]) {
        var dataPath = $("#sls-contactus").data('sls-contactus-path');
        $.getJSON(dataPath, function(data) {
            var filterdropDown = data["contact_us_list_sls"];
            countryList = filterdropDown;
            updateDropDown(filterdropDown);
        });
    } else {
        // Do something if class does not exist
    }
   
    // $('.sls-contactus-filter__filter').on('focus', '.dropdown-item', function() {
    //     var element = $(this);
    //     var categoryElement = element[0];
    //     var category = $(categoryElement).attr("searchData");
    //     console.log(category);
    //     $('.sls-contactus-filter .jAuto').val($(categoryElement).children('label').html());
    //     var Country = $(categoryElement).children('label').html();

    //     var onloadCountrydata = filterData(countryList, Country, 'Title');

    //     $('.sls-contactus-filter__table__content').empty();
    //     updateCards(onloadCountrydata);
    // });

    // $('.sls-contactus-filter__filter .jAuto').keypress(function(event){
    //     var keycode = (event.keyCode ? event.keyCode : event.which);
    //     if(keycode == '13'){
    //      $('.sls-contactus-filter__filter .dropdown-menu').addClass('show');
    //     $('.sls-contactus-filter__filter .dropdown').addClass('active-dropdown');
    
    //     }
    //     event.stopPropagation();
    // });
    // $('.sls-contactus-filter__filter .dropdown-menu').keypress(function(event){
    //     var keycode = (event.keyCode ? event.keyCode : event.which);
    //     if(keycode == '13'){
    //      $('.sls-contactus-filter__filter .dropdown-menu').removeClass('show');
    //     $('.sls-contactus-filter__filter .dropdown').removeClass('active-dropdown');
    
    //     }
    //     event.stopPropagation();
    // });
    // $(".sls-contactus-filter__filter .jAuto").on("keyup", function(e) {
    //    $(this).siblings('.dropdown-menu').addClass('show');
    //     input = $(this).val();
    //     console.log(input);
    //     var filter = input.toUpperCase();
    //     var dropdown = $(this).parent('.dropdown-toggle').siblings('.dropdown-menu');
    //     var dropdownItem = $(dropdown).find('.dropdown-item');
    //     for (i = 0; i < dropdownItem.length; i++) {
    //         txtValue = $(dropdownItem[i]).val();
    //         if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //             dropdownItem[i].style.display = "";
    //         } else {
    //             dropdownItem[i].style.display = "none";
    //         }

    //     }
    // });
});