var concordanceData = '/content/dam/ets-org/s/gre/gre-lsat.json';
var concordanceJSON;

var readyToConvert = false;


var jqxhr = $.getJSON(concordanceData, function() {})
	.fail(function() {
		console.log( 'something went sideways' );
	})
	.done(function( data ) {
		concordanceJSON = data;
		readyToConvert = true;
		
	})

var $wrapTotal1 = $('#gmatT-conversion');
var $wrapTotal2 = $('#lsat-conversion');
	
var $verbal = $('#gre-verbal');
var $verbalErrorMsg = $('.error[data-field="gre-verbal"]');
var $quant = $('#gre-quant');
var $quantErrorMsg = $('.error[data-field="gre-quant"]');

var $inputs = $verbal.add($quant);

var lastVerbal, lastQuant;
var $convert = $('#gre-convert');
var minVal = 130;
var maxVal = 170;
var fetchError = document.querySelector('#errorField');
var outOfRangeMessage=fetchError.dataset.err;

var speed = 0;

$(function(){


	$inputs.on('keydown', function(e){
		-1 !== $.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()
	});


	$inputs[0].oninput = function() {

		var $field = $(this);
		var maxlength = $field.attr('max').length;

		if( $field.val().length > maxlength ) {
			$field.val( $field.val().slice(0, maxlength) );
		}
	};



	$inputs.on('keyup mouseup paste change',function(e){
		updateCompTool();	
	});

	$inputs.on('keyup mouseup paste change', function(){

		var verbal = $verbal.val();
		var quant = $quant.val();

		if( verbal != '' && (verbal < minVal || verbal > maxVal) ) {
			$verbalErrorMsg.html('<div class="msg">'+ outOfRangeMessage +'</div>');
			$verbalErrorMsg.fadeIn(speed);
		}

		if( quant != '' && (quant < minVal || quant > maxVal) ) {
			$quantErrorMsg.html('<div class="msg">'+ outOfRangeMessage +'</div>');			
			$quantErrorMsg.fadeIn(speed);
		}
	});


	$(window).on('unload', function() {
		$inputs.val('');
	});

}); 

function updateCompTool() {


	var newVerbal = $verbal.val();
	var newQuant = $quant.val();

	if( newVerbal != lastVerbal || newQuant != lastQuant ) {

		lastVerbal = newVerbal;
		lastQuant = newQuant;

		var goodVerbal = verifyNum( $verbal );
		var goodQuant = verifyNum( $quant );
	clearPredictionsGMAT();
			clearPredictionsLSAT();
		
		if( goodVerbal ){
			$verbalErrorMsg.fadeOut(speed);

		} else {
			clearPredictionsGMAT();
			clearPredictionsLSAT();

			if( newVerbal == '' ) {
				$verbalErrorMsg.fadeOut(speed);
			} else {
				if( newVerbal.length > 2 ) {
					$verbalErrorMsg.fadeIn(speed);
				}
			}
		}

		if( goodQuant ){

			$quantErrorMsg.fadeOut(speed);
		} else {
			clearPredictionsGMAT();
			clearPredictionsLSAT();
			if( newQuant == '' ) {
				$quantErrorMsg.fadeOut(speed);
			} else {
				if( newQuant.length > 2 ) {
					$quantErrorMsg.fadeIn(speed);
				}
			}
		}

		if( goodVerbal && goodQuant ) {
			if($wrapTotal1.val()==undefined)
			{
				predictLSAT( newVerbal,newQuant );
			}
			else if($wrapTotal2.val()==undefined)
			{
				predictGMAT( newVerbal,newQuant );
			}
		}

	}

} 


function predictLSAT( v, q ) {
	
	var greV = parseInt( v );
	var greQ = parseInt( q );

	
	var lsatTotal = ( readyToConvert ) ? 0 : 'JSON data not yet ready';


	if( greV == 170 && greQ == 170 ) {
		lsatTotal = '178-180';
	} else {
		$.each(concordanceJSON.scores, function(i, score) {
			if( score.greV == v && score.greQ == q ) {
				lsatTotal =  score.lsat;
				return false; 
			}
		});

	}

	sharePredictionsLSAT( lsatTotal );

} 


