/*
const data = [
    {
        "id": 0,
        "text": "Ackerman, Debra J.",
        "selected": false
    },
    {
        "id": 1,
        "text": "Almonte, Debby E.",
        "selected": false
    },
    {
        "id": 2,
        "text": "Andrews, Jessica J.",
        "selected": false
    },
    {
        "id": 3,
        "text": "Baird, Leonard L.",
        "selected": false
    },
    {
        "id": 4,
        "text": "Barton, Paul E.",
        "selected": false
    },
    {
        "id": 5,
        "text": "Bean, Andrew G.",
        "selected": false
    },
    {
        "id": 6,
        "text": "Bennett, Randy Elliot",
        "selected": false
    },
    {
        "id": 7,
        "text": "Berglund, Gosta W.",
        "selected": false
    },
    {
        "id": 8,
        "text": "Bertling, Jonas P.",
        "selected": false
    },
    {
        "id": 9,
        "text": "Boroson, Melinda",
        "selected": false
    },
    {
        "id": 10,
        "text": "Breland, Hunter M.",
        "selected": false
    },
    {
        "id": 11,
        "text": "Bridgeman, Brent",
        "selected": false
    },
    {
        "id": 12,
        "text": "Burton, Nancy W.",
        "selected": false
    },
    {
        "id": 13,
        "text": "Cahen, Leonard S.",
        "selected": false
    },
    {
        "id": 14,
        "text": "Calderon, Margarita",
        "selected": false
    },
    {
        "id": 15,
        "text": "Capell, Frank",
        "selected": false
    },
    {
        "id": 16,
        "text": "Centra, John A.",
        "selected": false
    },
    {
        "id": 17,
        "text": "Clark, Mary Jo",
        "selected": false
    },
    {
        "id": 18,
        "text": "Coffman, William E.",
        "selected": false
    },
    {
        "id": 19,
        "text": "Cole, Nancy S.",
        "selected": false
    },
    {
        "id": 20,
        "text": "Coley, Richard J.",
        "selected": false
    },
    {
        "id": 21,
        "text": "Coley, Richard J. (Ed.)",
        "selected": false
    },
    {
        "id": 22,
        "text": "Courtney, Rosalea",
        "selected": false
    },
    {
        "id": 23,
        "text": "Courtney, Rosalea G.",
        "selected": false
    },
    {
        "id": 24,
        "text": "Cox, Patricia W.",
        "selected": false
    },
    {
        "id": 25,
        "text": "Davis, Junius A.",
        "selected": false
    },
    {
        "id": 26,
        "text": "DeBruin-Parecki, Andrea",
        "selected": false
    },
    {
        "id": 27,
        "text": "Dobbin, John E.",
        "selected": false
    },
    {
        "id": 28,
        "text": "Dossey, John A.",
        "selected": false
    },
    {
        "id": 29,
        "text": "Duran, Richard P.",
        "selected": false
    },
    {
        "id": 30,
        "text": "ETS",
        "selected": false
    },
    {
        "id": 31,
        "text": "ETS Policy Information Center",
        "selected": false
    },
    {
        "id": 32,
        "text": "Echternacht, Gary J.",
        "selected": false
    },
    {
        "id": 33,
        "text": "Elias, Patricia J.",
        "selected": false
    },
    {
        "id": 34,
        "text": "Emmerich, Walter",
        "selected": false
    },
    {
        "id": 35,
        "text": "Escobar, Francisca",
        "selected": false
    }
];

var $multiselect2 = $("#multiselect2POC");
var $multiselectchipsPOC = $("#multiselectchipsPOC");
$.fn.multiSelect2 = function() {
    $multiselect2.select2({
        data: data,
        selectionCssClass: "singleselect-dropdown",
        dropdownCssClass: "singleselect-dropdown",
        placeholder: $multiselect2.data("placeholder"),
    });
};
var $multiselect = $("#multiselectPOC");
$.fn.multiSelect = function() {
    $multiselect.select2({
        data: data,
        closeOnSelect: false,
        selectionCssClass: "multiselect-dropdown",
        dropdownCssClass: "multiselect-dropdown",
        placeholder: $multiselect.data("placeholder"),
        allowClear: true
    });
    $multiselect.on("select2:select", function(e) {
        console.log(e);
        $.fn.clearEpicFnWrap($multiselect.val());
        $multiselectchipsPOC.append('<button aria-label="'+e.params.data.text+'" class="'+e.params.data._resultId+'" data-id="'+e.params.data.id+'">'+e.params.data.text+'<i role="button" tabindex="0" aria-description="click to remove selection" onkeypress="$(this).clearEpicFnkeydown(event, false)" onClick="$(this).clearEpicFn(event, false)"></i></button>');
    });
    $multiselect.on("select2:unselect", function(e) {
        console.log(e);
        $.fn.clearEpicFnWrap($multiselect.val());
        $.fn.clearEpicFn('', true, e.params.data._resultId);
    });
};
$.fn.clearEpicFnWrap = function(values) {
    if(values.length > 0) {
        $multiselectchipsPOC.removeClass('d-none');
    } else {
        $multiselectchipsPOC.addClass('d-none');
    }
};
$.fn.clearEpicFn = function(event, deleteItem, resultId) {
    if(!deleteItem) {
        var idToRemove = $(event.target).parent('button').attr("data-id");
        var values = $multiselect.val();
        if (values) {
            $multiselectchipsPOC.removeClass('d-none');
            var i = values.indexOf(idToRemove);
            if (i >= 0) {
                values.splice(i, 1);
                $multiselect.val(values).trigger('change');
                $(event.target).parent('button').remove();
            }
        }
        $.fn.clearEpicFnWrap(values);
    } else {
        $multiselectchipsPOC.find('.'+resultId).remove();
    }
};
$.fn.clearEpicFnkeydown = function(event, deleteItem) {
    if(event.key === "Enter") {
        $.fn.clearEpicFn(event, deleteItem);
    }
};
$.fn.clearChipsAllPOCFn = function() {
    $multiselect.val('').trigger('change');
    $multiselectchipsPOC.find('button').remove();
    $multiselectchipsPOC.addClass('d-none');
};
$('.clearChipsPOC').on('click', function(e) {
    e.preventDefault();
    $.fn.clearChipsAllPOCFn();
});

$(window).on('load', function() {
    $.fn.multiSelect();
    $.fn.multiSelect2();
});
*/
