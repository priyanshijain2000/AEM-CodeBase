$(function() {
    var selectedState = [];
    var selectedTest = [];
    var selectedAllList = [];
    var loadmoreCount;
    var maxvalidcard;
    var cards;
    var completeData;
    var onloadStateValue;
    var footnote;
    var srPageSize = 20;
    var srReInitFlag = false;
    var $stateEventSelect = $(".score-requirement-state-dropdown");
    var $scoreRequirementStateChips = $('#scorerequirementstatechips');
    var $testEventSelect = $(".score-requirement-test-dropdown");
    var $scoreRequirementTestChips = $('#scorerequirementtestchips');
    var flaginitCountState = 1;
    var flaginitCountTest = 1;

    function sortObj(obj) {
        obj.sort(function(a, b) {
            if (a["State Name"] && b["State Name"]&& a["Test Name"] && b["Test Name"]) {
                return a["State Name"].localeCompare(b["State Name"]) || (a["Test Name"]).localeCompare(b["Test Name"]) ||  (a["Display Test Code"]).localeCompare(b["Display Test Code"]);
            }
                
        });
        return obj;
    }

    function filterData(obj, arr, parameter) {
        if (arr.length != 0) {


            var filtered = obj.filter(function(item) {
                if(Array.isArray(arr)){
                    return arr.indexOf(item[parameter]) !== -1;
                }
                else{
                    return arr.toUpperCase() == (item[parameter].toUpperCase());
                }
            });
            // console.log(filtered);
            obj = filtered;
        }
        return obj;
    }

    function filterDatawithoutonloadedState(obj, arr, parameter) {
        if (arr.length != 0) {


            var filtered = obj.filter(function(item) {
                return item[parameter] !== arr[0];
            });
            // console.log(filtered);
            obj = filtered;
        }
        return obj;
    }


    function updateCards(cards) {

        $(".score-requirement-table-content").empty();
        for (let i = 0; i < cards.length; i++) {
            if (cards[i]["State Name"]) {
                var statefootenote = '';
                if (cards[i].Footnote) {

                    statefootenote = footnote.filter(function(item) {
                        return item.FootnoteID == cards[i].Footnote;
                    });
                }
                var symbol = typeof(statefootenote) == "object" ? statefootenote[0].Symbol : statefootenote;
                var passScore = cards[i]["Passing Score"] + '<sup>' + symbol + '</sup>';
                if (cards[i]["Passing Score"] == "NA") {
                    symbol = '*';
                    passScore = cards[i]["Passing Score"] + '<sup>*</sup>';
                }
                if (cards[i]["Passing Score"] == "") {
                    passScore = "";
                    symbol = "";
                }
                if (cards[i]["Passing Score"] == "NM") {
                    passScore = cards[i]["Passing Score"];
                    symbol = "";
                }
                if (cards[i]["State Name"] == onloadStateValue && selectedAllList.length > 0) {
                    var tablerow = ' <tr class="score-requirement-table-content-row highlighed-item"><td><span class="d-none d-md-inline">' +
                        cards[i]["State Name"] + '</span><span class="d-inline d-md-none">' + cards[i]["State"] +
                        '</span></td><td>' + cards[i]["Display Test Code"] + '</td><td>' + cards[i]["Test Name"] + '</td><td>' + passScore + '</td></tr>';
                    $(tablerow).appendTo(".score-requirement-table-content");
                } else {
                    var tablerow = ' <tr class="score-requirement-table-content-row"><td><span class="d-none d-md-inline">' +
                        cards[i]["State Name"] + '</span><span class="d-inline d-md-none">' + cards[i]["State"] +
                        '</span></td><td>' + cards[i]["Display Test Code"] + '</td><td>' + cards[i]["Test Name"] + '</td><td>' + passScore + '</td></tr>';
                    $(tablerow).appendTo(".score-requirement-table-content");
                }
                var SymbolExist = false;
                $('.footnote__content').each(function() {
                    if (symbol == '*') {
                        if ($(this).children('.footnote__symbol').text() == symbol) {
                            SymbolExist = true;
                        }
                    }
                    if ($(this).children('.footnote__symbol').text() == symbol && $(this).children('.footnote__title').text() == cards[i]["State Name"]) {
                        SymbolExist = true;
                    }
                });

                if (symbol != "" && !SymbolExist) {
                    // console.log(symbol);
                    var note;
                    if (symbol == "*") {
                        statefootenote = footnote.filter(function(item) {
                            return item.FootnoteID == symbol;

                        });
                        note = '<div class="footnote__content"><span class = "footnote__symbol symbol__asterisk">' + symbol + '</span><span class="footnote__desc">' + statefootenote[0].FootnoteText + '</span></div>';
                        $(note).appendTo(".footnote");
                    } else {
                        note = '<div class="footnote__content"><span class = "footnote__symbol">' + symbol + '</span><span class="footnote__title">' + cards[i]["State Name"] + '</span></div><div class="footnote__desc"><ul><li>' + statefootenote[0].FootnoteText + '</li></ul></div>';
                        if ($('.footnote__symbol').hasClass('symbol__asterisk')) {
                            $(note).insertBefore($('.symbol__asterisk'));
                        } else {
                            $(note).appendTo(".footnote");
                        }
                    }


                }
            }
        }

        if (cards.length == 0) {
            $(".score-requirement-table-content").empty();
            var norecord = '<tr class="no-record"><td colspan="4">NO RECORD FOUND<td></tr>';
            $(norecord).appendTo(".score-requirement-table-content");
        }

    }

    function removeElementFromList(removeitem) {

        function removefromarray(item, array) {
            var index = array.indexOf(item);
            if (index > -1) {
                array.splice(index, 1);
            }
            return array;
        }
        if ($('.filter-state .jAuto').val() == removeitem) {
            $('.filter-state .jAuto').val('');
            var dropdownItem = $('.filter-state' ).find('.dropdown-item');
        for (i = 0; i < dropdownItem.length; i++) {
                dropdownItem[i].style.display = "";
        }
        }
        if ($('.filter-test .jAuto').val().includes(removeitem)) {
            $('.filter-test .jAuto').val('');
            var dropdownItem = $('.filter-test' ).find('.dropdown-item');
            for (i = 0; i < dropdownItem.length; i++) {
                    dropdownItem[i].style.display = "";
            }
        }
        selectedState = removefromarray(removeitem, selectedState);
        selectedTest = removefromarray(removeitem, selectedTest);
        selectedAllList = removefromarray(removeitem, selectedAllList);
        var onloadstatedata = filterData(completeData, onloadStateValue, 'State Name');
        onloadstatedata = filterData(onloadstatedata, selectedTest, 'Display Test Code');
        onloadstatedata = sortObj(onloadstatedata);
        var filteredobj = [];
        if ((onloadStateValue != '' && selectedState.length > 0) || onloadStateValue == '') {
            filteredobj = completeData;
            filteredobj = filterDatawithoutonloadedState(filteredobj, onloadStateValue, 'State Name');
            filteredobj = filterData(filteredobj, selectedState, 'State Name');
            filteredobj = filterData(filteredobj, selectedTest, 'Display Test Code');
            filteredobj = sortObj(filteredobj);
        }

        if (onloadStateValue != '') {
            filteredobj = onloadstatedata.concat(filteredobj);
        }
        cards = filteredobj;
        loadmoreCount = filteredobj.length;
        $('.score-requirement-table-content').empty();
        $('.footnote').empty();
        maxvalidcard = loadmoreCount >= 20 ? 20 : loadmoreCount;
        totalloadedData = +updateCards(loadmoreCount, maxvalidcard, filteredobj, 0);
        $('.selected-item-list[value="' + removeitem + '"]').remove();
    }
    $(document).on('click', '.selected-item-list', function() {
        var removeitem = $(this).attr("value");
        $('.dropdown-item:contains(' + removeitem + ')').children('input[type=checkbox]').prop("checked", false);
        removeElementFromList(removeitem);
    });

    // function publishlist(selectedList) {
    //     $("#score-requirement-selected-list").empty();
    //     selectedList.forEach(list => {
    //         $('#score-requirement-selected-list').append('<button class = "selected-item-list" value = "' + list + '">' + list + ' <i class="score-requirement__select__search-close"><img src="/src/main/webpack/resources/images/searchClose.png"></i></button>');

    //     });
    // }

    function scrollTopScoreRequirement() {
        $('html, body').animate({
            scrollTop: $('.score-requirement-filters').offset().top - 50,
        });
    };

    function scoreRequirementInitPagination(data) {
        var _totalPage = Math.ceil(data.length / srPageSize);
        if(_totalPage > 1) {
            $('.scoreRequirementPagination').removeClass('d-none');
            if(srReInitFlag) {
                $('.scoreRequirementPagination').litePagination('destroy');
                $('.scoreRequirementPagination').litePagination({
                    currentPage  : 1,
                    // link_string   : '/?pages={page_number}',
                    maxPage: _totalPage,
                    pageString   : '{currentPage}',
                    reInit: true,
                    paged : function (page) {
                        var updatedCard = data.slice(page * srPageSize - srPageSize, page * srPageSize);
                        updateCards(updatedCard);
                        scrollTopScoreRequirement();
                    }
                });
            } else {
                $('.scoreRequirementPagination').litePagination({
                    currentPage  : 1,
                    // link_string   : '/?pages={page_number}',
                    maxPage: _totalPage,
                    pageString   : '{currentPage}',
                    reInit: false,
                    paged : function (page) {
                        var updatedCard = data.slice(page * srPageSize - srPageSize, page * srPageSize);
                        updateCards(updatedCard);
                        scrollTopScoreRequirement();
                    } 
                });
                srReInitFlag = true;
            }
        } else {
            $('.scoreRequirementPagination').addClass('d-none');
        }
    }

    $.fn.stateCardUpdateFn = function(clear) {
        var category =  $(".score-requirement-state-dropdown").select2("val");

        if(clear) {
            selectedState = [];
        } else {
            selectedState = category;
        }
        
        // selectedAllList.push(category);
        // publishlist(selectedAllList);
        var onloadstatedata = filterData(completeData, onloadStateValue, 'State Name');
        onloadstatedata = filterData(onloadstatedata, selectedTest, 'Display Test Code');
        onloadstatedata = sortObj(onloadstatedata);
        var filteredobj = [];
        if ((onloadStateValue != '') || onloadStateValue == '') {
            filteredobj = completeData;
            filteredobj = filterDatawithoutonloadedState(filteredobj, onloadStateValue, 'State Name');
            filteredobj = filterData(filteredobj, selectedState, 'State Name');
            filteredobj = filterData(filteredobj, selectedTest, 'Display Test Code');
            filteredobj = sortObj(filteredobj);
        }
        //filteredobj = onloadstatedata.concat(filteredobj);
        if (onloadStateValue != '' && selectedState.length > 0) {
            filteredobj = onloadstatedata.concat(filteredobj);
        }
        else if (onloadStateValue != '' && selectedState.length == 0){
            filteredobj = onloadstatedata;
        }
        cards = filteredobj;
        $('.score-requirement-table-content').empty();
        $('.footnote').empty();
        updateCards(cards.slice(0, srPageSize));
        scoreRequirementInitPagination(cards);
    };
    $.fn.testCardUpdateFn = function(clear) {
        var category = $(".score-requirement-test-dropdown").select2("val");
        
        selectedTest = category;
        if(clear) {
            selectedTest = [];
        } else {
            selectedTest = category;
        }
        
        var onloadstatedata = filterData(completeData, onloadStateValue, 'State Name');
        onloadstatedata = filterData(onloadstatedata, selectedTest, 'Display Test Code');
        onloadstatedata = sortObj(onloadstatedata);
        var filteredobj = [];
        if ((onloadStateValue != '') || onloadStateValue == '') {
            filteredobj = completeData;
            filteredobj = filterDatawithoutonloadedState(filteredobj, onloadStateValue, 'State Name');
            filteredobj = filterData(filteredobj, selectedState, 'State Name');
            filteredobj = filterData(filteredobj, selectedTest, 'Display Test Code');
            filteredobj = sortObj(filteredobj);
        }
        //filteredobj = onloadstatedata.concat(filteredobj);
        if (onloadStateValue != '' && selectedState !='') {
            filteredobj = onloadstatedata.concat(filteredobj);
        }
        else if (onloadStateValue != '' && selectedState.length == 0){
            filteredobj = onloadstatedata;
        }
        cards = filteredobj;
        $('.score-requirement-table-content').empty();
        $('.footnote').empty();
        updateCards(cards.slice(0, srPageSize));
        scoreRequirementInitPagination(cards);
    };
    function updateDropDown(data) {

        var state = data.filter((value, index, self) => self.map(x => x['State Name']).indexOf(value['State Name']) == index);
        var allTest = data.filter((value, index, self) => self.map(x => x['Display Test Code']).indexOf(value['Display Test Code']) == index);
        for (var i = state.length - 1; i >= 0; i--) {
            if (state[i]['State Name'] == onloadStateValue || state[i]['State Name'] == '' || state[i]['State Name'] == undefined) {
                state.splice(i, 1);
            }
        }
        for (var i = allTest.length - 1; i >= 0; i--) {
            if (allTest[i]['Test Name'] == '' || allTest[i]['Test Name'] == undefined) {
                allTest.splice(i, 1);
            }
        }
        state.sort(function(a, b) {
            if( a["State Name"]&& b["State Name"]) {
                return a["State Name"].localeCompare(b["State Name"]);
            }
        });
        allTest.sort(function(a, b) {
            if( a["Test Name"]&& b["Test Name"]) {
                return a["Test Name"].localeCompare(b["Test Name"]);
            }
        });

        $('.filter-state .list-autocomplete').empty();
        state.forEach(function(value) {
            $('.score-requirement-state-dropdown').append('<option value = "'+ value['State Name']+'">' + value['State Name'] + '</option>');
        });
        allTest.forEach(function(value) {
            $('.score-requirement-test-dropdown').append('<option value = "'+ value['Display Test Code']+ '">' + value['Test Name'] + ' ' + '(' + value['Display Test Code'] + ')</option>');
        });
        $(".score-requirement-state-dropdown").select2({
			placeholder: $(".score-requirement-state-dropdown").data("placeholder"),
			//maximumSelectionLength: 2,
            selectionCssClass: "multiselect-dropdown",
            dropdownCssClass: "multiselect-dropdown",
            closeOnSelect: false
		});
        if(flaginitCountState == 1) {
            $stateEventSelect.on("select2:select", function(e) {
                $("#stateDropdownAnnouncement").html(e.params.data.text + " selected ");
                $.fn.stateChipsWrap($stateEventSelect.val());
                var _string = e.params.data._resultId;
                var _finalString = _string.split(' ')[0];
                $scoreRequirementStateChips.append('<button aria-label="'+e.params.data.text+'" class="'+_finalString+'" data-id="'+e.params.data.id+'">'+e.params.data.text+'<i role="button" tabindex="0" aria-label="click to remove selection" onkeypress="$(this).stateClearSingleChipsFnkeydown(event, false)" onClick="$(this).stateclearSingleChipsFn(event, false)"></i></button>');
            });
            $stateEventSelect.on("select2:unselect", function(e) {
                $("#stateDropdownAnnouncement").html(e.params.data.text + " unselected ");
                $.fn.stateChipsWrap($stateEventSelect.val());
                var _string = e.params.data._resultId;
                var _finalString = _string.split(' ')[0];
                $.fn.stateclearSingleChipsFn('', true, _finalString);
            });
            flaginitCountState++;
        }
        var srStateAriaLabel = $(".score-requirement-state-dropdown").attr('aria-label');
        setTimeout(() => {
            var setSRStateAriaLabel = $('.score-requirement-state-dropdown').next('.select2-container').find('.select2-search__field');
            var setSRStateAriaLabelselection = $('.score-requirement-state-dropdown').next('.select2-container').find('.select2-selection');
            if($('.score-requirement-state-dropdown').hasClass("select2-hidden-accessible") && setSRStateAriaLabel.length == 1) {
                $('.score-requirement-state-dropdown').removeAttr("aria-label");
                setSRStateAriaLabel.attr('aria-label', srStateAriaLabel);
                setSRStateAriaLabel.removeAttr('aria-labelledby');
                setSRStateAriaLabelselection.attr('aria-label', srStateAriaLabel+' ');
            }
        }, 2500);
        $(".score-requirement-test-dropdown").select2({
			placeholder: $(".score-requirement-test-dropdown").data("placeholder"),
			//maximumSelectionLength: 2,
			selectionCssClass: "multiselect-dropdown",
            dropdownCssClass: "multiselect-dropdown",
             closeOnSelect: false
		});
        if(flaginitCountTest == 1) {
            $testEventSelect.on("select2:select", function(e) {
                $("#testDropdownAnnouncement").html(e.params.data.text + " selected ");
                $.fn.testChipsWrap($testEventSelect.val());
                var _string = e.params.data._resultId;
                var _finalString = _string.split(' ')[0];
                $scoreRequirementTestChips.append('<button aria-label="'+e.params.data.text+'" class="'+_finalString+'" data-id="'+e.params.data.id+'">'+e.params.data.text+'<i role="button" tabindex="0" aria-label="click to remove selection" onkeypress="$(this).testClearSingleChipsFnkeydown(event, false)" onClick="$(this).testclearSingleChipsFn(event, false)"></i></button>');
            });
            $testEventSelect.on("select2:unselect", function(e) {
                $("#testDropdownAnnouncement").html(e.params.data.text + " unselected ");
                $.fn.testChipsWrap($testEventSelect.val());
                var _string = e.params.data._resultId;
                var _finalString = _string.split(' ')[0];
                $.fn.testclearSingleChipsFn('', true, _finalString);
            });
            flaginitCountTest++;
        }
        var srtestAriaLabel = $(".score-requirement-test-dropdown").attr('aria-label');
        setTimeout(() => {
            var setSRtestAriaLabel = $('.score-requirement-test-dropdown').next('.select2-container').find('.select2-search__field');
            var setSRtestAriaLabelselection = $('.score-requirement-test-dropdown').next('.select2-container').find('.select2-selection');
            if($('.score-requirement-test-dropdown').hasClass("select2-hidden-accessible") && setSRtestAriaLabel.length == 1) {
                $('.score-requirement-test-dropdown').removeAttr("aria-label");
                setSRtestAriaLabel.attr('aria-label', srtestAriaLabel);
                setSRtestAriaLabel.removeAttr('aria-labelledby');
                setSRtestAriaLabelselection.attr('aria-label', srtestAriaLabel+' ');
            }
        }, 2500);
        if ($(".score-requirement")[0]) {

            $('.score-requirement-state-dropdown').on('change', function() {
                $.fn.stateCardUpdateFn(false);
            });

            $('.score-requirement-test-dropdown').on('change', function() {
                $.fn.testCardUpdateFn(false)               
            });
        }
    }
    if ($(".score-requirement")[0]) {
        var dataPath = $("#score-requirement-table").data('score-requirement-path');
        //dataPath =  "/content/dam/ets-org/commons/example.json";
        $.getJSON(dataPath, function(collection) {
            var data = collection.scores;
            footnote = collection.footnotes;
            onloadStateValue = sessionStorage.getItem("state name") ? sessionStorage.getItem("state name") : '';
            loadmoreCount = data.length;
            maxvalidcard = loadmoreCount >= 20 ? 20 : loadmoreCount;
            cards = data;
            completeData = data;
            var currentUrl = window.location.href;
            var part2 = currentUrl.includes('/praxis/') ? currentUrl.split('/praxis/'):"";
            if(part2 !=""){
                var statekey = part2[1].slice(0, part2[1].indexOf('/'));
            var result = data.filter(obj => {
                if(statekey.length<=2)
                { return obj.State.toUpperCase() == statekey.toUpperCase();
                }
                else{
                    return obj["State Name"].toUpperCase().includes(statekey.toUpperCase());
                }
                
              });
              if(result.length>0) {
                onloadStateValue = result[0]["State Name"] ? result[0]["State Name"] :'';
              } else {
                onloadStateValue = '';
              }
            }
            updateDropDown(data);
            var onloadstatedata = filterData(cards, onloadStateValue, 'State Name');
            onloadstatedata = filterData(onloadstatedata, selectedTest, 'Display Test Code');
            onloadstatedata = sortObj(onloadstatedata);
            cards = filterDatawithoutonloadedState(cards, onloadStateValue, 'State Name');
            cards = filterData(cards, selectedTest, 'Display Test Code');
            cards = sortObj(cards);
            //cards = onloadstatedata.concat(cards);
            if (onloadStateValue != '') {
                cards = onloadstatedata;
            } else {
                cards = cards;
            }
            updateCards(cards.slice(0, srPageSize));
            scoreRequirementInitPagination(cards);

        });
    } else {
        // Do something if class does not exist
    }

    $.fn.stateChipsWrap = function(values) {
        if(values.length > 0) {
            $scoreRequirementStateChips.removeClass('d-none');
        } else {
            $scoreRequirementStateChips.addClass('d-none');
        }
    };
    $.fn.stateclearSingleChipsFn = function(event, deleteItem, resultId) {
        if(!deleteItem) {
            var idToRemove = $(event.target).parent('button').attr("data-id");
            var values = $stateEventSelect.val();
            if (values) {
                $scoreRequirementStateChips.removeClass('d-none');
                var i = values.indexOf(idToRemove);
                if (i >= 0) {
                    values.splice(i, 1);
                    $stateEventSelect.val(values).trigger('change');
                    $(event.target).parent('button').remove();
                }
            }
            $.fn.stateChipsWrap(values);
        } else {
            $scoreRequirementStateChips.find('.'+resultId).remove();
        }
    };
    $.fn.stateClearSingleChipsFnkeydown = function(event, deleteItem) {
        if (event.keyCode == 13) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                $.fn.stateclearSingleChipsFn(event, deleteItem);
            }
        }
    };
    $.fn.stateClearChipsAllFn = function() {
        $stateEventSelect.val('').trigger('change');
        $scoreRequirementStateChips.find('button').remove();
        $scoreRequirementStateChips.addClass('d-none');
        $.fn.stateCardUpdateFn(true);
    };
    $('.stateChipsClear').on('click', function(e) {
        e.preventDefault();
        $.fn.stateClearChipsAllFn();
    });
    $.fn.testChipsWrap = function(values) {
        if(values.length > 0) {
            $scoreRequirementTestChips.removeClass('d-none');
        } else {
            $scoreRequirementTestChips.addClass('d-none');
        }
    };
    $.fn.testclearSingleChipsFn = function(event, deleteItem, resultId) {
        if(!deleteItem) {
            var idToRemove = $(event.target).parent('button').attr("data-id");
            var values = $testEventSelect.val();
            if (values) {
                $scoreRequirementTestChips.removeClass('d-none');
                var i = values.indexOf(idToRemove);
                if (i >= 0) {
                    values.splice(i, 1);
                    $testEventSelect.val(values).trigger('change');
                    $(event.target).parent('button').remove();
                }
            }
            $.fn.testChipsWrap(values);
        } else {
            $scoreRequirementTestChips.find('.'+resultId).remove();
        }
    };
    $.fn.testClearSingleChipsFnkeydown = function(event, deleteItem) {
        if (event.keyCode == 13) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                $.fn.testclearSingleChipsFn(event, deleteItem);
            }
        }
    };
    $.fn.testClearChipsAllFn = function() {
        $testEventSelect.val('').trigger('change');
        $scoreRequirementTestChips.find('button').remove();
        $scoreRequirementTestChips.addClass('d-none');
        $.fn.testCardUpdateFn(true);
    };
    $('.testChipsClear').on('click', function(e) {
        e.preventDefault();
        $.fn.testClearChipsAllFn();
    });

});
