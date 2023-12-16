$("#speed").selectmenu();
//$( "input[type='checkbox']" ).checkboxradio();

 function searchCombobox(ids, placeholder){
  $( function() {
    $.widget( "custom.combobox", {
      _create: function() {
        this.wrapper = $( "<span>" )
          .addClass( "custom-combobox" )
          .insertAfter( this.element );
  
        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
      },
  
      _createAutocomplete: function() {
        var selected = this.element.children( ":selected" ),
          value = selected.val() ? selected.text() : "";
  
        this.input = $( "<input>" )
          .appendTo( this.wrapper )
          .val( value )
          .attr( "title", "" )
          .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
          .autocomplete({
            delay: 0,
            minLength: 0,
            source: this._source.bind( this )
          })
          .tooltip({
            classes: {
              "ui-tooltip": "ui-state-highlight"
            }
          });
  
        this._on( this.input, {
          autocompleteselect: function( event, ui ) {
            ui.item.option.selected = true;
            this._trigger( "select", event, {
              item: ui.item.option
            });
          },
  
          autocompletechange: "_removeIfInvalid"
        });
      },
  
      _createShowAllButton: function() {
        var input = this.input,
          wasOpen = false;
  
        $( "<a>" )
          .attr( "tabIndex", -1 )
          .attr( "title", "Show All Items" )
          .tooltip()
          .appendTo( this.wrapper )
          .button({
            icons: {
              primary: "ui-icon-triangle-1-s"
            },
            text: false
          })
          .removeClass( "ui-corner-all" )
          .addClass( "custom-combobox-toggle ui-corner-right" )
          .on( "mousedown", function() {
            wasOpen = input.autocomplete( "widget" ).is( ":visible" );
          })
          .on( "click", function() {
            input.trigger( "focus" );
  
            // Close if already visible
            if ( wasOpen ) {
              return;
            }
  
            // Pass empty string as value to search for, displaying all results
            input.autocomplete( "search", "" );
          });
      },
  
      _source: function( request, response ) {
        var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
        response( this.element.children( "option" ).map(function() {
          var text = $( this ).text();
          if ( this.value && ( !request.term || matcher.test(text) ) )
            return {
              label: text,
              value: text,
              option: this
            };
        }) );
      },
  
      _removeIfInvalid: function( event, ui ) {
  
        // Selected an item, nothing to do
        if ( ui.item ) {
          return;
        }
  
        // Search for a match (case-insensitive)
        var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
        this.element.children( "option" ).each(function() {
          if ( $( this ).text().toLowerCase() === valueLowerCase ) {
            this.selected = valid = true;
            return false;
          }
        });
  
        // Found a match, nothing to do
        if ( valid ) {
          return;
        }
        
  
        // Remove invalid value
        //  this.input
        //    .val( "" )
        //    .attr( "title", value + " didn't match any item" )
        //    .tooltip( "open" );
        this.element.val( "" );
        //  this._delay(function() {
        //    this.input.tooltip( "close" ).attr( "title", "" );
        //  }, 2500 );
        this.input.autocomplete( "instance" ).term = "";
      },
  
      _destroy: function() {
        this.wrapper.remove();
        this.element.show();
      }
    });
  
    $( ids ).combobox();
    $( "#toggle" ).on( "click", function() {
      $( ids ).toggle();
    });
    $(ids).siblings('.custom-combobox').find('input').attr( "placeholder", placeholder );
  } );
}
function searchMultiselect(data, ids, placeholder){
  $( function() {
    var selecteData = [];
    function log( message ) {
      $( "<div>" ).text( message ).prependTo( "#log" );
      $( "#log" ).scrollTop( 0 );
    }
 
    function split( val ) {
      return val.split( /,\s*/ );
    }
    function extractLast( term ) {
      return split( term ).pop();
    }
    $(ids).attr( "placeholder", placeholder );
    $(ids )
      // don't navigate away from the field on tab when selecting an item
      .on( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
       
        source: function( request, response ) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            data, extractLast( request.term ) ) );
        },
        search: function() {
          // custom minLength
          var term = extractLast( this.value );
          if ( term.length < 2 ) {
            return false;
          }
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
         
         
        //   if(selecteData.length > 0){
        //     console.log(selecteData);
        //     console.log(ui.item);
        //   for(i=0; i < selecteData.length; i++){
        //     if(selecteData[i].value == ui.item.value){
        //       selecteData[i].pop();
        //       return false;
        //     }
        //   }
        // }
          selecteData.push(ui.item);
          
         
          log( "Selected: " + ui.item.value + " aka " + ui.item.id );
        }
      });
  } );
}

searchCombobox("#combobox","hello");
searchCombobox("#combobox1","hello22");

var availableTags = [
  { "value": "ActionScript", "id" : "110"},
  { "value": "AppleScript", "id" : "1080"},
  { "value": "Asp", "id" : "1910"},
  { "value": "BASIC", "id" : "1018"},
  { "value": "C", "id" : "1090"},
  { "value": "C++", "id" : "1017"},
  { "value": "Java", "id" : "1016"},
  { "value": "JavaScript", "id" : "1066"},
  { "value": "COBOL", "id" : "1051"},
  { "value": "Groovy", "id" : "1050"},
  { "value": "ColdFusion", "id" : "1014"},
  { "value": "Haskell", "id" : "1033"},
  { "value": "perl", "id" : "1022"} 
];
searchMultiselect(availableTags, "#tags","Search");