function sharePredictionsLSAT( total ) {

	var $wrapTotal = $('#lsat-conversion');


	if( !$wrapTotal.val() ){
		$wrapTotal
			.append('<span class="number predictedscore-total" style="display:none;">'+ total +'</span>')
			.find('span.number')
				.fadeIn(speed);


	} else {

		$wrapTotal.find('span.number').text( total );


	}


} 


function predictGMAT( v, q ) {

	var greV = parseInt( v );
	var greQ = parseInt( q );

	
	var gmatTotal  = -2080.74559330863 + (greV*6.38369593312407) + (greQ*10.6230921641945);
	var gmatVerbal = -109.493972390779 + (greV*0.911896551285247);
	var gmatQuant  = -158.418743409747 + (greQ*1.24338698204798);

	gmatTotal = Math.round(gmatTotal/10)*10; 
	gmatVerbal = verifyMinMax(Math.round(gmatVerbal));
	gmatQuant  = verifyMinMax(Math.round(gmatQuant));
	(gmatTotal < 200) ? gmatTotal = 200: void(0);
	(gmatTotal > 800) ? gmatTotal = 800: void(0);



	sharePredictionsGMAT( gmatTotal, gmatVerbal, gmatQuant );

} 



function sharePredictionsGMAT( total, verbal, quant ) {

	
	var $wrapTotal = $('#gmatT-conversion');
	var $wrapVerbal = $('#gmatV-conversion');
	var $wrapQuant = $('#gmatQ-conversion');

	
	if( !$wrapTotal.val() ){
		$wrapTotal
			.append('<span class="number predictedscore-total" style="display:none;">'+ total +'</span>');

		$wrapVerbal
			.append('<span class="number" style="display:none;">'+ verbal +'</span>');

		$wrapQuant
			.append('<span class="number" style="display:none;">'+ quant +'</span>');

		$('#gmatT-conversion, #gmatV-conversion, #gmatQ-conversion').find('span.number').fadeIn(speed);

	} else {
		
		$wrapTotal.find('span.number').text( total );
		$wrapVerbal.find('span.number').text( verbal );
		$wrapQuant.find('span.number').text( quant );

	
	}

} 


function clearPredictionsLSAT(){
	$('#lsat-conversion')
		.find('span.number')
			.fadeOut(speed,function(){
				$(this).remove();
			});
} 
function clearPredictionsGMAT(){
	$('#gmatT-conversion, #gmatV-conversion, #gmatQ-conversion')
		.find('span.number')
			.fadeOut(speed,function(){
				$(this).remove();
			});
} 




function verifyMinMax( num, min, max ){
   if( typeof(min) === 'undefined' ) { min = 0; };
   if( typeof(max) === 'undefined' ) { max = 60; };
	
	var fixedNum = num;
	(num < min) ? fixedNum = min : void(0);
	(num > max) ? fixedNum = max : void(0);
	return fixedNum;
}

 


function verifyNum( field ) {

	var isGoodNum = false;
	var minVal = ( field.hasAttr('min') ) ? parseInt(field.attr('min')) : void(0); // this is more generic than needed in case
	var maxVal = ( field.hasAttr('max') ) ? parseInt(field.attr('max')) : void(0); // we ever need to show the hold gre conversion stuff
	var userVal = parseInt(field.val());

	if( $.isNumeric(userVal) ) {
		if( userVal >= minVal && userVal <= maxVal ) {
			return true;
		}
	}

	return false;

} 

$.fn.hasAttr = function( attrName ){
	var element = this[0];
	if(element.hasAttribute){
		return element.hasAttribute(attrName);
	}
	return element[attrName] !== undefined;
}