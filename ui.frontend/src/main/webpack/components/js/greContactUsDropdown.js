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


        for (var i = 0; i <= list.length - 1; i++) {
            var webURL = list[i]["Website URL"] ? list[i]["Website URL"] : "";
            var nationalOffice = list[i]["National Office"] ? list[i]["National Office"] : "";
            var hours = list[i]["Hours"] ? list[i]["Hours"] : "";
            var title = list[i]["Title"];
            var departmentURL = list[i]["Department URL"] ? list[i]["Department URL"] : "";
            var websiteTitle = list[i]["Website Title"] ? list[i]["Website Title"] : "";
            var department = list[i]["Department"] ? list[i]["Department"] : "";
            var email = list[i]["Email"] ? list[i]["Email"] : "";
            var mail = list[i]["Mail"] ? list[i]["Mail"] : "";
            var phone = list[i]["Phone"] ? list[i]["Phone"] : "";
            var TTY = list[i]["TTY"] ? list[i]["TTY"] : "";
            var tddAccess = list[i]["TDD Access"] ? list[i]["TDD Access"] : "";
            var fax = list[i]["Fax"] ? list[i]["Fax"] : "";
            var toll = list[i]["Toll-free Phone"] ? list[i]["Toll-free Phone"] : "";
            var bureau = list[i]["Bureau of Credentialing"] ? list[i]["Bureau of Credentialing"] : "";
            var officeHours = list[i]["Office Hours"] ? list[i]["Office Hours"] : "";
            var note = list[i]["Note"] ? list[i]["Note"] : "";
            var overnightMail = list[i]["Overnight Mail"] ? list[i]["Overnight Mail"] : "";
            var physicalAddress = list[i]["Physical Address"] ? list[i]["Physical Address"] : "";
            var address = list[i]["Address"] ? list[i]["Address"] : "";
            var CLO = list[i]["CLO"] ? list[i]["CLO"] : "";
            var noteURL = list[i]["Note URL"] ? list[i]["Note URL"]:"#";
            var row = "";
                if(note !=="" ) {
                    row += '<tr><th>Note</th> <td><a href="'+noteURL+'" alt="note link">' +note+'</a></td></tr>';
                }
                if (email != "") {
                    row += '<tr><th>Email</th> <td><a href="mailto:'+email+'">' + email + '</a></td></tr>';
                }
                if (phone != "") { 
                    if (toll != "") {
                        row += '<tr><th rowspan=2>Phone</th><td>' + phone + '</td></tr><tr><td><span class="Bold">Toll Free:</span>' + toll + '</td></tr>';

                    } 
                   
                    else
                        row += '<tr><th>Phone</th> <td>' + phone + '</td></tr>';
                }
                if (fax != "") {
                    row += '<tr><th>Fax </th> <td>' + fax + '</td></tr>';

                }
                if (TTY != "") {
                    row += '<tr><th>TTY </th> <td>' + TTY + '</td></tr>';

                }
                if (hours != "") {
                    row += '<tr><th>Hours</th> <td>' + hours + '</td></tr>';

                }
                if (officeHours != "") {
                    row += '<tr><th>Office Hours</th> <td>' + officeHours + '</td></tr>';

                }
                if (mail != "") {
                    row += '<tr><th>Mail</th> <td>' + mail + '</td></tr>';

                }
                if (address != "") {
                    row += '<tr><th>Address</th> <td>' + address + '</td></tr>';

                }
                if (physicalAddress != "") {
                    row += '<tr><th>Physical Address</th> <td>' + physicalAddress + '</td></tr>';

                }
                if (nationalOffice != "") {
                    row += '<tr><th>National Office</th> <td>' + nationalOffice + '</td></tr>';

                }
                if (overnightMail != "") {
                    row += '<tr><th>Overnight Mail</th> <td>' + overnightMail + '</td></tr>';

                }
                if(websiteTitle !=="" && webURL !==""){
                    row += '<tr><th>Website</th> <td><a href="'+webURL+'" alt="website link">' + websiteTitle + '</a></td></tr>';
                }
                if(department !=="" && departmentURL !==""){
                    row += '<tr><th>Department</th> <td><a href="'+departmentURL+'" alt="department link">' + department + '</a></td></tr>';
                }
                if(bureau !==""){
                    row +='<tr><th>Bureau of Credentialing</th> <td>' + bureau + '</td></tr>';
                }
                if(tddAccess !==""){
                    row +='<tr><th>TDD Access</th> <td>' + tddAccess + '</td></tr>';
                }
                if(CLO !==""){
                    row +='<tr><th>CLO</th> <td>' + CLO + '</td></tr>';
                }
                  
            $(row).appendTo(".gre-contactus-filter__table__content");
        }
    }

    function updateDropDown(data) {

        var Country = data.filter((value, index, self) => self.map(x => x['Title']).indexOf(value['Title']) == index);
        for (var i = Country.length - 1; i >= 0; i--) {
            if (Country[i]['Title'] == '') {
                Country.splice(i, 1);
            }
        }

        Country.sort(function(a, b) {
            return a["Title"].localeCompare(b["Title"]);
        });

        // $('.gre-contactus-filter .list-autocomplete').empty();
        // Country.forEach(function(value) {
        //     $('.gre-contactus-filter .list-autocomplete').append(' <button type="button" class="dropdown-item" value = "' + value['Title'] + '"><label>' + value['Title'] + '</label></button>')
        // });
        Country.forEach(function(value) {
            $('.gre-contactus-dropdown').append('<option>' + value['Title'] + '</option>')
        });
        $(".gre-contactus-dropdown").select2({
			placeholder: $(".gre-contactus-dropdown").data("placeholder"),
			//maximumSelectionLength: 2,
			selectionCssClass: "singleselect-withsearch",
            dropdownCssClass: "singleselect-withsearch",
		});

        // if ($(".gre-contactus-filter")[0]) {

        //     $('.gre-contactus-filter .dropdown-item').on('click', function() {
        //         var category = $(this).attr("searchData");
        //         console.log(category);
        //         $('.gre-contactus-filter .jAuto').val($(this).children('label').html());
        //         var Country = $(this).children('label').html();

        //         var onloadCountrydata = filterData(data, Country, 'Title');

        //         $('.gre-contactus-filter__table__content').empty();
        //         updateCards(onloadCountrydata);
        //     });
        // }
         if ($(".gre-contactus-dropdown")[0]) {

            $('.gre-contactus-dropdown').on('change', function() {
                
                var Country =  $(".gre-contactus-dropdown option:selected").text();
                var onloadCountrydata = filterData(data, Country, 'Title');
                $('.gre-contactus-filter__table__content').empty();
                updateCards(onloadCountrydata);
            });
        }
    }
    if ($(".gre-contactus-dropdown")[0]) {
        var dataPath = $("#gre-contactus").data('gre-contactus-path');
        $.getJSON(dataPath, function(data) {
            var filterdropDown = data["contact_us_list_gre"];
            countryList = filterdropDown;
            updateDropDown(filterdropDown);
        });
    } else {
        // Do something if class does not exist
    }
    // $(document).on('click', '.jAuto', function() {
    //     // in case input text already exists
    //     $(this).parent().siblings('.dropdown-menu').addClass('show');
    //     $(this).parents('.dropdown').addClass('active-dropdown');
    // });
    // $(document).on('keydown', '.jAuto', function() {
    //     // in case input text already exists
    //     $(this).parent().siblings('.dropdown-menu').addClass('show');
    //     $(this).parents('.dropdown').addClass('active-dropdown');
    // });
   /* $('.gre-contactus-filter__filter').on('focus', '.dropdown-item', function() {
        var element = $(this);
        var categoryElement = element[0];
        var category = $(categoryElement).attr("searchData");
        console.log(category);
        $('.gre-contactus-filter .jAuto').val($(categoryElement).children('label').html());
        var Country = $(categoryElement).children('label').html();

        var onloadCountrydata = filterData(countryList, Country, 'Title');

        $('.gre-contactus-filter__table__content').empty();
        updateCards(onloadCountrydata);
    });
    // $(".gre-contactus-filter__filter .dropdown").on(
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

    //         var $trigger = $(".gre-contactus-filter__filter .dropdown");
    
           
    
    //         if($trigger !== event.target && !$trigger.has(event.target).length){
    
    //             $('.gre-contactus-filter__filter .dropdown-menu').removeClass('show');
    
    //             $('.gre-contactus-filter__filter .dropdown').removeClass('active-dropdown');
    
    //         }
    
           
    
    //     });
    //     $(document).on("click", function(event){

    //         var $trigger = $(".gre-contactus-filter__filter .dropdown");
    
           
    
    //         if($trigger !== event.target && !$trigger.has(event.target).length){
    
    //             $('.gre-contactus-filter__filter .dropdown-menu').removeClass('show');
    
    //             $('.gre-contactus-filter__filter .dropdown').removeClass('active-dropdown');
    
    //         }
    
           
    
    //     });
    $('.gre-contactus-filter__filter .jAuto').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
         $('.gre-contactus-filter__filter .dropdown-menu').addClass('show');
        $('.gre-contactus-filter__filter .dropdown').addClass('active-dropdown');
    
        }
        event.stopPropagation();
    });
    $('.gre-contactus-filter__filter .dropdown-menu').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
         $('.gre-contactus-filter__filter .dropdown-menu').removeClass('show');
        $('.gre-contactus-filter__filter .dropdown').removeClass('active-dropdown');
    
        }
        event.stopPropagation();
    });
    $(".gre-contactus-filter__filter .jAuto").on("keyup", function(e) {
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