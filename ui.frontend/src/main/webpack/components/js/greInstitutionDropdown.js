var institutionList = [];
$(function() {
    var greInstitutionStatesList = [];

    function updateCards(list) {
        $('.gre-institution-filter__table').css('display', 'table');
        list.sort(function(a, b) {
            return a["Name"].localeCompare(b["Name"]);
        });
        for (var i = 0; i <= list.length - 1; i++) {
            var footnote = list[i]['Note'] ? list[i]['Note'] : '';
            if (list[i]['Code'] && list[i]['Name']) {
                var row = '<tr><td>' + list[i]['Code'] + '</td><td>' + list[i]['Name'] + '<sup>' + footnote + '</sup></td></tr>';
                $(row).appendTo(".gre-institution-filter__table__content");
                if (footnote == '*' && $('.footnote__content').length == 0) {
                    var footnoteContent = '<div class ="footnote__content">*- AI Only.</div>';
                    $(footnoteContent).appendTo('.gre-institution-filter__footnote')
                }
            }
        }
    }

    function filterData(obj, arr, parameter) {
        var filtered = obj.filter(function(item) {
            return arr.replace(/&nbsp;/g, '').replace(/\s+/g, '') == item[parameter].replace(/&nbsp;/g, '').replace(/\s+/g, '');
        });
        obj = filtered;
        return obj;
    }

    function filterStateData(list, arr, parameter) {
        var filterdState = [];
        arr.forEach(function(value) {
            var filtered = list.filter(function(item) {
                return value.replace(/&nbsp;/g, '').replace(/\s+/g, '') == item[parameter].replace(/&nbsp;/g, '').replace(/\s+/g, '');
            });
            filterdState.push(...filtered.map(obj => obj));
        });
        list = filterdState;
        return list;
    }

    function updateStateDropDown(states, list) {
        states.forEach(function(value) {
            $('.gre-institution-states-dropdown').append('<option>' + value['States/Territories'] + '</option>')
        });
        $(".gre-institution-states-dropdown").select2({
            placeholder: $(".gre-institution-states-dropdown").data("placeholder"),
            closeOnSelect: false,
            selectionCssClass: "multiselect-dropdown",
            dropdownCssClass: "multiselect-dropdown",
            allowClear: true
        });
        $(".gre-institution-states-dropdown").on("select2:select", function(e) {
            if (greInstitutionStatesList && greInstitutionStatesList.length > 0) {
                var selectedIndex = greInstitutionStatesList.indexOf(e.params.data.text);
                if (selectedIndex < 0) {
                    greInstitutionStatesList.push(e.params.data.text);
                }
            } else {
                greInstitutionStatesList.push(e.params.data.text);
            }
        });
        $(".gre-institution-states-dropdown").on("select2:unselect", function(e) {
            if (greInstitutionStatesList && greInstitutionStatesList.length > 0) {
                greInstitutionStatesList.forEach(function(item, index, object) {
                    if (item == e.params.data.text) {
                        object.splice(index, 1);
                    }
                });
            }
        });
        $(".gre-institution-states-dropdown").on("select2:close", function(e) {
            var onloadCountrydata = filterStateData(list, greInstitutionStatesList, 'States/Territories');
            onloadCountrydata.sort(function(a, b) {
                return a["Name"].localeCompare(b["Name"]);
            });
            $('.gre-institution-filter__table__content').find("tr:gt(0)").remove();
            $('.gre-institution-filter__footnote').empty();
            $('.gre-institution-filter__table').css('display', 'none');
            if (onloadCountrydata && onloadCountrydata.length) {
                updateCards(onloadCountrydata);
            } else {
                if (greInstitutionStatesList.length == 0) {
                    updateCards(list);
                }
            }
            if (e.params.originalSelect2Event && !e.params.originalSelect2Event.data.selected) {
                if (greInstitutionStatesList && greInstitutionStatesList.length > 0) {
                    var selectedIndex = greInstitutionStatesList.indexOf(e.params.originalSelect2Event.data.text);
                    greInstitutionStatesList.splice(selectedIndex, 1);
                }
            }
        });
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
        var States = data.filter((value, index, self) => self.map(x => x['States/Territories']).indexOf(value['States/Territories']) == index);
        States.forEach(function(value, index, object) {
            if (value['States/Territories'] == '' || !value.hasOwnProperty('States/Territories')) {
                object.splice(index, 1);
            }
        });
        States.sort(function(a, b) {
            return a["States/Territories"].localeCompare(b["States/Territories"]);
        });
        // $('.gre-institution-filter .list-autocomplete').empty();
        // Country.forEach(function(value) {
        //     $('.gre-institution-filter .list-autocomplete').append(' <button type="button" class="dropdown-item" value = "' + value['Country'] + '"><label>' + value['Country'] + '</label></button>')
        // });
        Country.forEach(function(value) {
            $('.gre-institution-dropdown').append('<option>' + value['Country'] + '</option>')
        });
        $(".gre-institution-dropdown").select2({
            placeholder: $(".gre-institution-dropdown").data("placeholder"),
            //maximumSelectionLength: 2,
            selectionCssClass: "singleselect-withsearch",
            dropdownCssClass: "singleselect-withsearch",
        });
        var greinstitutionAriaLabel = $(".gre-institution-dropdown").attr('aria-label');
        setTimeout(() => {
            var setgreinstitutionAriaLabel = $('.gre-institution-dropdown').next('.select2-container').find('.select2-selection');
            if($('.gre-institution-dropdown').hasClass("select2-hidden-accessible") && setgreinstitutionAriaLabel.length == 1) {
                $('.gre-institution-dropdown').removeAttr("aria-label");
                setgreinstitutionAriaLabel.removeAttr('aria-labelledby');
                setgreinstitutionAriaLabel.attr('aria-label', greinstitutionAriaLabel);
            }
        }, 2500);


        // if ($(".gre-institution-filter")[0]) {

        //     $('.gre-institution-filter .dropdown-item').on('click', function() {
        //         var category = $(this).attr("searchData");
        //         console.log(category);
        //         $('.gre-institution-filter .jAuto').val($(this).children('label').html());
        //         var Country = $(this).children('label').html();

        //         var onloadCountrydata = filterData(data, Country, 'Country');
        //             return a["Name"].localeCompare(b["Name"]);
        //         });
        //         $('.gre-institution-filter__table__content').empty();
        //         $('.gre-institution-filter__footnote').empty();
        //         updateCards(onloadCountrydata);
        //     });
        // }
        if ($(".gre-institution-dropdown")[0]) {

            $('.gre-institution-dropdown').on('change', function() {
                var Country = $(".gre-institution-dropdown option:selected").text();
                var onloadCountrydata = filterData(data, Country, 'Country');
                onloadCountrydata.sort(function(a, b) {
                    return a["Name"].localeCompare(b["Name"]);
                });
                $('.gre-institution-filter__table__content').find("tr:gt(0)").remove();
                $('.gre-institution-filter__footnote').empty();
                greInstitutionStatesList = [];
                if ($('#gre-institution-states').hasClass("select2-hidden-accessible")) {
                    $('#gre-institution-states').select2('destroy');
                }
                $('.gre-institution-states-dropdown').empty();
                updateCards(onloadCountrydata);
                var FilteStates = States.filter(stateItem => stateItem['Country'] === Country);
                if (FilteStates && FilteStates.length > 0) {
                    $('.gre-institution-states-dropdown').parent().removeClass("d-none");
                    updateStateDropDown(FilteStates, onloadCountrydata);
                } else {
                    $('.gre-institution-states-dropdown').parent().addClass("d-none");
                }
            });
        }
    }
    if ($(".gre-institution-filter")[0]) {
        $('.gre-institution-filter__table').css('display', 'none');
        var dataPath = $("#gre-institution").data('gre-institution-path');
        $.getJSON(dataPath, function(data) {
            var filterdropDown = data['institutions_and_fellowship_sponsors'];
            institutionList = filterdropDown;
            updateDropDown(filterdropDown);
            //  updateCards(filterdropDown);
        });
    } else {
        // Do something if class does not exist
    }
    // $(document).on('click', '.jAuto', function() {
    //     // in case input text already exists
    //     $(this).siblings('.dropdown-menu').addClass('show');
    //     $(this).parent('.dropdown').addClass('active-dropdown');
    // });
    /*  $('.gre-institution-filter').on('focus', '.dropdown-item', function() {
          var element = $(this);
          var categoryElement = element[0];
          var category = $(categoryElement).attr("searchData");
          console.log(category);
          $('.gre-institution-filter .jAuto').val($(categoryElement).children('label').html());
          var Country = $(categoryElement).children('label').html();

          var onloadCountrydata = filterData(institutionList, Country, 'Country');
          onloadCountrydata.sort(function(a, b) {
              return a["Name"].localeCompare(b["Name"]);
          });
          $('.gre-institution-filter__table__content').empty();
          $('.gre-institution-filter__footnote').empty();
          updateCards(onloadCountrydata);
      });
      // $(".gre-institution-filter__filter .dropdown").on(
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

      //         var $trigger = $(".gre-institution-filter__filter .dropdown");
      
             
      
      //         if($trigger !== event.target && !$trigger.has(event.target).length){
      
      //             $('.gre-institution-filter__filter .dropdown-menu').removeClass('show');
      
      //             $('gre-institution-filter__filter .dropdown').removeClass('active-dropdown');
      
      //         }
      
             
      
      //     });
      $('.gre-institution-filter__filter .jAuto').keypress(function(event){
          var keycode = (event.keyCode ? event.keyCode : event.which);
          if(keycode == '13'){
           $('.gre-institution-filter__filter .dropdown-menu').addClass('show');
          $('.gre-institution-filter__filter .dropdown').addClass('active-dropdown');
      
          }
          event.stopPropagation();
      });
      $('.gre-institution-filter__filter .dropdown-menu').keypress(function(event){
          var keycode = (event.keyCode ? event.keyCode : event.which);
          if(keycode == '13'){
           $('.gre-institution-filter__filter .dropdown-menu').removeClass('show');
          $('.gre-institution-filter__filter .dropdown').removeClass('active-dropdown');
      
          }
          event.stopPropagation();
      });
      $(".gre-institution-filter__filter .jAuto").on("keyup", function(e) {
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